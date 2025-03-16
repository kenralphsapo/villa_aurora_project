import React from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";

export default function MyCalendar({
    events,
    isMobile,
    setEvents,
    localizer,
    cookies,
}) {
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
