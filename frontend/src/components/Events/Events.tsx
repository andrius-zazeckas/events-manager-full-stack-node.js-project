import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../Contexts/EventsContext";
import { Event } from "./Event";

export const Events = () => {
  const { events, setEvents } = useContext(EventsContext);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = () => {
    axios
      .get("http://localhost:5000/events", {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
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
  };

  useEffect(() => {
    setIsLoading(true);
    getEvents();
  }, []);

  console.log(events);

  return (
    <Box display="flex" textAlign="center" justifyContent="center">
      {isLoading ? (
        <Box margin="40px">
          <Typography variant="h3">Loading...</Typography>
        </Box>
      ) : (
        <Grid container gap="20px" marginTop="40px" justifyContent="center">
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </Grid>
      )}
    </Box>
  );
};
