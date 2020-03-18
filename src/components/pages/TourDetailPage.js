import React from "react";
import apiroute from "../../api/apiroute";
import DetailPageLayout from "./../DetailPageLayout";
import Header from "./../Header";
import Footer from "./../Footer";

class TourDetailPage extends React.Component {
  state = { currentTour: "" };

  getSpecificTour = async () => {
    try {
      const oneTour = await apiroute.get(
        `/api/v1/tours/${this.props.match.params.id}`
      );
      this.setState({ currentTour: oneTour });
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getSpecificTour();
    //console.log(this.props);
  }

  render() {
    if (!this.state.currentTour) {
      return <div>Loading...</div>;
    }
    return (
      <div className="tour-detail-page">
        <Header />
        <DetailPageLayout currentTour={this.state.currentTour} />
        <Footer />
      </div>
    );
  }
}

export default TourDetailPage;
