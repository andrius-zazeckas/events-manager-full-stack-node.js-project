import { Box, Grid, Typography } from "@mui/material";
import { type FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const isAdminLoggedIn = () => {
    const token = localStorage.getItem("token");
    const adminId = document.cookie.split("id=")[1];

    if (token && adminId === "1") {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    isAdminLoggedIn();
  }, []);

  const handleRegisterClick = () => {
    navigate(`/visitors/register`);
  };

  const handleEventsClick = () => {
    navigate(`/events`);
  };

  const handleVisitorsClick = () => {
    navigate(`/visitors`);
  };

  const handleUsersClick = () => {
    navigate(`/users`);
  };

  return (
    <Box textAlign="center">
      <Grid
        container
        aria-label="home page"
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
          sm={2}
          padding="40px"
          boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
          borderRadius="5px"
          textAlign="center"
          sx={{
            cursor: "pointer",
            ":hover": { bgcolor: "#002984", color: "white" },
          }}
          onClick={handleRegisterClick}
        >
          <Typography variant="h5">Register</Typography>
        </Grid>

        <Grid
          item
          xs={6}
          sm={2}
          padding="40px"
          boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
          borderRadius="5px"
          textAlign="center"
          sx={{
            cursor: "pointer",
            ":hover": { bgcolor: "#002984", color: "white" },
          }}
          onClick={handleEventsClick}
        >
          <Typography variant="h5">Events</Typography>
        </Grid>

        <Grid
          item
          xs={6}
          sm={2}
          padding="40px"
          boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
          borderRadius="5px"
          textAlign="center"
          sx={{
            cursor: "pointer",
            ":hover": { bgcolor: "#002984", color: "white" },
          }}
          onClick={handleVisitorsClick}
        >
          <Typography variant="h5">Visitors</Typography>
        </Grid>
        {isAdmin && (
          <Grid
            item
            xs={6}
            sm={2}
            padding="40px"
            boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
            borderRadius="5px"
            textAlign="center"
            bgcolor="black"
            sx={{
              cursor: "pointer",
              ":hover": { bgcolor: "#002984", color: "white" },
            }}
            onClick={handleUsersClick}
          >
            <Typography variant="h5" color="white">
              Users
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
