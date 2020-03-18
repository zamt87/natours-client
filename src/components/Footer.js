import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="ui inverted vertical footer segment"
      style={{ marginTop: "2em" }}
    >
      <div className="ui container">
        <div className="ui stackable inverted divided equal height stackable grid">
          <div className="three wide column">
            <Link to="/userprofile" className="item">
              <h4 className="ui inverted header">Your Account</h4>
            </Link>
            <Link to="/signup" className="item">
              <h4 className="ui inverted header">Sign Up</h4>
            </Link>
            <Link to="/" className="item">
              <h4 className="ui inverted header">All Tours</h4>
            </Link>
            <Link to="/topfivecheap" className="item">
              <h4 className="ui inverted header">Top Five Cheapest Tours</h4>
            </Link>
          </div>
          <div className="three wide column"></div>
          <div className="seven wide column">
            <h4 className="ui inverted header">About</h4>
            <p>
              This Natours client site, as well as the API used to build it, was
              implemented by Zam Tual using modern web technologies like React,
              Redux, Express, and Semantic UI framework. The API for this site
              was architected by Jonas Schmedtmann.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
