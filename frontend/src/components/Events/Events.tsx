import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import type { TEvent } from "../../types";
import { EventsContext } from "../Contexts/EventsContext";
import { Event } from "./Event";

export const Events = () => {
  const { events, setEvents } = useContext(EventsContext);
  const [isLoading, setIsLoading] = useState(false);

  const GetEvents = () => {
    axios
      .get("http://localhost:5000/Events")
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
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    GetEvents();
  }, [axios, setEvents]);

  console.log(events);

  return (
    <Box>
      {isLoading && (
        <Box>
          <Typography>Loading...</Typography>
        </Box>
      )}
      <Box>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </Box>
    </Box>
  );
};
