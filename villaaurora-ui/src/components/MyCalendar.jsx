import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { showAllTransactions } from "../api/transaction";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

export default function MyCalendar() {
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        showAllTransactions().then((res) => {
            if (res?.ok) {
                const mapevents = res.data.map((transaction) => {
                    return {
                        id: transaction.id,
                        title: `Transaction ID: ${transaction.id}`,
                        start: new Date(transaction.rent_start),
                        end: new Date(transaction.rent_end),
                        user_id: transaction.user_id,
                        tooltip: `Room ID: ${transaction.room_id}\nRent Start: ${transaction.rent_start}\nRent End: ${transaction.rent_end}`
                    };
                });
                setEvents(mapevents);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    }, []);

    return (
        <Box>
            <Calendar
                localizer={localizer}
                events={events}
                style={{height:'100vh'}}
                tooltipAccessor={(e) => e.tooltip}
            />
        </Box>
    );
}