import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
// import loaderimg from "../assets/icons8-combo-chart.gif";
import "../css/Home.css";
import Navbar from "./Navbar";
import { UsersContext } from "../context/UsersContext";
import { Button, Box, Popover, Typography, TextField } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { ToastifyContext } from "../context/ToastifyContext";
import { userFund, getUsers } from "../data";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Users = () => {
  const { users } = React.useContext(UsersContext);

  const [ToastifyState, setToastifyState] = React.useContext(ToastifyContext);
  const [usersState, setUsersState] = users;

  const [userState, setUserState] = React.useContext(UserContext);

  const [details, setDetails] = React.useState({
    id: null,
    amount: null,
  });

  const fundUser = async () => {
    if (!details.id || !details.amount)
      return setToastifyState({
        ...ToastifyState,
        message: "Input must not be empty",
        variant: "error",
        open: true,
      });

    // setToastifyState({
    //   ...ToastifyState,
    //   message: "Loading",
    //   variant: "info",
    //   open: true,
    // });

    let fund = await userFund(userState.token, details);
    handleClose();
    setDetails({
      id: null,
      amount: null,
    });

    if (fund) {
      setToastifyState({
        ...ToastifyState,
        message: fund.message,
        variant: "success",
        open: true,
      });
    }
    let users = await getUsers(userState.token);

    setUsersState(users);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {!usersState ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>ET-Options | All Users</title>
          </Helmet>
          <div className="home-container">
            <Navbar />
            <div className="body">
              <div className="content">
                <div className="account-stats scroll-x">
                  <br />
                  <h3>ALL USERS</h3>
                  <br />
                  {usersState.length > 0 ? (
                    <table cellPadding={10} style={{ width: "1500px" }}>
                      <thead>
                        <th>S/N</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Date Joined</th>
                        <td>&nbsp;Action</td>
                        <td>&nbsp;Details</td>
                      </thead>
                      {usersState
                        .sort(function (a, b) {
                          var dateA = new Date(a.createdAt),
                            dateB = new Date(b.createdAt);
                          return dateB - dateA;
                        })
                        .map((x, index) => {
                          return (
                            <>
                              <tr>
                                <td>{index + 1}</td>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.balance}</td>
                                <td>{new Date(x.createdAt).toDateString()}</td>
                                <td>
                                  <Box sx={{ flexGrow: 1 }}>
                                    <Button
                                      variant="contained"
                                      color="info"
                                      style={{ fontSize: 10 }}
                                      onClick={(e) => {
                                        setDetails({
                                          ...details,
                                          id: x._id,
                                        });
                                        handleClick(e);
                                      }}
                                    >
                                      Fund
                                    </Button>
                                  </Box>
                                </td>
                                <td>
                                  <Link to={`user/${x._id}`}>View Details</Link>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </table>
                  ) : (
                    <small className="division">
                      No data available in table
                    </small>
                  )}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Amount to Fund"
              variant="outlined"
              type="number"
              value={details.amount}
              onChange={(e) =>
                setDetails({ ...details, amount: e.target.value })
              }
            />
            <br />
            <div style={{ display: "grid", placeItems: "center" }}>
              <Button
                variant="contained"
                color="success"
                style={{ fontSize: 10 }}
                onClick={() => {
                  fundUser();
                }}
              >
                Fund
              </Button>
            </div>
          </Box>
        </Typography>
      </Popover>
    </>
  );
};

export default Users;
