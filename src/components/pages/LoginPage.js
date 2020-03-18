import React from "react";
import { Link } from "react-router-dom";
import apiroute from "./../../api/apiroute";
import Modal from "./../Modal";

class LoginPage extends React.Component {
  state = { email: "", password: "" };

  loginUser = async event => {
    event.preventDefault();
    try {
      const loggedIn = await apiroute.post("api/v1/users/login", {
        email: this.state.email,
        password: this.state.password
      });
      localStorage.setItem("jwtToken", loggedIn.data.token);
      this.props.history.push("/userprofile");
    } catch (err) {
      console.log(err);
      this.setState({ errorLogin: true });
    }
  };

  registerLink = () => {
    return (
      <div>
        If you do not have a sign in credentials, please sign up here:
        <Link to="/signup">Sign Up</Link>
      </div>
    );
  };

  errorLoginMessage() {
    if (this.state.errorLogin) {
      return (
        <div>
          The email or password you entered is not correct. Please try again.
        </div>
      );
    }
  }

  componentDidMount() {
    //console.log(this.props);
  }

  renderContent() {
    return (
      <React.Fragment>
        <form onSubmit={this.loginUser} className="ui form error">
          <div className="field">
            <label>Email</label>
            <input
              className="email"
              type="text"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              className="password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <button className="ui button primary" type="submit">
            Submit
          </button>
          <Link to="/" className="ui red button">
            Cancel
          </Link>
        </form>
        <div>
          If you do not have a sign in credentials, please sign up here:
          <Link to="/signup"> Sign Up</Link>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="LOGIN WITH YOUR EMAIL AND PASSWORD"
        content={this.renderContent()}
        errorMessage={this.errorLoginMessage()}
        onDismiss={() => this.props.history.push("/")}
      />
    );
  }
}

export default LoginPage;
