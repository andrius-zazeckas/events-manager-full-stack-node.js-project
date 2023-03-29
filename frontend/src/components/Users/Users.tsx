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
import type { TUsers } from "./types";
import { User } from "./User";

export const Users: FC = () => {
  const { users, setUsers } = useContext(EventsContext);
  const [filtered, setFiltered] = useState<TUsers[]>([]);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/users`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUsers(res.data);
          setFiltered(res.data);
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
  }, [setUsers]);

  useEffect(() => {
    const results = filtered.filter((res) =>
      res.username?.toLowerCase().includes(result)
    );
    setUsers(results);
  }, [result, filtered, setUsers]);

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
        <Box marginTop="40px" width="100%">
          <Box maxWidth="400px" margin="0 auto">
            <TextField
              id="user-search"
              aria-label="user-search"
              label="Search Users"
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
              onClick={() => navigate("/admin/register-user")}
            >
              Register new user
            </Button>
          </Box>

          <Box margin="40px" display="flex" justifyContent="center">
            <Box sx={{ width: "80%", display: "table", tableLayout: "fixed" }}>
              <TableContainer component={Paper}>
                <Table aria-label="event visitors table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        User ID
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }} align="center">
                        Username
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold" }}
                        align="center"
                      ></TableCell>
                      <TableCell
                        sx={{ fontWeight: "bold" }}
                        align="center"
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <User key={user.id} user={user} />
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
