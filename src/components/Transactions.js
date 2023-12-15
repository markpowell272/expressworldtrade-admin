import React, { useEffect } from "react";
import "../css/Home.css";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";
// import loaderimg from "../assets/icons8-combo-chart.gif";
// import { UserContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const { transaction } = React.useContext(TransactionContext);

  const [transactionState, setTransactionState] = transaction;

  // const [userState, setUserState] = React.useContext(UserContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!userState.username) {
  //     return navigate("/");
  //   }
  // });

  return (
    <>
      {!transactionState ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>ET-Options | Transaction History</title>
          </Helmet>
          <Navbar />
          <div className="home-container">
            <div className="body">
              <div className="content">
                <div className="account-stats scroll-x">
                  <br />
                  <h3>TRANSACTION HISTORY</h3>
                  <div className="card-show ref-user">
                    <br />
                    {transactionState.length > 0 ? (
                      <table cellPadding={10} style={{ width: "1500px" }}>
                        <thead>
                          <td>#&nbsp;S/N</td>
                          <td>&nbsp;Date</td>
                          <td>&nbsp;Transaction ID</td>
                          <td>&nbsp;Transaction Type</td>
                          <td>&nbsp;Status</td>
                        </thead>
                        {transactionState
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
                                  <td>{x._id}</td>
                                  <td>{x.type}</td>
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

export default Transactions;
