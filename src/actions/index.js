import apiroute from "./../api/apiroute";
//import history from "./../history";

export const getCurrentUser = () => {
  return async dispatch => {
    try {
      //get jwtToken if there is one...
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        //console.log("Please log in to get jwtToken");
        return;
      }
      const response = await apiroute.get("/api/v1/users/me", {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      //console.log(response);
      dispatch({ type: "GET_CURRENT_USER", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
};
