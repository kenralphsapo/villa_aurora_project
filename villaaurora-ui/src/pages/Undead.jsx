// Undead.jsx

import React, { useState } from "react";


export default function Undead() {
    const [createDialog, setCreateDialog] = useState(false);

    return (
        <>
            <div className="App">
                <button onClick={() => setCreateDialog(true)}>Accept Terms and Conditions</button>
                
            </div>
        </>
    );
}
