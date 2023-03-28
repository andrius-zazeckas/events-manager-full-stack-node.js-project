import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEvents } from "../../hooks/useGetEvents";
import { TVisitor, TVisitors } from "./types";

export const EditVisitor = () => {
  const [visitors, setVisitors] = useState<TVisitors[]>([]);

  const formatedVisitorsDate = new Date(
    visitors[0]?.date_of_birth
  ).toLocaleDateString("lt-LT");

  const [isLoading, setIsLoading] = useState(true);
  const [updatedVisitor, setUpdatedVisitor] = useState<{
    [key: string]: string;
  }>({});

  const { events } = useGetEvents();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [params.id, setVisitors]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setUpdatedVisitor({
      ...updatedVisitor,
      [prop]: event.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formatedUpdatedVisitorDate = new Date(
      updatedVisitor?.date_of_birth
    ).toLocaleDateString("lt-LT");

    if (!Object.keys(updatedVisitor).length) {
      return alert("Please update the form before submitting");
    }

    if (window.confirm("Are you sure you want to edit this visitor?")) {
      axios
        .patch(
          `http://localhost:5000/visitors/edit-visitor/${params.id}`,
          {
            full_name: updatedVisitor?.full_name
              ? updatedVisitor?.full_name
              : visitors[0]?.full_name,
            event_id: updatedVisitor?.event_id || visitors[0]?.event_id,
            email: updatedVisitor?.email || visitors[0]?.email,
            date_of_birth: updatedVisitor.date_of_birth
              ? formatedUpdatedVisitorDate
              : formatedVisitorsDate,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert(`Visitor updated successfully`);

          //   resetForm();
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
        <Box
          component="form"
          display="grid"
          maxWidth="300px"
          gap="10px"
          mx="auto"
          my="40px"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="edit-visitor-name"
            aria-label="edit-visitor-name"
            label="Full name"
            variant="outlined"
            defaultValue={visitors[0]?.full_name}
            onChange={(event) => handleInputChange(event, "full_name")}
          />

          <TextField
            id="edit-visitor-email"
            aria-label="edit-visitor-email"
            label="Email"
            variant="outlined"
            defaultValue={visitors[0]?.email}
            onChange={(event) => handleInputChange(event, "email")}
          />

          <TextField
            id="edit-visitor-date-of-birth"
            aria-label="edit-visitor-date-of-birth"
            label="Date of birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            defaultValue={formatedVisitorsDate}
            onChange={(event) => handleInputChange(event, "date_of_birth")}
          />

          <TextField
            id="visitor-event"
            aria-label="visitor-event"
            label="Event"
            sx={{ textAlign: "left" }}
            select
            variant="outlined"
            defaultValue={visitors[0]?.event_id}
            onChange={(event) => handleInputChange(event, "event_id")}
          >
            {events.map((event) => (
              <MenuItem key={event.id} value={event.id}>
                {event.event_name}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" justifyContent="center" gap="20px">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
