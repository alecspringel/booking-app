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

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    // Styled Components Theme
    const theme = {
      primary: "#4F5DDA",
    };

    return (
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <MenuBar>
            <div className="content">
              <div>
                <Navigation>
                  <ul>
                    <NavItem>
                      <NavLink exact to="/dashboard">
                        Appointments
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/dashboard/availability">
                        Availability
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/dashboard/profile">Profile</NavLink>
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
                path="/dashboard/availability"
                component={AvailabilityMenu}
              />
              <Route path="/dashboard/profile" component={Profile} />
              <Route path="/dashboard/newSchedule" component={NewSchedule} />
            </Switch>
          </div>
        </ThemeProvider>
      </HashRouter>
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
  margin-left: 20px;
`;

const NavItem = styled.li`
  display: inline-block;
  margin-right: 30px;
  font-size: 20px;
`;
