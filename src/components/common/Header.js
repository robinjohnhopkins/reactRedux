import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Header = ({courses}) => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
      {" | "}
      <NavLink to="/todo" activeStyle={activeStyle}>
        Todo
        </NavLink>
      {" | "}
      <NavLink to="/slides" activeStyle={activeStyle}>
        Slides
      </NavLink>
      {" | "}
      <NavLink to="/checkboxtree" activeStyle={activeStyle}>
        CheckboxTree
      </NavLink>
      {" | "}
      <>Number Courses {courses.length}</>
    </nav>
  );
};
Header.propTypes = {
  courses: PropTypes.array.isRequired
};
function mapStateToProps(state) {
  const courses = state.courses.length > 0
    ? state.courses
    : [];
  return {courses};
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

