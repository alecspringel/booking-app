=============== Todo ===============

- Add validation to schedule endpoint (no end dates before start dates, etc.)
- Add interval setting, and timezone setting (in schedule setupPage, and createSchedule endpoint)
  \*left off:
 -/api/user/schedule trying to find effective way to query schedule with timezones
 -testing book.js right now.
 -overall idea is to send a start and end time and adjust the timezone accordingly
  -> one idea could be to create a date with Date.UTC() and also send the timezone shift in the api endpoint. this would allow users to request a timezone, along with the first of the month, and get back accurate start/end times. In this case, the schedules would need to be shifted 