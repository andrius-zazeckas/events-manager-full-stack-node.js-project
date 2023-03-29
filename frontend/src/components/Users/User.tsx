import { Button, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { type FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventsContext } from "../Contexts/EventsContext";
import type { TUserProps } from "./types";

export const User: FC<TUserProps> = ({ user }) => {
  const { setUsers } = useContext(EventsContext);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/edit-user/${user.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/admin/delete-user/${user.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert(`User deleted successfully`);

          setUsers((prevUser) =>
            prevUser.filter((deletedUser) => deletedUser.id !== user.id)
          );
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },

        ":hover": { bgcolor: "#DFE6E9", color: "#2D3436" },
      }}
    >
      <TableCell align="center">{user.id}</TableCell>

      <TableCell align="center">{user.username}</TableCell>

      <TableCell align="right">
        <Button onClick={handleEditClick}>Edit</Button>
      </TableCell>
      <TableCell align="left">
        <Button color="secondary" onClick={handleDeleteClick}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};
