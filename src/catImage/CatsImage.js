import * as React from "react";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Icon } from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import axios from "axios";

const CatsImage = () => {
  const [cat, setCat] = React.useState({});
  const [vote, setVote] = React.useState({});

  React.useEffect(() => {
    handleCat();
  }, []);

  const handleLikeVotes = () => {
    fetch(`https://api.thecatapi.com/v1/votes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_EqefzSgDvMe7ae9PhmyIPRKEWRb3TJb3EMLj5GKYC8bQ3wBwjbRbj3c2yt5GcJ61",
      },
      body: JSON.stringify({
        image_id: cat.id,
        value: 1,
      }),
    })
      .then((res) => res.json())
      .then((result) => { 
        setVote(result)
        console.log("result", result)
        handleCat();
    })
      .catch((err) => console.log("error", err));
  };

  const handleDisLikeVotes = () => {
    fetch(`https://api.thecatapi.com/v1/votes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_EqefzSgDvMe7ae9PhmyIPRKEWRb3TJb3EMLj5GKYC8bQ3wBwjbRbj3c2yt5GcJ61",
      },
      body: JSON.stringify({
        image_id: cat.id,
        value: -1,
      }),
    })
      .then((res) => res.json())
      .then((result) => { 
        setVote(result)
        console.log("result", result)
        handleCat();
    })
      .catch((err) => console.log("error", err));
  };

  const handleCat = () => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=1`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_EqefzSgDvMe7ae9PhmyIPRKEWRb3TJb3EMLj5GKYC8bQ3wBwjbRbj3c2yt5GcJ61",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCat(data[0]);
        console.log("response-11", data);
      });
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", marginTop: "20px" }}>
      <Stack
        spacing={2}
        direction="row"
        sx={{ padding: "20px", justifyContent: "space-evenly" }}
      >
        <Button
          variant="contained"
          sx={{ color: "black", backgroundColor: "green", gap: "10px" }}
          onClick={handleLikeVotes}
          value={vote}
        >
          <ThumbUp />
          LOVE IT
        </Button>
        <Button
          variant="contained"
          sx={{ color: "black", backgroundColor: "red", gap: "10px" }}
          onClick={handleDisLikeVotes}
        >
          <ThumbDown />
          NOPE IT
        </Button>
      </Stack>
      <CardMedia sx={{ height: 558 }} image={cat.url} component="img" />
    </Card>
  );
};
export default CatsImage;
