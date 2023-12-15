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
  confirmWithdrawal,
  processWithdrawal,
  declineWithdrawal,
  getWithdrawal,
} from "../data";

const Withdrawal = () => {
  const { withdrawal } = React.useContext(TransactionContext);

  const [withdrawalState, setWithdrawalState] = withdrawal;

  const [ToastifyState, setToastifyState] = React.useContext(ToastifyContext);
  const [UserState, setUserState] = React.useContext(UserContext);

  const fateOfWithdrawal = async (fate, id) => {
    // setToastifyState({
    //   ...ToastifyState,
    //   message: "Loading",
    //   variant: "info",
    //   open: true,
    // });

    if (fate === "process") {
      let process = await processWithdrawal(UserState.token, id);
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
      let confirm = await confirmWithdrawal(UserState.token, id);
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
      let decline = await declineWithdrawal(UserState.token, id);
      if (decline) {
        setToastifyState({
          ...ToastifyState,
          message: decline.message,
          variant: "success",
          open: true,
        });
      }
    }

    let withdrawal = await getWithdrawal(UserState.token);
    setWithdrawalState(withdrawal);
  };

  return (
    <>
      {!withdrawalState ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>ET-Options | Withdrawal History</title>
          </Helmet>
          <Navbar />
          <div className="home-container">
            {/* <Background text="withdrawal HISTORY" /> */}
            <div className="body">
              <div className="content">
                <div className="account-stats scroll-x">
                  <br />
                  <h3>WITHDRAWAL HISTORY</h3>
                  <div className="card-show ref-user">
                    <br />
                    {withdrawalState.length > 0 ? (
                      <table cellPadding={10} style={{ width: "1500px" }}>
                        <thead>
                          <td>#&nbsp;S/N</td>
                          <td>&nbsp;Date</td>
                          <td className="td">&nbsp;Email</td>
                          <td className="td">&nbsp;Withdrawal ID</td>
                          <td>&nbsp;Withdrawal Method</td>
                          <td>&nbsp;Withdrawal Amount</td>
                          <td>&nbsp;Account Details</td>
                          <td>&nbsp;Status</td>
                          <td className="td">&nbsp;Action</td>
                        </thead>
                        {withdrawalState
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
                                  <td>{x.accountDetails}</td>
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
                                                fateOfWithdrawal(
                                                  "process",
                                                  x._id
                                                )
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
                                                fateOfWithdrawal(
                                                  "confirm",
                                                  x._id
                                                )
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
                                                fateOfWithdrawal(
                                                  "decline",
                                                  x._id
                                                )
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

export default Withdrawal;
