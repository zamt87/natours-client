import React from "react";
import getJWT from "./authHelper";
import apiroute from "./../api/apiroute";
import history from "./../history";

class AuthComponent extends React.Component {
  state = { user: "" };

  getUserInfo = async () => {
    const jwt = getJWT();

    if (!jwt) {
      alert("You must be logged in to do this task!");
      history.push("/login");
    }

    try {
      const user = await apiroute.get("/api/v1/users/me", {
        headers: { Authorization: `Bearer ${jwt}` }
      });

      this.setState({ user: user });
      //console.log(this.state);
    } catch (err) {
      localStorage.removeItem("jwtToken");
      console.log(err);
      history.push("/login");
    }
  };

  componentDidMount() {
    //console.log(this.props);
    this.getUserInfo();
  }

  render() {
    if (this.state.user === "") {
      return <div>Loading...</div>;
    }

    return <div>{this.props.children}</div>;
  }
}

export default AuthComponent;
