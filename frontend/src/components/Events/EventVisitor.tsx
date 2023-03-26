import type { FC } from "react";
import type { TEventVisitorProps } from "./types";
import { Button, TableCell, TableRow } from "@mui/material";

export const EventVisitor: FC<TEventVisitorProps> = ({ eventVisitor }) => {
  const formatedDate = new Date(eventVisitor.date_of_birth).toLocaleDateString(
    "lt-LT"
  );

  const handleEditClick = () => {
    window.location.assign(`/visitors/edit-visitor/${eventVisitor.id}`);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">{eventVisitor.id}</TableCell>
      <TableCell align="center">{eventVisitor.full_name}</TableCell>
      <TableCell align="center">{eventVisitor.email}</TableCell>
      <TableCell align="center">{eventVisitor.age}</TableCell>
      <TableCell align="center">{formatedDate}</TableCell>
      <TableCell align="right">
        <Button onClick={handleEditClick}>Edit</Button>
      </TableCell>
      <TableCell align="left">
        <Button>Delete</Button>
      </TableCell>
    </TableRow>
  );
};
