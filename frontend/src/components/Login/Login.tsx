import { Box, Button, TextField } from "@mui/material";
import { FormEventHandler, useState } from "react";
import axios from "axios";

export const Login = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });

  const handleUserDataChange = (
    value: string,
    key: "username" | "password"
  ) => {
    setUserData((prevUserData) => ({ ...prevUserData, [key]: value }));
  };

  const resetForm = () => {
    setUserData({ username: "", password: "" });
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", {
        username: userData.username,
        password: userData.password,
      })
      .then((res) => {
        alert(res.data.message);

        localStorage.setItem("token", res.data.token);

        document.cookie = `id=${res.data.id}`;

        resetForm();
        window.location.assign(`./index.html`);
      })
      .catch((error) => {
        alert(error.response.data.error);
      });

    console.log(userData);
  };

  // const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
  //   event.preventDefault();

  //   axios
  //     .post("https://glittery-dull-snickerdoodle.glitch.me/v1/prescriptions", {
  //       medication_id: newPrescription.medication_id,
  //       pet_id: params.id,
  //       comment: newPrescription.comment,
  //     })
  //     .then(() => {
  //       alert(`Prescription was added`);

  //       resetForm();
  //     })
  //     .catch((error) => {
  //       console.error(error.response.data.err);
  //     });
  // };

  return (
    <form onSubmit={handleFormSubmit}>
      <Box textAlign="center" my="30px">
        <Box>
          <TextField
            required
            label="login"
            placeholder="username"
            value={userData.username}
            onChange={(e) => handleUserDataChange(e.target.value, "username")}
          />
        </Box>
        <Box my="10px">
          <TextField
            required
            label="password"
            placeholder="password"
            type="password"
            value={userData.password}
            onChange={(e) => handleUserDataChange(e.target.value, "password")}
          />
        </Box>
        <Button type="submit" variant="outlined">
          Login
        </Button>
      </Box>
    </form>
  );
};
