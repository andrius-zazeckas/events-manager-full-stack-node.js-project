import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { type FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventsContext } from "../Contexts/EventsContext";
import { TEventProps } from "./types";

export const Event: FC<TEventProps> = ({ event }) => {
  const { events, setEvents } = useContext(EventsContext);
  const formatedDate = new Date(event.date).toLocaleDateString("lt-LT");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/event-visitors/${event.id}`);
  };

  const handleEditClick = () => {
    window.location.assign(`/events/edit-event/${event.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      axios
        .delete(`http://localhost:5000/events/delete-event/${event.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert(`Event deleted successfully`);

          setEvents((prevEvent) =>
            prevEvent.filter((deletedEvent) => deletedEvent.id !== event.id)
          );
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <Grid
      item
      xs={6}
      sm={6}
      md={3}
      padding="15px"
      boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
      borderRadius="5px"
      textAlign="center"
      sx={{
        cursor: "pointer",
        ":hover": { bgcolor: "#DFE6E9", color: "#2D3436" },
      }}
    >
      <Box onClick={handleClick}>
        <Typography variant="h4" fontSize="20px" fontWeight="550" my="20px">
          {event.event_name}
        </Typography>
        <Box
          display="flex"
          margin="0 auto"
          width="100%"
          height="200px"
          alignItems="center"
          aria-label="event image"
          sx={{
            "& img": { objectFit: "cover", width: "100%", maxHeight: "100%" },
          }}
          borderRadius="5px"
        >
          <img
            src={event && event.image}
            alt={(event && event.event_name) ?? "event image"}
          />
        </Box>
        <Box my="10px">
          <Typography component="p" fontSize="15px">
            {event.description}
          </Typography>
          <Typography>{formatedDate}</Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" gap="20px">
        <Button variant="outlined" onClick={handleEditClick}>
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </Box>
    </Grid>
  );
};
