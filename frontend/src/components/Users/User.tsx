import { Button, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EventsContext } from "../Contexts/EventsContext";
import { TUserProps } from "./types";

export const User: FC<TUserProps> = ({ user }) => {
  const { setUsers } = useContext(EventsContext);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/edit-user/${user.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      axios
        .delete(`http://localhost:5000/users/delete-user/${user.id}`, {
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
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">{user.id}</TableCell>

      <TableCell align="center">{user.username}</TableCell>

      <TableCell align="right">
        <Button onClick={handleEditClick}>Edit</Button>
      </TableCell>
      <TableCell align="left">
        <Button onClick={handleDeleteClick}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};
