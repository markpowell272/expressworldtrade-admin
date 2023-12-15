import React, { useEffect } from "react";
import "../css/Home.css";
import Navbar from "./Navbar";
import SearchIcon from "@mui/icons-material/Search";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { TransactionContext } from "../context/TransactionContext";
import { UsersContext } from "../context/UsersContext";
// import loaderimg from "../assets/icons8-combo-chart.gif";
import Loader from "./Loader";
import { Helmet } from "react-helmet";
import "../css/Home.css";
// import { UserContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  let hours = new Date().getHours();
  let time = null;
  if (hours < 12) {
    time = "Good Morning!";
  } else if (hours < 16) {
    time = "Good Afternoon!";
  } else if (hours < 21) {
    time = "Good Evening!";
  } else {
    time = "Good Night!";
  }

  const { users } = React.useContext(UsersContext);

  const { investment, deposit, withdrawal } =
    React.useContext(TransactionContext);
  const [usersState, setUsersState] = users;
  const [investmentState, setInvestmentState] = investment;
  const [depositState, setDepositState] = deposit;
  const [withdrawalState, setWithdrawalState] = withdrawal;

  // const [userState, setUserState] = React.useContext(UserContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!userState.username) {
  //     return navigate("/");
  //   }
  // });

  return (
    <>
      {!usersState ? (
        <Loader />
      ) : (
        <>
          <div className="home-container">
            <Helmet>
              <title>ET-Options | dashboard</title>
            </Helmet>
            <Navbar />
            <form>
              <input type="text" />
              <SearchIcon className="search-icon" />
            </form>
            <h1>Hello Admin, {time}</h1>
            <div className="user-container">
              <div>
                <SupervisedUserCircleIcon className="icon" />
                <h3>Total Users</h3>
                <h1>{usersState && usersState.length}</h1>
              </div>
              <div>
                <AccountBalanceIcon className="icon" />
                <h3>Total Investments</h3>
                <h1>{investmentState && investmentState.length}</h1>
              </div>
              <div>
                <PaymentsIcon className="icon" />
                <h3>Total Deposits</h3>
                <h1>{depositState && depositState.length}</h1>
              </div>
              <div>
                <AccountBalanceWalletIcon className="icon" />
                <h3>Total Withdralals</h3>
                <h1>{withdrawalState && withdrawalState.length}</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
