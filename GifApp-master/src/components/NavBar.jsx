import React from "react";
import "../assets/css/NavBar.css";
import { Box, Button, Container } from "@mui/material";
import AddCategories from "./AddCategories";

export default function NavBar({ AddCategory, setCategory }) {
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box component="span" sx={{ border: "1px dashed grey" }}>
          <Button>
            <h3>GifApp</h3>
          </Button>
        </Box>
        <AddCategories AddCategory={AddCategory} setCategory={setCategory} />
      </Container>
    </div>
  );
}
