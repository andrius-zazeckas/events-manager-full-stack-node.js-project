import { FC, useContext } from "react";
import type { TEventVisitorProps } from "./types";
import { Button, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { EventsContext } from "../Contexts/EventsContext";

export const EventVisitor: FC<TEventVisitorProps> = ({ eventVisitor }) => {
  const formatedDate = new Date(eventVisitor.date_of_birth).toLocaleDateString(
    "lt-LT"
  );

  const { setEventVisitors } = useContext(EventsContext);

  const full_name = `${eventVisitor.first_name} ${eventVisitor.last_name}`;

  const handleEditClick = () => {
    window.location.assign(`/visitors/edit-visitor/${eventVisitor.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      axios
        .delete(
          `http://localhost:5000/visitors/delete-visitor/${eventVisitor.id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          alert(`Visitor deleted successfully`);

          setEventVisitors((prevVisitor) =>
            prevVisitor.filter(
              (deletedVisitor) => deletedVisitor.id !== eventVisitor.id
            )
          );
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">{eventVisitor.id}</TableCell>
      <TableCell align="center">{full_name}</TableCell>
      <TableCell align="center">{eventVisitor.email}</TableCell>
      <TableCell align="center">{formatedDate}</TableCell>
      <TableCell align="center">{eventVisitor.age}</TableCell>
      <TableCell align="right">
        <Button onClick={handleEditClick}>Edit</Button>
      </TableCell>
      <TableCell align="left">
        <Button onClick={handleDeleteClick}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};
