import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const Authmiddleware = (props) => {
  // if (!localStorage.getItem("authUser")) {
  //   return <Navigate to={{ pathname: "/login" }} />;
  // }
  return <React.Fragment>{props.children}</React.Fragment>;
};

Authmiddleware.propTypes = {
  children: PropTypes.any,
};

export default Authmiddleware;
