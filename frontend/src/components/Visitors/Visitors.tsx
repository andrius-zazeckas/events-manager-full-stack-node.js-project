import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../Contexts/EventsContext";
import { Visitor } from "./Visitor";

export const Visitors = () => {
  const { visitors, setVisitors } = useContext(EventsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/visitors`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setVisitors(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
        // alert(error.response.data.error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [setVisitors]);

  console.log(visitors);

  return (
    <Box
      display="flex"
      textAlign="center"
      justifyContent="center"
      //   maxWidth="800px"
      mx="auto"
    >
      {isLoading ? (
        <Box margin="40px">
          <Typography variant="h3">Loading...</Typography>
        </Box>
      ) : (
        <Box margin="40px">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="event visitors table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Full name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Date of birth
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Event
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visitors.map((visitor) => (
                  <Visitor key={visitor.id} visitor={visitor} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};
