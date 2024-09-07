import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { showAllTransactions } from "../api/transaction";
import { toast } from "react-toastify";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { useCookies } from "react-cookie";

export default function MyCalendar() {
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const [cookies] = useCookies(["AUTH_TOKEN"]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (cookies.AUTH_TOKEN) {
            showAllTransactions(cookies.AUTH_TOKEN).then((res) => {
                if (res?.ok) {
                    const mapevents = res.data.map((transaction) => {
                        return {
                            id: transaction.id,
                            title: `Reserve`,
                            start: new Date(transaction.rent_start),
                            end: new Date(transaction.rent_end),
                            user_id: transaction.user_id,
                            tooltip: `Room ID: ${transaction.room_id}\nRent Start: ${transaction.rent_start}\nRent End: ${transaction.rent_end}`,
                        };
                    });
                    setEvents(mapevents);
                } else {
                    toast.error(res?.message ?? "Something went wrong.");
                }
            });
        }
    }, [cookies.AUTH_TOKEN]);

    const eventStyleGetter = (event) => {
        const backgroundColor = "#1E90FF";
        const style = {
            backgroundColor: backgroundColor,
            borderRadius: "0px",
            opacity: 0.8,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            height: "100%",
            width: "100%",
        };

        return {
            style: style,
        };
    };

    const EventContent = ({ event }) => (
        <Box
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {isMobile ? (
                <PinDropIcon style={{ marginRight: 4 }} />
            ) : (
                <span
                    style={{
                        display: "inline-block",
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    <PinDropIcon style={{ marginRight: 4 }} /> {event.title}
                </span>
            )}
        </Box>
    );

    return (
        <Box>
            <Calendar
                localizer={localizer}
                events={events}
                style={{ height: "100vh" }}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: EventContent,
                }}
                tooltipAccessor={(e) => e.tooltip}
            />
        </Box>
    );
}
