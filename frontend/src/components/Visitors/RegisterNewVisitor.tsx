import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, type FC, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetEvents } from "../../hooks/useGetEvents";
import type { TVisitors } from "./types";

export const RegisterNewVisitor: FC = () => {
  const [visitorData, setVisitorData] = useState({} as TVisitors);
  const { events, isLoading } = useGetEvents();

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setVisitorData({
      ...visitorData,
      [prop]: event.target.value,
    });
    console.log(visitorData);
  };

  const handleSelectChange = (
    event: SelectChangeEvent<number>,
    prop: string
  ) => {
    setVisitorData({
      ...visitorData,
      [prop]: event.target.value,
    });
    console.log(visitorData);
  };

  const resetForm = () => {
    setVisitorData({} as TVisitors);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    axios
      .post(
        `http://localhost:5000/visitors/register`,
        {
          full_name: visitorData.full_name,
          event_id: visitorData.event_id,
          email: visitorData.email,
          date_of_birth: visitorData.date_of_birth,
        },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        alert(`Visitor added successfully`);

        resetForm();
      })
      .catch((error) => {
        //   alert(error.response.data.error);
        console.error(error.response.data.error);
      });
  };

  return (
    <Box margin="0 auto">
      {isLoading ? (
        <Typography textAlign="center" variant="h3">
          Loading...
        </Typography>
      ) : (
        <Box>
          <Box>
            <Typography
              textAlign="center"
              variant="h2"
              margin="20px"
              fontSize="40px"
            >
              Register new Visitor
            </Typography>
          </Box>
          <Box
            component="form"
            display="grid"
            maxWidth="300px"
            gap="10px"
            mx="auto"
            my="40px"
            onSubmit={handleSubmit}
          >
            <FormControl>
              <InputLabel htmlFor="full_name">Full name</InputLabel>
              <OutlinedInput
                label="Full name"
                value={visitorData.full_name ?? ""}
                onChange={(event) => handleInputChange(event, "full_name")}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                label="Email"
                value={visitorData.email ?? ""}
                onChange={(event) => handleInputChange(event, "email")}
              />
            </FormControl>

            <FormControl>
              <InputLabel shrink htmlFor="date_of_birth">
                Date of birth
              </InputLabel>
              <OutlinedInput
                notched
                type="date"
                label="Date of birth"
                value={visitorData.date_of_birth ?? ""}
                onChange={(event) => handleInputChange(event, "date_of_birth")}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="event_id">Event</InputLabel>
              <Select
                label="Event"
                value={visitorData.event_id ?? ""}
                onChange={(event) => handleSelectChange(event, "event_id")}
              >
                {events.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.event_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box display="flex" justifyContent="center" gap="20px">
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
            {/* </form> */}
          </Box>
        </Box>
      )}
    </Box>
  );
};
