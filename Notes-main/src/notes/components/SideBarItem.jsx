import {
  DownhillSkiingOutlined,
  Title,
  TurnedInNot,
} from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";

import { setActiveNote } from "../../store/notes/notesSlice";
export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();
  const { activeNote } = useSelector((state) => state.note);

  const handleActiveNote = () => {
    if (activeNote?.title === "" || activeNote?.body === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Necesitas completar la nota!",
      });
    } else {
      dispatch(setActiveNote(note));
    }
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText
            primary={
              note.title.length > 15
                ? note.title.substring(0, 15) + "..."
                : note.title
            }
          />
          <ListItemText
            secondary={
              note.body.length > 50
                ? note.body.substring(0, 50) + "..."
                : note.body
            }
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
