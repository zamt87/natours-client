import React from "react";
import { Link } from "react-router-dom";

const TourCard = props => {
  //console.log(props);
  return (
    <div className="card">
      <div className="image">
        <img
          src={`https://natours-zam.herokuapp.com/img/tours/${props.tourinfo.imageCover}`}
          alt="pic-of-tour"
        />
      </div>
      <div className="content">
        <div className="header">{props.tourinfo.name}</div>
        <div className="meta">
          Start Location: {props.tourinfo.startLocation.description}
        </div>
        <div className="description">{props.tourinfo.summary}</div>
      </div>
      <div className="extra content">
        <span className="right floated">
          <Link
            to={`/tourdetails/${props.tourinfo.id}`}
            className="ui inverted green button"
          >
            Details
          </Link>
        </span>
        <span>
          <h3>Ratings Average: {props.tourinfo.ratingsAverage}/5</h3>
        </span>
        <span>
          <h2>Price: {props.tourinfo.price} USD</h2>
        </span>
      </div>
    </div>
  );
};

export default TourCard;
