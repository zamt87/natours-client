import React from "react";
import TourCard from "./TourCard";

const TourList = props => {
  if (!props.tourlist.data.data) {
    return <div className="tour-list">Loading...</div>;
  }

  const tours = props.tourlist.data.data.data.doc.map(onetour => {
    return <TourCard tourinfo={onetour} key={onetour._id} />;
  });

  return <div className="ui three stackable link cards">{tours}</div>;
};

export default TourList;
