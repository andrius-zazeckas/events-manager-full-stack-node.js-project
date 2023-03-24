import { Box, Grid, Typography } from "@mui/material";
import { type FC } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header: FC = () => {
  const { pathname } = useLocation();
  const isOnLoginLink = pathname.includes("/login");

  const isOnMainPage = pathname === "/";

  return (
    <Box
      component="header"
      textAlign="center"
      margin="0 auto"
      // width="100"
      borderBottom="1px solid gray"
    >
      <Typography variant="h3" padding={2} fontWeight="500" fontSize="44px">
        {isOnMainPage ? "Please login" : "Events manager"}
      </Typography>

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
          <Link to="/">
            <Typography aria-label="home link" fontSize="22px">
              Home
            </Typography>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Link to="/cart" aria-label="cart link">
            <Typography fontSize="22px">
              {/* Cart ({cartProducts.length}) */}
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
