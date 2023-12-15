// import React from "react";
// import { useParams } from "react-router-dom";

// const User = () => {
//   const params = useParams();
//   console.log(params.id);
//   return (
//     <div>
//       <h1>User's details</h1>
//     </div>
//   );
// };

// export default User;

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
// import loaderimg from "../assets/icons8-combo-chart.gif";
import "../css/Home.css";
import "../css/General.css";
import Navbar from "./Navbar";
import { UsersContext } from "../context/UsersContext";
import { Button, Box, Popover, Typography, TextField } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { ToastifyContext } from "../context/ToastifyContext";
import { userFund, getUsers } from "../data";
import Loader from "./Loader";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getSingleUser, updateSingleUser, deleteSingleUser } from "../data";
import profilepic from "../assets/default.jpg";
import { FaTelegramPlane } from "react-icons/fa";

const User = () => {
  let admin = JSON.parse(localStorage.getItem("user"));
  const token = admin.token;
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { users } = React.useContext(UsersContext);
  const [user, setUser] = useState({});

  const [loading, setLoading] = React.useState(false);

  const [userDetails, setUserDetails] = React.useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    balance: "",
    profit: "",
  });

  useEffect(() => {
    const fetchSingleUser = async () => {
      setLoading(true);
      try {
        const user = await getSingleUser(token, id);
        setUser(user);
        setUserDetails({
          name: user.name,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          balance: user.balance,
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchSingleUser();
  }, [params.id]);

  const [ToastifyState, setToastifyState] = React.useContext(ToastifyContext);
  const [usersState, setUsersState] = users;

  const [userState, setUserState] = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSingleUser(token, userDetails, id);
    return setToastifyState({
      ...ToastifyState,
      message: "Profile Updated Successfully",
      variant: "success",
      open: true,
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteSingleUser(token, id);
    navigate("/users");
    return setToastifyState({
      ...ToastifyState,
      message: "User Deleted Successfully",
      variant: "success",
      open: true,
    });
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="flex-me">
        <h1 style={{ marginBottom: "10px" }}>USER DETAILS</h1>
        {userDetails.name === "" ? (
          ""
        ) : (
          <button onClick={handleDelete}>DELETE USER</button>
        )}
      </div>
      {userDetails.name === "" ? (
        <h1>User has been deleted.</h1>
      ) : (
        <div className="">
          <div className="">
            <form onSubmit={handleSubmit} id="edit-form">
              <h2>EDIT USER DETAILS</h2>

              {/* <img
              src={
                `https://expressworldtrade.onrender.com/${user.profileImage[0].link}`
                  ? `https://expressworldtrade.onrender.com/${user.profileImage[0].link}`
                  : profilepic
              }
              alt=""
            /> */}
              <label>Full Name</label>
              <input
                type="text"
                readOnly
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                placeholder="Enter your Name"
              />

              <label>User Name</label>
              <input
                type="text"
                value={userDetails.username}
                readOnly
                onChange={(e) =>
                  setUserDetails({ ...userDetails, username: e.target.value })
                }
                placeholder="Enter your Username"
              />

              <label>Email</label>
              <input
                type="email"
                value={userDetails.email}
                readOnly
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                placeholder="Enter your Email"
              />

              <label>Phone Number</label>
              <input
                type="text"
                value={userDetails.phoneNumber}
                readOnly
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    phoneNumber: e.target.value,
                  })
                }
                placeholder="Enter your Phone Number"
              />

              <label>Balance</label>
              <input
                type="text"
                value={userDetails.balance}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    balance: e.target.value,
                  })
                }
                placeholder="Edit Balance"
              />

              <label>Add Profit</label>
              <input
                type="text"
                value={userDetails.profit}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    profit: e.target.value,
                  })
                }
                placeholder="Add Profit"
              />

              <button disabled={loading}>
                <FaTelegramPlane />
                &nbsp;{loading ? "LOADING..." : "UPDATE PROFILE"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
