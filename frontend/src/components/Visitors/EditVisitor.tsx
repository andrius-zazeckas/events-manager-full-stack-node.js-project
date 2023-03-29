import {
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import {
  ChangeEvent,
  type FC,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEvents } from "../../hooks/useGetEvents";
import type { TVisitors } from "./types";

export const EditVisitor: FC = () => {
  const [tempVisitor, setTempVisitor] = useState<TVisitors>({} as TVisitors);

  const [isLoading, setIsLoading] = useState(true);
  const [updatedVisitor, setUpdatedVisitor] = useState<{
    [key: string]: string;
  }>({});

  const formatedVisitorsDate = new Date(
    tempVisitor?.date_of_birth
  ).toLocaleDateString("lt-LT");

  const { events } = useGetEvents();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/visitors/visitor/${params.id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTempVisitor({
            first_name: res.data[0]?.first_name,
            last_name: res.data[0]?.last_name,
            event_id: res.data[0]?.event_id,
            email: res.data[0]?.email,
            date_of_birth: res.data[0]?.date_of_birth,
          } as TVisitors);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        // alert(error.response.data.error);
      });
  }, [params.id, setTempVisitor]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setUpdatedVisitor({
      ...updatedVisitor,
      [prop]: event.target.value,
    });
  };

  const resetForm = () => {
    setUpdatedVisitor({});
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formatedUpdatedVisitorDate = new Date(
      updatedVisitor?.date_of_birth
    ).toLocaleDateString("lt-LT");

    if (!Object.keys(updatedVisitor).length) {
      return alert("Please update the form before submitting");
    }

    if (window.confirm("Are you sure you want to edit this visitor?")) {
      axios
        .patch(
          `http://localhost:5000/visitors/edit-visitor/${params.id}`,
          {
            first_name: updatedVisitor?.first_name
              ? updatedVisitor?.first_name
              : tempVisitor?.first_name,
            last_name: updatedVisitor?.last_name
              ? updatedVisitor?.last_name
              : tempVisitor?.last_name,
            event_id: updatedVisitor?.event_id || tempVisitor?.event_id,
            email: updatedVisitor?.email || tempVisitor?.email,
            date_of_birth: updatedVisitor.date_of_birth
              ? formatedUpdatedVisitorDate
              : formatedVisitorsDate,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert(`Visitor updated successfully`);

          resetForm();

          // if(pathname.includes("/"))
          navigate(-1);
          //   window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <Box textAlign="center">
      {isLoading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <Box>
          <Box>
            <Typography
              textAlign="center"
              variant="h2"
              margin="20px"
              fontSize="30px"
            >
              Edit Visitor
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
              <TextField
                id="edit-visitor-first-name"
                aria-label="edit-visitor-first-name"
                label="First name"
                variant="outlined"
                required
                defaultValue={tempVisitor?.first_name}
                onChange={(event) => handleInputChange(event, "first_name")}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="edit-visitor-last-name"
                aria-label="edit-visitor-last-name"
                label="Last name"
                variant="outlined"
                required
                defaultValue={tempVisitor?.last_name}
                onChange={(event) => handleInputChange(event, "last_name")}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="edit-visitor-email"
                aria-label="edit-visitor-email"
                label="Email"
                type="email"
                variant="outlined"
                required
                defaultValue={tempVisitor?.email}
                onChange={(event) => handleInputChange(event, "email")}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="edit-visitor-date-of-birth"
                aria-label="edit-visitor-date-of-birth"
                label="Date of birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
                defaultValue={formatedVisitorsDate}
                onChange={(event) => handleInputChange(event, "date_of_birth")}
              />
            </FormControl>

            <FormControl>
              <TextField
                id="visitor-event"
                aria-label="visitor-event"
                label="Event"
                sx={{ textAlign: "left" }}
                select
                variant="outlined"
                required
                defaultValue={tempVisitor?.event_id}
                onChange={(event) => handleInputChange(event, "event_id")}
              >
                {events.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.event_name}
                  </MenuItem>
                ))}
              </TextField>
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
