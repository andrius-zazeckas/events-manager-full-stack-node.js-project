import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, type FC, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetEvents } from "../../hooks/useGetEvents";
import type { TVisitors } from "./types";

export const RegisterNewVisitor: FC = () => {
  const [visitorData, setVisitorData] = useState<TVisitors>({} as TVisitors);
  const { events, isLoading } = useGetEvents();

  const navigate = useNavigate();

  const calculatedAge = (birthday: Date) => {
    const diff_ms = Date.now() - birthday.getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setVisitorData({
      ...visitorData,
      [prop]: event.target.value,
    });
  };

  const handleSelectChange = (
    event: SelectChangeEvent<number>,
    prop: string
  ) => {
    setVisitorData({
      ...visitorData,
      [prop]: event.target.value,
    });
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
          first_name: visitorData.first_name,
          last_name: visitorData.last_name,
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
        alert(error.response.data.error);
        console.error(error.response.data.error);
      });
  };

  return (
    <Box margin="0 auto" aria-label="register new visitor form">
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
              fontSize="30px"
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
              <InputLabel htmlFor="first_name">First name</InputLabel>
              <OutlinedInput
                label="First name"
                required
                autoFocus
                value={visitorData.first_name ?? ""}
                onChange={(event) => handleInputChange(event, "first_name")}
                error={!visitorData.first_name?.length}
              />
              {!visitorData.first_name?.length && (
                <FormHelperText>This field is required</FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="last_name">Last name</InputLabel>
              <OutlinedInput
                label="Last name"
                required
                value={visitorData.last_name ?? ""}
                onChange={(event) => handleInputChange(event, "last_name")}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                label="Email"
                type="email"
                required
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
                required
                value={visitorData.date_of_birth ?? ""}
                onChange={(event) => handleInputChange(event, "date_of_birth")}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="age">Age</InputLabel>
              <OutlinedInput
                readOnly
                label="Age"
                value={
                  visitorData.date_of_birth
                    ? calculatedAge(new Date(visitorData.date_of_birth))
                    : "First select date of birth"
                }
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="event_id">Event</InputLabel>
              <Select
                label="Event"
                required
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
          </Box>
        </Box>
      )}
    </Box>
  );
};
