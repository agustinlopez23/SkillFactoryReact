import { DeleteForeverOutlined, SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { ImageGalery } from "../components";
import { UploadImagesButton } from "../components/UploadImagesButton";

import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo, useState } from "react";
import { setActiveNote } from "../../store/notes/notesSlice";
import {
  startDeleteNote,
  startSaveNote,
  startDeleteImg,
} from "../../store/notes/thunks";

import Swal from "sweetalert2";

const formValid = {
  title: [
    [
      (value) => value.length > 4,
      "El titulo debe contener al menos 4 caracteres",
    ],
  ],
  body: [
    [
      (value) => value.length > 6,
      "El cuerpo debe contener al menos 6 caracteres",
    ],
  ],
};

export const NoteView = () => {
  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);
  const { activeNote, isSaving, messageSaved } = useSelector(
    (state) => state.note
  );

  const {
    body,
    title,
    onInputChange,
    formState,
    date,
    bodyValid,
    titleValid,
    isFormValid,
  } = useForm(activeNote, formValid);

  useEffect(() => {
    if (!isFormValid) return;
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (!isFormValid) return;
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
    setFormSubmited(false);
  }, [messageSaved]);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const onSaveNote = () => {
    setFormSubmited(true);
    dispatch(startSaveNote());
  };

  const onDeleteNote = () => {
    dispatch(startDeleteNote());
  };
  const deleteAllImages = async () => {
    // Swal.fire("Nota Modificada", messageUpdated, "success");
    Swal.fire({
      title: "Uds va a elminar las imagenes!Deseas guardar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "No Eliminar",
      denyButtonText: `Eliminar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("No se eliminaron las imagenes", "", "info");
        // Swal.fire("Guardado!", "", "success");
      } else if (result.isDenied) {
        await dispatch(startDeleteImg());
      }
    });

    setFormSubmited(false);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <UploadImagesButton />
        <Button sx={{ padding: 2 }} onClick={onSaveNote} disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
        <Button sx={{ padding: 2 }} onClick={onDeleteNote} disabled={isSaving}>
          <DeleteForeverOutlined sx={{ fontSize: 30, mr: 1 }} />
          Eliminar Nota
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
          error={!!titleValid && formSubmited}
          helperText={formSubmited && titleValid}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Descripcion"
          multiline
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
          error={!!bodyValid && formSubmited}
          helperText={formSubmited && bodyValid}
        />
      </Grid>
      {/* Galeria de imagenes */}
      <ImageGalery
        images={activeNote.imagesUrls}
        deleteAllImages={deleteAllImages}
      />
    </Grid>
  );
};
