import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TUsers } from "./types";

export const EditUser = () => {
  const [user, setUser] = useState<TUsers>({} as TUsers);
  const [updatedUser, setUpdatedUser] = useState<TUsers>({} as TUsers);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/users/${params.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUser(res.data[0] as TUsers);
        }
      })
      .catch((error) => {
        console.error(error);
        // alert(error.response.data.error);
      });
  }, [params.id, setUser]);

  //   console.log(user);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setUpdatedUser({
      ...updatedUser,
      [prop]: event.target.value,
    });
  };

  const resetForm = () => {
    setUpdatedUser({} as TUsers);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!Object.keys(updatedUser).length) {
      return alert("Please update the form before submitting");
    }

    if (window.confirm("Are you sure you want to edit this user?")) {
      axios
        .patch(
          `http://localhost:5000/admin/edit-user/${params.id}`,
          {
            username: updatedUser?.username,
            password: updatedUser?.password,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert(`User updated successfully`);

          resetForm();

          navigate(-1);
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <Box textAlign="center">
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
          <TextField
            id="edit-user-username"
            aria-label="edit user username"
            label="Username"
            variant="outlined"
            required
            defaultValue={user?.username}
            onChange={(event) => handleInputChange(event, "username")}
          />
        </FormControl>

        <FormControl>
          <TextField
            id="edit-user-password"
            aria-label="edit user password"
            label="Password"
            type="password"
            variant="outlined"
            required
            defaultValue={""}
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
  );
};
