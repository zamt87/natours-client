import React from "react";
import apiroute from "../../api/apiroute";
import Header from "./../Header";
import Footer from "./../Footer";
import { Link } from "react-router-dom";

class TopFiveCheap extends React.Component {
  state = { topfivecheap: "" };

  topFiveCheap = async () => {
    try {
      const topfivetours = await apiroute.get("/api/v1/tours/top-5-cheap");
      this.setState({ topfivecheap: topfivetours });
    } catch (err) {
      console.log(err);
    }
  };

  topFiveRenderContent() {
    const { doc } = this.state.topfivecheap.data.data;
    const content = doc.map(el => {
      return (
        <div className="column" key={el._id}>
          <div className="ui fluid raised link card">
            <div className="image">
              <img
                src={`https://natours-zam.herokuapp.com/img/tours/${el.imageCover}`}
                alt="pic-of-tour"
              />
            </div>
            <div className="content">
              <h2>{el.name}</h2>
              <p className="header">Ratings: {el.ratingsAverage}/5</p>
              <p className="header">
                Difficulty: {el.difficulty.toUpperCase()}
              </p>
              <p className="header">Price: {el.price} USD</p>
              <p className="description">{el.summary}</p>
              <span className="right floated">
                <Link
                  to={`/tourdetails/${el.id}`}
                  className="ui inverted green button"
                >
                  Details
                </Link>
              </span>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="ui container">
        <div className="ui three column grid">{content}</div>
      </div>
    );
  }

  componentDidMount() {
    this.topFiveCheap();
  }

  render() {
    if (this.state.topfivecheap === "") {
      return <div>Loading...</div>;
    }

    return (
      <div className="top-five-cheap">
        <Header />
        {this.topFiveRenderContent()}
        <Footer />
      </div>
    );
  }
}

export default TopFiveCheap;
