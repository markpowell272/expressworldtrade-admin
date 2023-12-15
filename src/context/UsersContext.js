import React, { useEffect } from "react";
import { getUsers } from "../data";
import { UserContext } from "./UserContext";

export const UsersContext = React.createContext();

const UsersComponent = ({ children }) => {
  const [usersState, setUsersState] = React.useState(null);
  const [UserState, setUserState] = React.useContext(UserContext);

  const getAllUsers = async () => {
    if (usersState) return;

    let users = await getUsers(UserState.token);

    if (users.error) {
      return console.log(users.message);
    }

    setUsersState(users);
  };

  useEffect(() => {
    if (!UserState.token) return false;
    getAllUsers();
  }, [UserState]);

  return (
    <UsersContext.Provider
      value={{
        users: [usersState, setUsersState],
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersComponent;
