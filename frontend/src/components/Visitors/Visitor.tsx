import type { FC } from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import type { TVisitorProps } from "./types";

export const Visitor: FC<TVisitorProps> = ({ visitor }) => {
  const formatedDate = new Date(visitor.date_of_birth).toLocaleDateString(
    "lt-LT"
  );

  const handleEditClick = () => {
    window.location.assign(`/visitors/edit-visitor/${visitor.id}`);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">{visitor.full_name}</TableCell>
      <TableCell align="center">{visitor.email}</TableCell>
      <TableCell align="center">{formatedDate}</TableCell>
      <TableCell align="center">{visitor.event_name}</TableCell>
      <TableCell align="right">
        <Button onClick={handleEditClick}>Edit</Button>
      </TableCell>
      <TableCell align="left">
        <Button>Delete</Button>
      </TableCell>
    </TableRow>
  );
};
