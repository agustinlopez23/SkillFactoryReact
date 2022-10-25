import { AddOutlined } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startNewNote } from "../../store/notes/thunks";

import { NotesLayout } from "../layout/NotesLayout";
import { NoteView, NothingSelectedView } from "../views";

export const NotesPage = ({ formSubmited, setFormSubmited }) => {
  const { isSaving, activeNote } = useSelector((state) => state.note);

  const dispatch = useDispatch();

  const onClickNewNote = () => {
    if (isSaving) return;
    if (activeNote === null) {
      dispatch(startNewNote());
    } else {
      if (activeNote.isSaved === null)
        Swal.fire(
          "IMPORTANTE!!",
          "No puedes crear una nota si tienes una nota abierta!",
          "warning"
        );

      if (activeNote.isSaved === true) dispatch(startNewNote());
    }
  };

  return (
    <NotesLayout>
      {activeNote ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        size="large"
        sx={{
          color: "#fff",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
        onClick={onClickNewNote}
      >
        {isSaving ? (
          <CircularProgress size={30} color="secondary" />
        ) : (
          <AddOutlined sx={{ fontSize: 30 }} />
        )}
      </IconButton>
    </NotesLayout>
  );
};
