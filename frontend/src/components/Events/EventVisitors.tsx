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
import { type FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventsContext } from "../Contexts/EventsContext";
import { EventVisitor } from "./EventVisitor";

export const EventVisitors: FC = () => {
  const { eventVisitors, setEventVisitors } = useContext(EventsContext);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/event-visitors/${params.id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEventVisitors(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [params.id, setEventVisitors]);

  return (
    <Box display="flex" textAlign="center" justifyContent="center" mx="auto">
      {isLoading ? (
        <Box margin="40px">
          <Typography variant="h3">Loading...</Typography>
        </Box>
      ) : (
        <Box margin="40px">
          <Typography variant="h4" marginBottom="40px">
            Event visitors
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="event visitors table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Visitor ID
                  </TableCell>
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
                    Age
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventVisitors.map((eventVisitor) => (
                  <EventVisitor
                    key={eventVisitor.id}
                    eventVisitor={eventVisitor}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};
