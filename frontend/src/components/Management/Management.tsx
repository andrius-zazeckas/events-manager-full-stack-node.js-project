import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { EventsContext } from "../Contexts/EventsContext";

export const Management = () => {
  const { visitors } = useContext(EventsContext);

  const handleRegisterClick = () => {
    window.location.assign(`./visitors/register`);
  };

  const handleEventsClick = () => {
    window.location.assign(`./events`);
  };

  const handleVisitorsClick = () => {
    window.location.assign(`./visitors`);
  };

  return (
    <Box textAlign="center">
      <Grid
        container
        aria-label="management"
        display="flex"
        justifyContent="center"
        gridTemplateColumns="auto auto auto"
        gap="30px"
        margin="0 auto"
        marginTop="40px"
      >
        <Grid
          item
          xs={6}
          sm={3}
          padding="40px"
          boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
          borderRadius="5px"
          textAlign="center"
          sx={{ cursor: "pointer" }}
          onClick={handleRegisterClick}
        >
          <Typography variant="h5">Register</Typography>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
          padding="40px"
          boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
          borderRadius="5px"
          textAlign="center"
          sx={{ cursor: "pointer" }}
          onClick={handleEventsClick}
        >
          <Typography variant="h5">Events</Typography>
        </Grid>

        <Grid
          item
          xs={6}
          sm={3}
          padding="40px"
          boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
          borderRadius="5px"
          textAlign="center"
          sx={{ cursor: "pointer" }}
          onClick={handleVisitorsClick}
        >
          <Typography variant="h5">Visitors</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
