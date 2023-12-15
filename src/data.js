/////////////////////////////
///////login admin///////////
/////////////////////////////

export const loginUser = async (user) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const login = await res.json();
  return login;
};

////////////////////////////
///////Get single user///////
////////////////////////////

export const getUser = async (token) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/user",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    }
  );
  const user = await res.json();
  return user;
};

////////////////////////////
///////Get single user///////
////////////////////////////

export const getSingleUser = async (token, id) => {
  const res = await fetch(
    `https://expressworldtrade.onrender.com/api/users/single/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    }
  );
  const user = await res.json();
  return user;
};

////////////////////////////
///////Update single user///////
////////////////////////////

export const updateSingleUser = async (token, userDetails, id) => {
  const res = await fetch(
    `https://expressworldtrade.onrender.com/api/users/update/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(userDetails),
    }
  );
  const user = await res.json();
  return user;
};

////////////////////////////
///////Update single user///////
////////////////////////////

export const deleteSingleUser = async (token, id) => {
  await fetch(`https://expressworldtrade.onrender.com/api/users/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
};

////////////////////////////
///////Get all users///////
////////////////////////////

export const getUsers = async (token) => {
  const res = await fetch("https://expressworldtrade.onrender.com/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
  });
  const users = await res.json();
  return users;
};

//////////////////////////////////////////
/////////get user transaction/////////////
//////////////////////////////////////////

export const getTransaction = async (token) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/transactions",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    }
  );
  const transaction = await res.json();
  return transaction;
};

//////////////////////////////////////////
/////////get user investmnets/////////////
//////////////////////////////////////////

export const getInvestment = async (token) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/investments",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    }
  );
  const investmnets = await res.json();
  return investmnets;
};

//////////////////////////////////////////
/////////get user withdrawal/////////////
//////////////////////////////////////////

export const getWithdrawal = async (token) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/withdrawals",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    }
  );
  const withdrawal = await res.json();
  return withdrawal;
};

//////////////////////////////////////////
/////////get user deposit////////////////
//////////////////////////////////////////

export const getDeposit = async (token) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/deposits",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    }
  );
  const deposit = await res.json();
  return deposit;
};

//////////////////////////////////////////
/////////confirm deposit////////////////
//////////////////////////////////////////

export const confirmDeposit = async (token, id) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/deposit/confirm",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id }),
    }
  );
  const deposit = await res.json();
  return deposit;
};

//////////////////////////////////////////
/////////process deposit////////////////
//////////////////////////////////////////

export const processDeposit = async (token, id) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/deposit/process",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id }),
    }
  );
  const deposit = await res.json();
  return deposit;
};

//////////////////////////////////////////
/////////decline deposit////////////////
//////////////////////////////////////////

export const declineDeposit = async (token, id) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/deposit/decline",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id }),
    }
  );
  const deposit = await res.json();
  return deposit;
};

//////////////////////////////////////////
/////////confirm withdrawal////////////////
//////////////////////////////////////////

export const confirmWithdrawal = async (token, id) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/withdraw/confirm",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id }),
    }
  );
  const withdrawal = await res.json();
  return withdrawal;
};

//////////////////////////////////////////
/////////process withdrawal////////////////
//////////////////////////////////////////

export const processWithdrawal = async (token, id) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/withdraw/process",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id }),
    }
  );
  const withdrawal = await res.json();
  return withdrawal;
};

//////////////////////////////////////////
/////////decline withdrawal////////////////
//////////////////////////////////////////

export const declineWithdrawal = async (token, id) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/withdraw/decline",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ id }),
    }
  );
  const withdrawal = await res.json();
  return withdrawal;
};

//////////////////////////////////////////
/////////fund user////////////////
//////////////////////////////////////////

export const userFund = async (token, details) => {
  const res = await fetch(
    "https://expressworldtrade.onrender.com/api/users/funduser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(details),
    }
  );
  const funduser = await res.json();
  return funduser;
};
