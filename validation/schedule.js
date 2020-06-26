const Validator = require("validator");
const isEmpty = require("is-empty");

function validateNewSchedule(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";

  if (data.interval === NaN) {
    errors.interval = "Interval is not a number";
  }
  if (data.interval < 0 || data.interval >= 1440) {
    errors.interval =
      "Interval must be greater than 0 and less than or equal to 1440";
  }

  // Email checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  } else if (!Validator.isAscii(data.title)) {
    errors.email = "Title contains invalid characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = { validateNewSchedule };
