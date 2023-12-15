import { useEffect, useState } from "react";
import "./index.css";
import Home from "./components/Home";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Users from "./components/Users";
import User from "./components/User";
import Investments from "./components/Investments";
import Deposits from "./components/Deposits";
import Withdrawal from "./components/Withdrawal";
import Transactions from "./components/Transactions";
import Notfound from "./components/Notfound";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import UsersComponent from "./context/UsersContext";
import UserComponent from "./context/UserContext";
import ToastifyComponent from "./context/ToastifyContext";
import Toastify from "./components/Toastify";
import TransactionComponent from "./context/TransactionContext";

function App() {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 3000);
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <UserComponent>
      <TransactionComponent>
        <UsersComponent>
          <ToastifyComponent>
            <Toastify />
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={<Home />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/users/user/:id" element={<User />} />
                  <Route path="/Investments" element={<Investments />} />
                  <Route path="/deposits" element={<Deposits />} />
                  <Route path="/withdrawals" element={<Withdrawal />} />
                  <Route path="/Transactions" element={<Transactions />} />
                  <Route path="/*" element={<Notfound />} />
                </Routes>
              </div>
            </Router>
          </ToastifyComponent>
        </UsersComponent>
      </TransactionComponent>
    </UserComponent>
  );
}

export default App;
