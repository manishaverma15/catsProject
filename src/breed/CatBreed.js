import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { CardContent, Link, Typography } from "@mui/material";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function SelectVariants() {
  const [breed, setBreed] = React.useState([]);
  const [selectedBreed, setSelectedBreed] = React.useState({});
  // const [activeStep, setActiveStep] = React.useState(0);
  // const theme = useTheme();
  React.useEffect(() => {
    handleBreed();
  }, []);

  const handleBreed = () => {
    fetch(`https://api.thecatapi.com/v1/breeds?limit=40&page=0`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "live_EqefzSgDvMe7ae9PhmyIPRKEWRb3TJb3EMLj5GKYC8bQ3wBwjbRbj3c2yt5GcJ61",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBreed(data);
        setSelectedBreed({ ...data[0] });
        console.log("breed-res", data[0]);
      });
    // searchBreedImage();
  };

  const searchBreedImage = (query = "abys") => {
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=8&size=full&breed_id=${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "live_EqefzSgDvMe7ae9PhmyIPRKEWRb3TJb3EMLj5GKYC8bQ3wBwjbRbj3c2yt5GcJ61",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBreed(data);
        console.log("breed-response-for-image", data);
      });
  };

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleStepChange = (step) => {
  //   setActiveStep(step);
  // };

  const handleChange = (event) => {
    let showBreed = breed.find((item) => item.name === event.target.value);
    console.log("breed-detail", showBreed);
    setSelectedBreed({ ...showBreed });
  };

  console.log("breed-state", breed);
  return (
    <div>
      {breed.length ? (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Breed</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            value={selectedBreed.name}
            onChange={handleChange}
            label="Bengal"
          >
            {breed.map((item, index) => {
              return (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          <Card>
            {/* <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          > */}
            <Box
              component="img"
              sx={{
                height: 255,
                display: "block",
                margin: "auto",
                // maxWidth: 400,
                // overflow: "hidden",
                // width: "100%",
              }}
              src={selectedBreed.image.url}
              alt="not found"
            />
            {/* </AutoPlaySwipeableViews> */}
            {/* <MobileStepper
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext}>
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          /> */}
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5">{selectedBreed.name}</Typography>
              <Typography variant="h6">id:{selectedBreed.id}</Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.02rem",
                  fontFamily: "Avenir,Helvetica,Arial,sans-serif",
                }}
              >
                {selectedBreed.description}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.02rem",
                  fontFamily: "Avenir,Helvetica,Arial,sans-serif",
                }}
              >
                {selectedBreed.temperament}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.02rem",
                  fontFamily: "Avenir,Helvetica,Arial,sans-serif",
                }}
              >
                {selectedBreed.origin}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.02rem",
                  fontFamily: "Avenir,Helvetica,Arial,sans-serif",
                }}
              >
                {selectedBreed.weight.metric} Kgs
              </Typography>
              <Typography variant="h6">
                {selectedBreed.life_span} average life span
              </Typography>
            </CardContent>
            <Link href={selectedBreed.wikipedia_url} target="blank">
              WIKIPEDIA
            </Link>
          </Card>
        </FormControl>
      ) : (
        "loading..."
      )}
    </div>
  );
}
