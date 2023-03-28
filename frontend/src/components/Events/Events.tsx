import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventsContext } from "../Contexts/EventsContext";
import { Event } from "./Event";
import type { TEvent } from "./types";

export const Events = () => {
  const { events, setEvents } = useContext(EventsContext);
  const [filtered, setFiltered] = useState<TEvent[]>([]);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/events", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
          setFiltered(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
        // alert(error.response.data.error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [setEvents]);

  useEffect(() => {
    const results = filtered.filter((res) =>
      res.event_name?.toLowerCase().includes(result)
    );
    setEvents(results);
  }, [result, filtered, setEvents]);

  return (
    <Box display="flex" textAlign="center" justifyContent="center">
      {isLoading ? (
        <Box margin="40px">
          <Typography variant="h3">Loading...</Typography>
        </Box>
      ) : (
        <Box marginTop="40px" width="100%">
          <Box width="300px" margin="0 auto">
            <TextField
              id="event-search"
              aria-label="event-search"
              label="Search events"
              type="search"
              variant="outlined"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              fullWidth
            />
          </Box>

          <Box margin="40px" display="flex" justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => navigate("/events/add-event")}
            >
              Add new Event
            </Button>
          </Box>

          <Grid container gap="20px" marginTop="40px" justifyContent="center">
            {events.map((event) => (
              <Event key={event.id} event={event} />
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
