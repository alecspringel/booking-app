import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Header from "./parts/Header";
import MeetingList from "./MeetingList";
import EventForm from "./EventForm";
import SetupPage from "./SetupPage";
import ScheduleMaker from "./ScheduleMaker";
import {
  BrowserRouter as HashRouter,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Profile from "./profile/Profile";
import AvailabilityMenu from "./availability/AvailabilityMenu";
import NewSchedule from "./newSchedule/NewSchedule";
import EditSchedule from "./editSchedule/EditSchedule";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "appointments",
    };

    this.setActiveMenu = this.setActiveMenu.bind(this);
  }

  setActiveMenu(e) {
    this.setState({
      active: e.target.name,
    });
  }

  render() {
    const { user } = this.props.auth;
    // Styled Components Theme
    const theme = {
      primary: "#4F5DDA",
      border: "4px",
    };

    return (
      <ThemeProvider theme={theme}>
        <Header />
        <MenuBar>
          <div className="content">
            <div>
              <Navigation>
                <ul>
                  <NavItem active={this.state.active === "appointments"}>
                    <NavLink
                      exact
                      to="/dashboard"
                      name="appointments"
                      onClick={this.setActiveMenu}
                    >
                      Appointments
                    </NavLink>
                  </NavItem>
                  <NavItem active={this.state.active === "schedules"}>
                    <NavLink
                      to="/dashboard/schedule"
                      name="schedules"
                      onClick={this.setActiveMenu}
                    >
                      Schedules
                    </NavLink>
                  </NavItem>
                  <NavItem active={this.state.active === "profile"}>
                    <NavLink
                      to="/dashboard/profile"
                      name="profile"
                      onClick={this.setActiveMenu}
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                </ul>
              </Navigation>
            </div>
          </div>
        </MenuBar>
        <div className="content">
          <Switch>
            <Route exact path="/dashboard" component={Header} />
            <Route
              exact
              path="/dashboard/schedule"
              component={AvailabilityMenu}
            />
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route
              exact
              path="/dashboard/schedule/create"
              component={NewSchedule}
            />
            <Route
              exact
              path="/dashboard/schedule/edit/:title"
              component={EditSchedule}
            />
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);

const MenuBar = styled.div`
  background: white;
  width: 100%;
  height: 52px;
  box-shadow: 3px 3px #00000016;
  line-height: 52px;
`;

const Navigation = styled.nav`
  display: inline-block;
  text-align: left;
`;

const NavItem = styled.li`
  display: inline-block;
  margin-right: 30px;
  font-size: 18px;
  border-bottom: ${(props) =>
    props.active
      ? "3px solid " + props.theme.primary
      : "3px solid transparent"};
`;
