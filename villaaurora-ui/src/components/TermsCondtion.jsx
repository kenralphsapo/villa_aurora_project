// TermsCondition.jsx

import React from "react";
import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Button,
} from "@mui/material";
import logo from "../pages/images/logo.jpg";

export default function TermsCondition({ createDialog, setCreateDialog }) {
   
    return (
        <Dialog open={createDialog} style={{width:'400px', display:'block', margin:'auto'}}>
         
            <DialogTitle style={{background:'#d6a354', color:"white", textAlign:'center'}}>
                Terms & Conditions - Villa Aurora Private Resort Swimming Pool Rules
            </DialogTitle>
            <img src={logo} alt="Logo" className="dialog-logo"/>
            <List>
                <ListItem>
                    <ListItemText primary="WARNING! No lifeguards on duty. Swim at your own risk. Children ages 12 and below must not be left unattended." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="PROPER SWIMMING ATTIRE REQUIRED. No colored cotton clothes or jeans allowed." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Please shower before entering the pool." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="STRICTLY NO RUNNING, DIVING, or HORSEPLAY around the pool area." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="NO FOOD, DRINKS, ALCOHOLIC BEVERAGES, BOTTLES, OR HAZARDOUS OBJECTS allowed within the pool area." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="NO PETS ALLOWED in the pool area." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="SMOKING IS NOT ALLOWED in the pool area, KTV room, or bedrooms. Designated smoking areas are provided." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="No spitting or blowing nose in the pool area." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="STRICTLY NO PARTY POPPERS allowed within the pool area." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Please dispose of all trash, including cigarette butts, in the designated trash bins." />
                </ListItem>
            </List>
            <Button id="btn-close" onClick={() => setCreateDialog(false)}>
                Close
            </Button>
        </Dialog>
    );
}
