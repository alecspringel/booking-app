=============== Todo ===============

- Add validation to schedule endpoint (no end dates before start dates, etc.)
- Add interval setting, and timezone setting (in schedule setupPage, and createSchedule endpoint)
  \*left off:
  -api/user/schedule trying to send get request with local timezone of current day, and return scheduled appointments
  -helper/schedule.js (checkAvailability) can improve efficiency by leveraging sorted order of meetings/schedule
