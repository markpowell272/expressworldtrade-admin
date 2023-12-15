import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import logo from "../assets/logo.png";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [UserState, setUserState] = React.useContext(UserContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUserState({});
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <div style={{ backgroundColor: "white" }}>
          <Toolbar>
            <IconButton
              // color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              align="right"
              width="100%"
            >
              <img
                src={logo}
                alt=""
                width="150px"
                style={{ marginTop: "8px" }}
              />
            </Typography>
          </Toolbar>
        </div>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <div style={{ display: "flex" }}>
          <DrawerHeader>
            <div style={{ marginRight: "40px", marginLeft: "10px" }}>
              {/* <img src={logo} alt="" width="50px" /> */}
              <h3>Admin Panel</h3>
            </div>
            <div>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
          </DrawerHeader>
        </div>
        <Divider />
        <List>
          {[
            "Home",
            "Users",
            "Investments",
            "Deposits",
            "Withdralals",
            "Transactions",
            "Logout",
          ].map((text, index) => (
            <Link
              style={{ color: "#040647" }}
              to={
                index === 0
                  ? "/dashboard"
                  : index === 1
                  ? "/users"
                  : index === 2
                  ? "/Investments"
                  : index === 3
                  ? "/Deposits"
                  : index === 4
                  ? "/Withdrawals"
                  : index === 5
                  ? "/Transactions"
                  : "/"
              }
            >
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index === 0 && (
                      <Link to="/dashboard">
                        <HomeIcon />
                      </Link>
                    )}
                    {index === 1 && (
                      <Link to="/users">
                        <SupervisedUserCircleIcon />
                      </Link>
                    )}
                    {index === 2 && (
                      <Link to="/Investments">
                        <AccountBalanceIcon />
                      </Link>
                    )}
                    {index === 3 && (
                      <Link to="/Deposits">
                        <AccountBalanceWalletIcon />
                      </Link>
                    )}
                    {index === 4 && (
                      <Link to="/Withdrawals">
                        <PaymentsIcon />
                      </Link>
                    )}
                    {index === 5 && (
                      <Link to="/Transactions">
                        <CurrencyExchangeIcon />
                      </Link>
                    )}
                    {index === 6 && <PersonRemoveIcon onClick={logout} />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                <Divider />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
