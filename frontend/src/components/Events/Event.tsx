import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { TEventProps } from "./types";

export const Event: FC<TEventProps> = ({ event }) => {
  return (
    <Box>
      <Typography>{event.event_name}</Typography>
    </Box>
  );
};
