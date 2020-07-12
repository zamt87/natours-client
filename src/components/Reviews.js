import React from "react";
import apiroute from "./../api/apiroute";

import { connect } from "react-redux";
import { getCurrentUser } from "./../actions";

class Reviews extends React.Component {
  state = { textReview: "", tourRating: "", updateReview: "" };

  getThisTourReview = async () => {
    try {
      const response = await apiroute.get("/api/v1/reviews", {
        params: { tour: this.props.currentTour },
      });
      //console.log(response);
      this.setState({ tourReviews: response });
    } catch (err) {
      console.log(err);
    }
  };

  renderReviews() {
    if (!this.state.tourReviews) {
      return <div>Loading...</div>;
    }

    const reviews = this.state.tourReviews.data.data.doc.map((el) => {
      return (
        <div className="comment" key={el._id}>
          <span className="avatar">
            <img
              src={`https://natours-zam.herokuapp.com/img/users/${el.user.photo}`}
              alt={`${el.user.photo}`}
            />
          </span>
          <div className="content">
            <span className="author">{el.user.name}</span>
            <div className="text">
              <p className="ui headline">Rating: {el.rating}</p>
              <p>{el.review}</p>
            </div>
          </div>
        </div>
      );
    });

    return <React.Fragment>{reviews}</React.Fragment>;
  }

  addReview = async (event) => {
    event.preventDefault();
    if (!this.state.jwtToken) {
      alert("You must be logged in order to submit a revew.");
    }

    try {
      await apiroute("/api/v1/reviews", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.state.jwtToken}`,
        },
        data: {
          review: this.state.textReview,
          rating: this.state.tourRating,
          user: this.props.currentUserRedux.data.doc._id,
          tour: this.props.currentTour,
        },
      });
      window.location.reload(true);
    } catch (err) {
      //console.log(err);
      return;
    }
  };

  componentDidMount() {
    const jwtToken = localStorage.getItem("jwtToken");
    this.setState({ jwtToken: jwtToken });
    this.props.getCurrentUser();
    this.getThisTourReview();
    //console.log(this.props);
  }

  render() {
    return (
      <div className="ui container center aligned" style={{ marginTop: "2em" }}>
        <h2>Reviews</h2>
        <div
          className="ui two column centered grid"
          style={{ textAlign: "left" }}
        >
          <div className="ui comments">
            {this.renderReviews()}
            <form onSubmit={this.addReview} className="ui reply form">
              <label>
                Rating <br></br>
              </label>
              <div className="ui input">
                <input
                  type="text"
                  placeholder="Rate from 1 to 5..."
                  onChange={(e) =>
                    this.setState({ tourRating: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Review</label>
                <textarea
                  value={this.state.textReview}
                  onChange={(e) =>
                    this.setState({ textReview: e.target.value })
                  }
                ></textarea>
              </div>
              <button className="ui primary submit button">Add Review</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return state;
};

export default connect(mapStateToProps, { getCurrentUser })(Reviews);
