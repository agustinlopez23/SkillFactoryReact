import React, { useState } from "react";
import { Fab, TextField } from "@mui/material";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
export default function AddCategories({ AddCategory, setCategory }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.length < 1) {
      alert("Debes ingresar algo en el campo de busqueda");
      return;
    }

    setInputValue(e.target.value);
    AddCategory(inputValue);

    setInputValue("");
  };

  const handleReset = () => {
    setInputValue("");
    setCategory([]);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label=""
          placeholder="Ingresa el nombre de tu GIF "
          variant="outlined"
          sx={{ display: "flex", justifyContent: "space-around", flexGrow: 1 }}
          name="inputValue"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Fab variant="extended" color="primary" type="submit">
          <PageviewOutlinedIcon />
        </Fab>

        <Fab variant="extended" color="secondary" onClick={handleReset}>
          <RestartAltIcon />
        </Fab>
      </form>
    </>
  );
}
