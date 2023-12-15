import React, { useEffect } from "react";
import "../css/Home.css";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";
// import loaderimg from "../assets/icons8-combo-chart.gif";
// import { UserContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

const Investments = () => {
  const { investment } = React.useContext(TransactionContext);

  const [investmentState, setInvestmentState] = investment;

  // const [userState, setUserState] = React.useContext(UserContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!userState.username) {
  //     return navigate("/");
  //   }
  // });
  return (
    <>
      {!investmentState ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>ET-Options | Investment History</title>
          </Helmet>
          <Navbar />
          <div className="home-container">
            <div className="body">
              <div className="content">
                <div className="account-stats scroll-x">
                  <br />
                  <h3>INVESTMENT HISTORY</h3>
                  <div className="card-show ref-user">
                    <br />
                    {investmentState.length > 0 ? (
                      <table cellPadding={10} style={{ width: "1500px" }}>
                        <thead>
                          <td>#&nbsp;S/N</td>
                          <td>&nbsp;Date</td>
                          <td>&nbsp;Investment ID</td>
                          <td>&nbsp;Investment Plan</td>
                          <td>&nbsp;Amount Invested</td>
                          <td>&nbsp;Required Profit</td>
                          <td>&nbsp;Status</td>
                        </thead>
                        {investmentState
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
                                  <td>{x.plan}</td>
                                  <td>{x.amount}</td>
                                  <td>
                                    {x.plan === "Mini Plan" &&
                                      `$ ${Math.floor((25 * x.amount) / 100)}`}
                                    {x.plan === "Silver Plan" &&
                                      `$ ${Math.floor((35 * x.amount) / 100)}`}
                                    {x.plan === "Gold Plan" &&
                                      `$ ${Math.floor((45 * x.amount) / 100)}`}
                                    {x.plan === "Platinum Plan" &&
                                      `$ ${Math.floor((55 * x.amount) / 100)}`}
                                  </td>
                                  <td>
                                    <small
                                      style={{
                                        padding: "5px 10px",
                                        borderRadius: "3px",
                                        fontSize: "10px",
                                        color: "white",
                                        textTransform: "uppercase",
                                        background: "green",
                                      }}
                                    >
                                      {x.status === "pending" && "invested"}
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

export default Investments;
