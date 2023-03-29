import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, type FC, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TUsers } from "./types";

export const RegisterNewUser: FC = () => {
  const [user, setUser] = useState<TUsers>({} as TUsers);

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setUser({
      ...user,
      [prop]: event.target.value,
    });
  };

  const resetForm = () => {
    setUser({} as TUsers);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:5000/admin/register-user`, user, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        alert(`User added successfully`);

        resetForm();
        navigate(-1);
      })
      .catch((error) => {
        //   alert(error.response.data.error);
        console.error(error.response.data.error);
      });
  };

  return (
    <Box margin="0 auto">
      <Box>
        <Box>
          <Typography
            textAlign="center"
            variant="h2"
            margin="20px"
            fontSize="30px"
          >
            Register new User
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
            <InputLabel htmlFor="Username">Username</InputLabel>
            <OutlinedInput
              label="Username"
              required
              autoFocus
              value={user.username ?? ""}
              onChange={(event) => handleInputChange(event, "username")}
              error={!user.username?.length}
            />
            {!user.username?.length && (
              <FormHelperText>This field is required</FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="Password">Password</InputLabel>
            <OutlinedInput
              label="Password"
              type="password"
              required
              value={user.password ?? ""}
              onChange={(event) => handleInputChange(event, "password")}
            />
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
    </Box>
  );
};
