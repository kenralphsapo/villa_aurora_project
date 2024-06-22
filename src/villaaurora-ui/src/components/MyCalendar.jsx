import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

export default function MyCalendar() {
    const localizer = momentLocalizer(moment);

    const events = [
        {
            id: 1,
            title: "Event 1",
            start: new Date(2024, 5, 18, 10, 0),
            end: new Date(2024, 5, 18, 12, 0),
        },
        {
            id: 2,
            title: "Event 2",
            start: new Date(2024, 5, 19, 12, 0),
            end: new Date(2024, 5, 19, 14, 0),
        },
    ];

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "500px", width: "500px" }} // Adjust height and width as needed
            />
        </div>
    );
}
