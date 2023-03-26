import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { TEventProps } from "./types";

export const Event: FC<TEventProps> = ({ event }) => {
  const formatedDate = new Date(event.date).toLocaleDateString("lt-LT");

  const handleClick = () => {
    window.location.assign(`/events/event-visitors/${event.id}`);
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      padding="20px"
      boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
      borderRadius="5px"
      textAlign="center"
      sx={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Typography variant="h4" fontSize="30px" my="20px">
        {event.event_name}
      </Typography>
      <Typography>{event.description}</Typography>
      <Typography>{formatedDate}</Typography>
    </Grid>
  );
};
