import { Box, Grid, Typography } from "@mui/material";
import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export const Header: FC = () => {
  const { pathname } = useLocation();

  const isOnIndexPage = pathname === "/";
  const isOnEventsPage = pathname === "/events";
  const isOnVisitorsPage = pathname === "/visitors";
  const isOnUsersPage = pathname === "/users";

  const logoutHandler = () => {
    localStorage.removeItem("token");
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      margin="0 auto"
      marginTop="10px"
      marginBottom="5px"
      padding=" 0 10%"
      paddingBottom="10px"
      minHeight="64px"
      borderBottom="1px rgb(232, 232, 232) solid"
    >
      <Box>
        <Link to="/home">
          <img style={{ height: "30px" }} src={logo} alt="company logo" />
        </Link>
      </Box>
      <Typography
        variant="h1"
        padding={2}
        fontWeight="500"
        fontSize="30px"
        role="navigation"
      >
        {isOnIndexPage
          ? "Please login"
          : isOnEventsPage
          ? "Events"
          : isOnVisitorsPage
          ? "Visitors"
          : isOnUsersPage
          ? "Users"
          : "Events manager"}
      </Typography>

      {!isOnIndexPage && (
        <Grid
          role="navigation"
          container
          textAlign="center"
          width="200px"
          sx={{
            "& a": {
              color: "#757de8",
              textDecoration: "none",

              ":hover": { color: "#002984" },
            },
          }}
        >
          <Grid item xs={12} sm={6}>
            <Link to="/home">
              <Typography aria-label="home link" fontSize="22px">
                Home
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Link onClick={logoutHandler} to="/" aria-label="logout link">
              <Typography fontSize="22px">Logout</Typography>
            </Link>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
