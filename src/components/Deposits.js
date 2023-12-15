import React, { useEffect } from "react";
import "../css/Home.css";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { TransactionContext } from "../context/TransactionContext";
// import loaderimg from "../assets/icons8-combo-chart.gif";
import Loader from "./Loader";
import { Button, Grid, Box } from "@mui/material";
import { ToastifyContext } from "../context/ToastifyContext";
import { UserContext } from "../context/UserContext";
import {
  confirmDeposit,
  processDeposit,
  declineDeposit,
  getDeposit,
} from "../data";

const Deposits = () => {
  const { deposit } = React.useContext(TransactionContext);

  const [depositState, setDepositState] = deposit;

  const [ToastifyState, setToastifyState] = React.useContext(ToastifyContext);
  const [UserState, setUserState] = React.useContext(UserContext);

  const fateOfDeposit = async (fate, id) => {
    // setToastifyState({
    //   ...ToastifyState,
    //   message: "Loading",
    //   variant: "info",
    //   open: true,
    // });

    if (fate === "process") {
      let process = await processDeposit(UserState.token, id);
      console.log(process);
      if (process) {
        setToastifyState({
          ...ToastifyState,
          message: process.message,
          variant: "success",
          open: true,
        });
      }
    }

    if (fate === "confirm") {
      let confirm = await confirmDeposit(UserState.token, id);
      if (confirm) {
        setToastifyState({
          ...ToastifyState,
          message: confirm.message,
          variant: "success",
          open: true,
        });
      }
    }

    if (fate === "decline") {
      let decline = await declineDeposit(UserState.token, id);
      if (decline) {
        setToastifyState({
          ...ToastifyState,
          message: decline.message,
          variant: "success",
          open: true,
        });
      }
    }

    let deposit = await getDeposit(UserState.token);
    setDepositState(deposit);
  };

  return (
    <>
      {!depositState ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>ET-Options | Deposit History</title>
          </Helmet>
          <Navbar />
          <div className="home-container">
            <div className="body">
              <div className="content">
                <div className="account-stats scroll-x">
                  <br />
                  <h3>DEPOSIT HISTORY</h3>
                  <div className="card-show ref-user">
                    <br />
                    {depositState.length > 0 ? (
                      <table cellPadding={10} style={{ width: "1500px" }}>
                        <thead>
                          <td>#&nbsp;S/N</td>
                          <td className="td">&nbsp;Date</td>
                          <td className="td">&nbsp;Email</td>
                          <td className="td">&nbsp;Deposit ID</td>
                          <td>&nbsp;Deposit Method</td>
                          <td>&nbsp;Amount Deposited</td>
                          <td className="td">&nbsp;Proof</td>
                          <td>&nbsp;Status</td>
                          <td className="td">&nbsp;Action</td>
                        </thead>
                        {depositState
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
                                  <td>
                                    {new Date(x.createdAt).toDateString()}
                                  </td>
                                  <td>{x.user.email}</td>
                                  <td>{x._id}</td>
                                  <td>{x.mode}</td>
                                  <td>{x.amount}</td>
                                  <td>
                                    <a
                                      href={`https://expressworldtrade.onrender.com/${x.proof[0].link}`}
                                      target="_blank"
                                    >
                                      <img
                                        height="50px"
                                        width="50px"
                                        src={`https://expressworldtrade.onrender.com/${x.proof[0].link}`}
                                        alt=""
                                      />
                                    </a>
                                  </td>
                                  <td>
                                    <small
                                      style={{
                                        padding: "5px 10px",
                                        borderRadius: "3px",
                                        fontSize: "10px",
                                        color: "white",
                                        textTransform: "uppercase",
                                        background:
                                          x.status === "pending"
                                            ? "gold"
                                            : x.status === "confirmed"
                                            ? "green"
                                            : x.status === "processing"
                                            ? "orange"
                                            : "red",
                                      }}
                                    >
                                      {x.status}
                                    </small>
                                  </td>
                                  <td>
                                    <Box sx={{ flexGrow: 1 }}>
                                      <Grid container spacing={2}>
                                        {x.status === "pending" && (
                                          <Grid item xs={6}>
                                            <Button
                                              variant="contained"
                                              color="info"
                                              style={{ fontSize: 10 }}
                                              onClick={() =>
                                                fateOfDeposit("process", x._id)
                                              }
                                            >
                                              Process
                                            </Button>
                                          </Grid>
                                        )}
                                        {x.status === "processing" && (
                                          <Grid item xs={6}>
                                            <Button
                                              variant="contained"
                                              color="success"
                                              style={{ fontSize: 10 }}
                                              onClick={() =>
                                                fateOfDeposit("confirm", x._id)
                                              }
                                            >
                                              Confirm
                                            </Button>
                                          </Grid>
                                        )}
                                        {(x.status === "pending" ||
                                          x.status === "processing") && (
                                          <Grid item xs={6}>
                                            <Button
                                              variant="contained"
                                              color="error"
                                              style={{ fontSize: 10 }}
                                              onClick={() =>
                                                fateOfDeposit("decline", x._id)
                                              }
                                            >
                                              Decline
                                            </Button>
                                          </Grid>
                                        )}
                                      </Grid>
                                    </Box>
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
          </div>
        </>
      )}
    </>
  );
};

export default Deposits;
