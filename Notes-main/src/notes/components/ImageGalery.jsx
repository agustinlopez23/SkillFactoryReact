import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ImageGalery = ({ images = [], deleteAllImages }) => {
  return (
    <>
      <ImageList
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        cols={4}
        rowHeight={"auto"}
      >
        {images.map(({ url, path }) => (
          <ImageListItem key={url} sx={{ maxWidth: 300 }} gap={5}>
            <img src={url} srcSet={url} alt={path} />
          </ImageListItem>
        ))}
      </ImageList>
      {images.length === 0 ? (
        ""
      ) : (
        <IconButton aria-label="delete" onClick={() => deleteAllImages()}>
          <Delete />
        </IconButton>
      )}
    </>
  );
};
