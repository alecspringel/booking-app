import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      first: "",
      last: "",
      email: "",
      password: "",
      password2: "",
      link: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      link: this.state.link,
    };
    this.props.registerUser(newUser, this.props.history);
  };
  
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div>
          <div>
            <Link to="/">
              Home
            </Link>
            <div>
              <h4>
                Register
              </h4>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.first}
                  error={errors.first}
                  id="first"
                  type="text"
                  className={classnames("", {
                    invalid: errors.first,
                  })}
                />
                <label>First Name</label>
                <span>{errors.last}</span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.last}
                  error={errors.last}
                  id="last"
                  type="text"
                  className={classnames("", {
                    invalid: errors.last,
                  })}
                />
                <label>Last Name</label>
                <span>{errors.last}</span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
                <label>Email</label>
                <span>{errors.email}</span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
                <label>Password</label>
                <span>{errors.password}</span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
                <label>Confirm Password</label>
                <span>{errors.password2}</span>
              </div>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.link}
                  error={errors.link}
                  id="link"
                  type="text"
                  className={classnames("", {
                    invalid: errors.link,
                  })}
                />
                <label>Link</label>
                <span>{errors.link}</span>
              </div>
              <div>
                <button
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
