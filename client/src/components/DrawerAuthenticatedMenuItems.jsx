import { Link as RouterLink } from "react-router-dom";

import {
  ListItemIcon,
  ListItemButton,
  List,
  ListItemText,
  Collapse,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "./AuthProvider";

export const DrawerAuthenticated = ({ handleClick, nestedListState, drawerSetState }) => {
  const { handleLogoutClick } = useAuth();

  return (
    <List sx={{ color: "white" }}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <DeleteIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary='Delete Tweets' />
        {nestedListState ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={nestedListState} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            to='/delete-recent'
            component={RouterLink}
            onClick={drawerSetState}>
            <ListItemIcon>
              <AutoDeleteIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary='Most Recent' />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            to='/delete-everything'
            component={RouterLink}
            onClick={drawerSetState}>
            <ListItemIcon>
              <DeleteForeverIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary='Everything' />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleLogoutClick}>
        <ListItemIcon>
          <LogoutIcon sx={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItemButton>
    </List>
  );
};
