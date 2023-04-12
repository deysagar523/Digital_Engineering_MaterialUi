//rafc
import React from "react";

const Home = (props) => {
  // console.log(props.isLoggedIn);
  // console.log(props);
  let userName = "";
  if (props.isLoggedIn) {
    userName = JSON.parse(sessionStorage.getItem("userName"));
  }
  console.log(userName);
  return (
    <div>
      <h1 style={{ display: "inline", marginRight: "1rem" }}>Welcome</h1>
      {props.isLoggedIn ? (
        <h1 style={{ display: "inline" }}>{userName}</h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
