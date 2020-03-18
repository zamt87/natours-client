import React from "react";
import Header from "./../Header";
import Footer from "./../Footer";
import apiroute from "./../../api/apiroute";
import getJWT from "./../authHelper";
import { Link } from "react-router-dom";

class UserProfile extends React.Component {
  state = { currentUser: "" };

  getCurrentUser = async () => {
    const jwt = getJWT();
    this.setState({ jwtToken: jwt });
    try {
      const curUser = await apiroute.get("/api/v1/users/me", {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      this.setState({ currentUser: curUser });
      //console.log(this.state.currentUser);
      this.getUserBookedTours();
    } catch (err) {
      console.log(err);
    }
  };

  getUserBookedTours = async () => {
    if (!this.state.currentUser) {
      console.log("currentUser is loading...");
      return;
    }

    try {
      const userBookedTours = await apiroute.get("/api/v1/bookings", {
        headers: { Authorization: `Bearer ${this.state.jwtToken}` },
        params: { user: this.state.currentUser.data.data.doc._id }
      });
      this.setState({ userBookedTours: userBookedTours });
      //console.log(this.state);
    } catch (err) {
      console.log(err);
    }
  };

  renderBookedTours = () => {
    if (!this.state.userBookedTours) {
      return <div>Loading...</div>;
    }
    const bookedTours = this.state.userBookedTours.data.data.doc.map(el => {
      return (
        <React.Fragment key={el._id}>
          <div className="item" key={el._id}>
            <div className="right floated content">
              <Link
                to={`/deletebooking/${el._id}`}
                className="ui primary button"
              >
                Cancel
              </Link>
            </div>
            <div className="content">
              <div className="header">
                <h4>Tour Name: {el.tour.name}</h4>
              </div>
              <div>Booked On: {el.createdAt}</div>
            </div>
          </div>
        </React.Fragment>
      );
    });
    return bookedTours;
  };

  componentDidMount() {
    this.getCurrentUser();
    //console.log(this.props);
  }

  render() {
    if (this.state.currentUser === "") {
      return <div className="ui container">Loading...</div>;
    }

    return (
      <div className="protected-page">
        <Header />
        <div
          className="ui container userprofile"
          style={{ paddingBottom: "8em" }}
        >
          <div className="ui two column centered grid">
            <div className="two column centered row">
              <div className="column">
                <h1>Your Profile</h1>
                <div className="ui card">
                  <div className="ui image">
                    <img
                      src={`https://natours-zam.herokuapp.com/img/users/${this.state.currentUser.data.data.doc.photo}`}
                      className="visible content"
                      alt="profile"
                    />
                  </div>
                  <div className="content">
                    <span className="header">
                      {this.state.currentUser.data.data.doc.name}
                    </span>
                    <div className="meta">
                      <span className="date">
                        {this.state.currentUser.data.data.doc.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <h1>Your Tours</h1>
                <div className="ui middle aligned divided list">
                  {this.renderBookedTours()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserProfile;
