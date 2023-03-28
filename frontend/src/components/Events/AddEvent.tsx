import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TEvent } from "./types";

export const AddEvent = () => {
  const [newEvent, setNewEvent] = useState<TEvent>({} as TEvent);

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setNewEvent({
      ...newEvent,
      [prop]: event.target.value,
    });

    console.log(newEvent);
  };

  const resetForm = () => {
    setNewEvent({} as TEvent);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    axios
      .post(
        `http://localhost:5000/events/add-event`,
        {
          event_name: newEvent.event_name,
          date: newEvent.date,
          description: newEvent.description,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        alert(`Event added successfully`);

        resetForm();
        navigate(-1);
      })
      .catch((error) => {
        //   alert(error.response.data.error);
        console.error(error.response.data.error);
      });
  };

  return (
    <Box margin="0 auto">
      <Box>
        <Box>
          <Typography
            textAlign="center"
            variant="h2"
            margin="20px"
            fontSize="40px"
          >
            Register new User
          </Typography>
        </Box>
        <Box
          component="form"
          display="grid"
          maxWidth="300px"
          gap="10px"
          mx="auto"
          my="40px"
          onSubmit={handleSubmit}
        >
          <FormControl>
            <InputLabel htmlFor="Event name">Event name</InputLabel>
            <OutlinedInput
              label="Event name"
              required
              autoFocus
              value={newEvent.event_name ?? ""}
              onChange={(event) => handleInputChange(event, "event_name")}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="Description">Description</InputLabel>
            <OutlinedInput
              label="Description"
              required
              value={newEvent.description ?? ""}
              onChange={(event) => handleInputChange(event, "description")}
            />
          </FormControl>

          <FormControl>
            <InputLabel shrink htmlFor="date">
              Event date
            </InputLabel>
            <OutlinedInput
              notched
              type="date"
              label="Event date"
              required
              value={newEvent.date ?? ""}
              onChange={(event) => handleInputChange(event, "date")}
            />
          </FormControl>

          <Box display="flex" justifyContent="center" gap="20px">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
