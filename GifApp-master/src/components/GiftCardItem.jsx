import Card from "@mui/material/Card";
import { FacebookShareButton } from "react-share";
import CardMedia from "@mui/material/CardMedia";
import { IconButton, Fab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CardActions from "@mui/material/CardActions";
import { useEffect, useState } from "react";

export default function GiftCardItem({ title, url, id }) {
  const [favorite, setFavorite] = useState(false);
  const color = "red";
  return (
    <>
      <Card sx={{ maxWidth: 345, width: 200 }}>
        <CardMedia
          component="img"
          height="194"
          width="200"
          image={url}
          alt={title}
        />

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => setFavorite(!favorite)}
          >
            <FavoriteIcon style={{ color: favorite ? color : null }} />
          </IconButton>
          <FacebookShareButton url={url}>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </FacebookShareButton>
        </CardActions>
      </Card>
    </>
  );
}
