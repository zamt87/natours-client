import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TourDetailPage from "./pages/TourDetailPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TopFiveCheap from "./pages/TopFiveCheap";
import DeleteBooking from "./DeleteBooking";
import SubmitPage from "./SubmitPage";
import history from "./../history";
import UserProfile from "./pages/UserProfile";
import AuthComponent from "./AuthComponent";
import CreateBooking from "./CreateBooking";

const App = () => {
  return (
    <div className="main-page">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/tourdetails/:id" component={TourDetailPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/topfivecheap" component={TopFiveCheap} />
          <AuthComponent>
            <Route path="/userprofile" component={UserProfile} />
            <Route path="/submitpage" component={SubmitPage} />
            <Route path="/deletebooking/:id" component={DeleteBooking} />
            <Route
              path="/createbooking/:id/:name/:price"
              component={CreateBooking}
            />
          </AuthComponent>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
