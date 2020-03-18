import React from "react";
import Modal from "./Modal";
import apiroute from "./../api/apiroute";
import getJWT from "./authHelper";
import { Link } from "react-router-dom";

class DeleteBooking extends React.Component {
  deleteTour = async () => {
    const jwtToken = getJWT();
    try {
      await apiroute.delete(`/api/v1/bookings/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      //console.log(deleted);
      this.props.history.push("/userprofile");
    } catch (err) {
      console.log(err);
    }
  };

  renderContent() {
    return (
      <div className="ui container">
        <h3>Are you sure you want to cancel this booking?</h3>
        <button onClick={this.deleteTour} className="ui primary button">
          Cancel Booking
        </button>
        <Link to="/userprofile" className="ui red button">
          Don't Cancel
        </Link>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ currentTour: this.props.match.params.id });
    //console.log(this.props);
  }

  render() {
    return (
      <Modal
        title={"CANCEL BOOKING?"}
        content={this.renderContent()}
        onDismiss={() => this.props.history.push("/userprofile")}
        errorMessage=""
      />
    );
  }
}

export default DeleteBooking;
