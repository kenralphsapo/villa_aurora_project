// Undead.jsx

import React, { useState } from "react";
import MyCalendar from "../components/MyCalendar";


export default function Undead() {
    const [createDialog, setCreateDialog] = useState(false);

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h1>My Calendar App</h1>
                </header>
                <MyCalendar />
                <button onClick={() => setCreateDialog(true)}>Accept Terms and Conditions</button>
                
            </div>
        </>
    );
}
