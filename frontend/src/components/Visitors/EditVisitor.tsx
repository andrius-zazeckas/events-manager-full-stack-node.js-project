import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventsContext } from "../Contexts/EventsContext";
import { TVisitors } from "./types";

export const EditVisitor = () => {
  const { visitors, setVisitors } = useContext(EventsContext);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getVisitor = () => {
      axios
        .get(`http://localhost:5000/visitors/visitor/${params.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            setVisitors(res.data);
          }
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
          // alert(error.response.data.error);
        });
    };

    getVisitor();
  }, []);

  const formatedDate = new Date(visitors[0]?.date_of_birth).toLocaleDateString(
    "lt-LT"
  );

  console.log(visitors);

  return (
    <Box textAlign="center">
      {isLoading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <Box
          component="form"
          display="grid"
          maxWidth="300px"
          gap="10px"
          margin="0 auto"
        >
          <FormControl variant="standard">
            <InputLabel htmlFor="visitor-name">Full name</InputLabel>
            <Input
              id="visitor-name"
              aria-describedby="visitor-name"
              defaultValue={visitors[0]?.full_name}
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel htmlFor="visitor-email">Email</InputLabel>
            <Input
              id="visitor-email"
              aria-describedby="visitor-email"
              defaultValue={visitors[0]?.email}
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel htmlFor="visitor-date-of-birth">
              Date of birth
            </InputLabel>
            <Input
              type="date"
              id="visitor-date-of-birth"
              aria-describedby="visitor-date-of-birth"
              defaultValue={formatedDate}
              //   value={n}
            />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel htmlFor="visitor-event">Event</InputLabel>
            <Input
              id="visitor-event"
              aria-describedby="visitor-event"
              defaultValue={visitors[0]?.event_name}
            />
          </FormControl>
          <Button variant="contained">Save</Button>
        </Box>
      )}
    </Box>
  );
};
