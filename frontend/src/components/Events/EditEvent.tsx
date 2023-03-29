import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import axios from "axios";
import {
  ChangeEvent,
  type FC,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TEvent } from "./types";

export const EditEvent: FC = () => {
  const [tempEvent, setTempEvent] = useState<TEvent>({} as TEvent);
  const [isLoading, setIsLoading] = useState(true);
  const [updatedEvent, setUpdatedEvent] = useState<{
    [key: string]: string;
  }>({});

  const formatedEventDate = new Date(tempEvent?.date).toLocaleDateString(
    "lt-LT"
  );

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/event/${params.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTempEvent({
            event_name: res.data[0]?.event_name,
            description: res.data[0]?.description,
            date: res.data[0]?.date,
            image: res.data[0]?.image,
          } as TEvent);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.error);
      });
  }, [params.id, setTempEvent]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setUpdatedEvent({
      ...updatedEvent,
      [prop]: event.target.value,
    });
  };

  const resetForm = () => {
    setUpdatedEvent({});
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formatedUpdatedEventDate = new Date(
      updatedEvent?.date
    ).toLocaleDateString("lt-LT");

    if (!Object.keys(updatedEvent).length) {
      return alert("Please update the form before submitting");
    }

    if (window.confirm("Are you sure you want to edit this event?")) {
      axios
        .patch(
          `http://localhost:5000/events/edit-event/${params.id}`,
          {
            event_name: updatedEvent?.event_name
              ? updatedEvent?.event_name
              : tempEvent?.event_name,
            description: updatedEvent?.description
              ? updatedEvent?.description
              : tempEvent?.description,
            date: updatedEvent?.date
              ? formatedUpdatedEventDate
              : formatedEventDate,
            image: updatedEvent?.image ? updatedEvent?.image : tempEvent?.image,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert(`Event updated successfully`);

          resetForm();

          navigate(-1);
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <Box textAlign="center">
      {isLoading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <Box>
          <Box>
            <Typography
              textAlign="center"
              variant="h2"
              margin="20px"
              fontSize="30px"
            >
              Edit Event
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
              <TextField
                id="edit-event-name"
                aria-label="edit event name"
                label="Event name"
                variant="outlined"
                required
                defaultValue={tempEvent?.event_name}
                onChange={(event) => handleInputChange(event, "event_name")}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="edit-event-description"
                aria-label="edit event description"
                label="Description"
                variant="outlined"
                required
                defaultValue={tempEvent?.description}
                onChange={(event) => handleInputChange(event, "description")}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="edit-event-image"
                aria-label="edit event image"
                label="Image URL"
                variant="outlined"
                required
                defaultValue={tempEvent?.image}
                onChange={(event) => handleInputChange(event, "image")}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="edit-date"
                aria-label="edit date"
                label="Event date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                defaultValue={formatedEventDate}
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
      )}
    </Box>
  );
};
