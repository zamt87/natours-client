import React from "react";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";

class DetailPageLayout extends React.Component {
  RenderTourGuides() {
    const { guides } = this.props.currentTour.data.data.doc;
    const tourguides = guides.map(el => {
      return (
        <div className="item" key={el._id}>
          <img
            className="ui avatar image"
            src={`https://natours-zam.herokuapp.com/img/users/${el.photo}`}
            alt="avatar-pic"
          />
          <div className="content">
            <div className="header">Name: {el.name}</div>
            <div className="description">Role: {el.role}</div>
          </div>
        </div>
      );
    });
    return tourguides;
  }

  PageLayout() {
    const {
      name,
      summary,
      images,
      price,
      ratingsAverage,
      duration,
      difficulty,
      maxGroupSize,
      description,
      id
    } = this.props.currentTour.data.data.doc;

    return (
      <div className="detail-page" style={{ marginBottom: "4em" }}>
        <div
          className="ui inverted vertical masthead center aligned segment"
          style={{
            backgroundImage:
              "url(" +
              `https://natours-zam.herokuapp.com/img/tours/${images[2]}` +
              ")",
            backgroundSize: "cover",
            padding: "12em"
          }}
        >
          <div className="ui text container">
            <h1 style={{ fontSize: "2em" }}>{name}</h1>
            <h1 style={{ fontSize: "1.5em" }}>{summary}</h1>
            <Link
              to={`/createbooking/${id}/${name}/${price}`}
              className="ui huge primary button"
            >
              Book This Tour
            </Link>
          </div>
        </div>
        <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide center aligned column">
                <h2>Quick Facts</h2>
                <h2>Price: {price} USD</h2>
                <h3>Average Rating: {ratingsAverage}</h3>
                <h3>Difficulty: {difficulty.toUpperCase()}</h3>
                <h3>Duration: {duration} Days</h3>
                <h3>Max Group Size: {maxGroupSize} People</h3>
                <h2>Tour Guides:</h2>
                <div className="ui relaxed list">{this.RenderTourGuides()}</div>
              </div>
              <div className="six wide center aligned column">
                <img
                  src={`https://natours-zam.herokuapp.com/img/tours/${images[0]}`}
                  className="ui large bordered rounded image"
                  alt="tour"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="ui vertical stripe segment"
          style={{ marginBottom: "2em" }}
        >
          <div className="ui text container">
            <h3 className="ui header">Detailed Tour Description</h3>
            <p>{description}</p>
            <h4 className="ui horizontal header divider">
              <Link
                to={`/createbooking/${id}/${name}/${price}`}
                className="ui huge primary button"
              >
                Book This Tour
              </Link>
            </h4>
          </div>
        </div>
        <Reviews currentTour={id} />
      </div>
    );
  }

  componentDidMount() {
    //console.log(this.props);
  }

  render() {
    return <React.Fragment>{this.PageLayout()}</React.Fragment>;
  }
}

export default DetailPageLayout;
