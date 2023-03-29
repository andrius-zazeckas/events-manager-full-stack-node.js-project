import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { type FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventsContext } from "../Contexts/EventsContext";
import type { TVisitors } from "./types";
import { Visitor } from "./Visitor";

export const Visitors: FC = () => {
  const { visitors, setVisitors } = useContext(EventsContext);
  const [filtered, setFiltered] = useState<TVisitors[]>([]);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/visitors`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setVisitors(res.data);
          setFiltered(res.data);
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
  }, [setVisitors]);

  useEffect(() => {
    const results = filtered.filter(
      (res) =>
        res.first_name?.toLowerCase().includes(result) ||
        res.last_name?.toLowerCase().includes(result)
    );
    setVisitors(results);
  }, [result, filtered, setVisitors]);

  return (
    <Box display="flex" textAlign="center" justifyContent="center" mx="auto">
      {isLoading ? (
        <Box margin="40px">
          <Typography variant="h3">Loading...</Typography>
        </Box>
      ) : (
        <Box marginTop="40px" width="100%">
          <Box maxWidth="400px" margin="0 auto">
            <TextField
              id="visitor-search"
              aria-label="visitor search"
              label="Search Visitors"
              type="search"
              variant="outlined"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              fullWidth
            />
          </Box>
          <Box margin="40px" display="flex" justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => navigate(`/visitors/register`)}
            >
              Register new visitor
            </Button>
          </Box>

          <Box margin="40px" display="flex" justifyContent="center">
            <Box sx={{ width: "90%", display: "table", tableLayout: "fixed" }}>
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
          </Box>
        </Box>
      )}
    </Box>
  );
};
