import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, type FC, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TVisitor, TVisitors } from "./types";

export const RegisterNewVisitor: FC = () => {
  const [visitorData, setVisitorData] = useState<TVisitor>({
    visitor: {} as TVisitors,
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setVisitorData({
      ...visitorData,
      [prop]: event.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // const formatedUpdatedVisitorDate = new Date(
    //   updatedVisitor?.date_of_birth
    // ).toLocaleDateString("lt-LT");

    // if (!Object.keys(updatedVisitor).length) {
    //   return alert("Please update the form before submitting");
    // }

    axios
      .post(`http://localhost:5000/visitors/register`, {
        full_name: visitorData.visitor.full_name,
        event_id: visitorData.visitor.event_id,
        email: visitorData.visitor.email,
        date_of_birth: visitorData.visitor.date_of_birth,
      })
      .then(() => {
        alert(`Visitor updated successfully`);

        // resetForm();
      })
      .catch((error) => {
        //   alert(error.response.data.error);
        console.error(error.response.data.error);
      });
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h2" margin="20px" fontSize="40px">
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
        <TextField
          id="visitor-name"
          aria-label="visitor-name"
          label="Full name"
          variant="outlined"
          value={visitorData.visitor.full_name}
          onChange={(event) => handleInputChange(event, "full_name")}
        />

        <TextField
          id="visitor-email"
          aria-label="visitor-email"
          label="Email"
          variant="outlined"
          value={visitorData.visitor.email}
          onChange={(event) => handleInputChange(event, "email")}
        />

        <TextField
          id="visitor-date-of-birth"
          aria-label="visitor-date-of-birth"
          label="Date of birth"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={visitorData.visitor.date_of_birth}
          onChange={(event) => handleInputChange(event, "date_of_birth")}
        />
        {/* 
        <TextField
          id="visitor-event"
          aria-label="visitor-event"
          label="Event"
          select
          variant="outlined"
          //   value={visitorData[0]?.event_name}
          // onChange={(event) => handleInputChange(event, "event_name")}
        ></TextField> */}

        <Box display="flex" justifyContent="center" gap="20px">
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};
