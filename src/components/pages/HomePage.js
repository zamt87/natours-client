import React from "react";
import apiroute from "../../api/apiroute";
import TourList from "./../TourList";
import Header from "./../Header";
import Footer from "./../Footer";

import { connect } from "react-redux";
import { getCurrentUser } from "./../../actions";

class HomePage extends React.Component {
  state = { data: "" };

  getInitialTours = async event => {
    try {
      const allTours = await apiroute.get("/api/v1/tours");
      this.setState({ data: allTours });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getInitialTours();
    this.props.getCurrentUser();
  }

  render() {
    if (this.state.data === "") {
      return <div>Loading...</div>;
    }

    return (
      <div className="home-page">
        <Header />
        <div className="ui container" style={{ marginBottom: "2em" }}>
          <h2 style={{ marginTop: "1em" }}>Welcome to Natours Tours!</h2>
          <TourList tourlist={this.state} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return state;
};

export default connect(mapStateToProps, { getCurrentUser: getCurrentUser })(
  HomePage
);
