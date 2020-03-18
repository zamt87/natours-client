import React from "react";
import Modal from "./../Modal";
import { Link } from "react-router-dom";
import apiroute from "../../api/apiroute";

class SignUpPage extends React.Component {
  state = { name: "", email: "", password: "", passwordConfirm: "" };

  signUpUser = async event => {
    event.preventDefault();

    try {
      const newuser = await apiroute.post("/api/v1/users/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm
      });

      localStorage.setItem("jwtToken", newuser.data.token);
      this.props.history.push("/userprofile");
    } catch (err) {
      console.log(err);
    }
  };

  errorSignUpMessage() {
    if (this.state.errorSignUp) {
      return <div>{this.state.err.response.data.message}</div>;
    }
  }

  componentDidMount() {
    //console.log(this.props);
  }

  renderContent() {
    return (
      <React.Fragment>
        <form onSubmit={this.signUpUser} className="ui form error">
          <div className="field">
            <label>Name</label>
            <input
              className="name"
              type="text"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
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
          <div className="field">
            <label>Re-type Password</label>
            <input
              className="confirm-password"
              type="password"
              value={this.state.passwordConfirm}
              onChange={e => this.setState({ passwordConfirm: e.target.value })}
            />
          </div>
          <button className="ui button primary" type="submit">
            Submit
          </button>
          <Link to="/" className="ui red button">
            Cancel
          </Link>
        </form>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        title="PLEASE FILL IN YOUR INFORMATION BELOW TO SIGN UP"
        content={this.renderContent()}
        errorMessage={this.errorSignUpMessage()}
        onDismiss={() => this.props.history.push("/")}
      />
    );
  }
}

export default SignUpPage;
