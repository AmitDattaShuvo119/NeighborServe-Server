import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./NordDatePicker.css";

const Testing4 = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const CustomDatePickerInput = ({ onClick }) => (
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={onClick}>
      <img src="./calendar.svg" alt="" />
      &nbsp; {selectedDate ? selectedDate.toLocaleDateString() : "Choose a date"}
    </div>
  );

  const filterPastDates = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to midnight

    return date >= currentDate;
  };

  return (
    <div>
      <div
        style={{
          width: "800px",
          height: "500px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <br />
        <br />
        <br />
        <h1>Calendar</h1>
        <br />
        <br />
        <br />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          placeholderText="Choose a date"
          customInput={<CustomDatePickerInput />}
          showPopperArrow={false}
          popperPlacement="bottom-start"
          popperModifiers={{
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: 'viewport',
            },
          }}
          filterDate={filterPastDates}
        />
      </div>
    </div>
  );
};

export default Testing4;
