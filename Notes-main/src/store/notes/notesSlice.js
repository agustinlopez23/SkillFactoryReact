import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  messageSaved: "",
  messageUpdated: "",
  notes: [],
  activeNote: null,
};

// {
//     id: 'ABC123',
//     title: '',
//     body: '',
//     date: 123456,
//     imagesUrl: []
// }

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.activeNote = payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    startSaving: (state) => {
      state.isSaving = true;

      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) return payload;
        return note;
      });
      state.activeNote.isSaved = true;
      state.isSaving = false;
      state.messageSaved = `${payload.title}, Guardada correctamente`;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.activeNote.imagesUrls = [
        ...state.activeNote.imagesUrls,
        ...payload,
      ];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, { payload }) => {
      state.notes = state.notes.filter((note) => note.id !== payload);
      state.activeNote = null;
      state.isSaving = false;
    },
    deleteNoteByImage: (state) => {
      state.activeNote.imagesUrls = [];

      state.isSaving = false;
    },
    updateNoteWithoutSave: (state, { payload }) => {
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) return payload;
        return note;
      });
      state.isSaving = false;
      state.messageUpdated = `${payload.title}, Guarda la nota para conservar tus cambios!`;
    },
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  startSaving,
  updateNote,
  deleteNoteById,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteByImage,
  updateNoteWithoutSave,
} = noteSlice.actions;

export default noteSlice.reducer;
