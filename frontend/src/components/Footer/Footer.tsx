import { Box, Typography } from "@mui/material";
import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="50px"
      marginTop="100px"
      bgcolor="#DFE6E9"
      textAlign="center"
      padding="20px"
      position="relative"
      aria-label="footer"
    >
      <Typography
        textAlign="center"
        variant="body2"
        color="text.secondary"
        align="center"
      >
        © Events manager
      </Typography>
    </Box>
  );
};
