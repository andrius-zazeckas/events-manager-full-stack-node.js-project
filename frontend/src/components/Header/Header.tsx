import { Box, Grid, Typography } from "@mui/material";
import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header: FC = () => {
  const { pathname } = useLocation();

  const isOnIndexPage = pathname === "/";

  const logoutHandler = () => {
    localStorage.removeItem("token");
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <Box
      component="header"
      textAlign="center"
      margin="0 auto"
      // width="100"
      borderBottom="1px solid gray"
    >
      <Typography variant="h1" padding={2} fontWeight="500" fontSize="40px">
        {isOnIndexPage ? "Please login" : "Events manager"}
      </Typography>

      {!isOnIndexPage && (
        <Grid
          role="navigation"
          container
          textAlign="center"
          mb={2}
          sx={{
            "& a": {
              color: "purple",
              textDecoration: "none",

              ":hover": { color: "lightgreen" },
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
            <Link onClick={logoutHandler} to="/" aria-label="cart link">
              <Typography fontSize="22px">Logout</Typography>
            </Link>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
