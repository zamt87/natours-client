import React from "react";
import Modal from "./Modal";
import apiroute from "./../api/apiroute";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getCurrentUser } from "./../actions";

class CreateBooking extends React.Component {
  state = {};

  bookThisTour = async () => {
    if (!this.props.currentUserRedux) {
      alert("You are not logged in yet!");
    }

    try {
      if (!this.state.jwtToken) {
        alert("Please login to book a tour.");
        return;
      }
      const curBook = await apiroute("/api/v1/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.state.jwtToken}`
        },
        data: {
          tour: this.props.match.params.id,
          user: this.props.currentUserRedux.data.doc._id,
          price: this.props.match.params.price
        }
      });
      console.log(curBook);
      this.props.history.push("/userprofile");
    } catch (err) {
      console.log(err);
    }
  };

  renderContent = () => {
    return (
      <div className="header">
        <h2>Tour: {this.props.match.params.name}</h2>
        <h4>
          You will be redirected to your account page should you decide to book
          this tour. Your account will show the tour you have just booked.
        </h4>
        <button
          onClick={this.bookThisTour}
          className="ui primary primary button"
        >
          Book Tour
        </button>
        <Link
          to={`/tourdetails/${this.props.match.params.id}`}
          className="ui red button"
        >
          Cancel
        </Link>
      </div>
    );
  };

  componentDidMount() {
    if (!this.props.currenUserRedux) {
      this.props.getCurrentUser();
    }
    const jwtToken = localStorage.getItem("jwtToken");
    this.setState({ jwtToken: jwtToken });
  }

  render() {
    return (
      <Modal
        title={"ARE YOU SURE YOU WANT TO BOOK THIS TOUR?"}
        content={this.renderContent()}
        onDismiss={() =>
          this.props.history.push(`/tourdetails/${this.props.match.params.id}`)
        }
        errorMessage=""
      />
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return state;
};

export default connect(mapStateToProps, { getCurrentUser })(CreateBooking);
