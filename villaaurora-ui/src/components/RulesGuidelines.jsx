import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    Button,
    Typography,
    Grid,
} from "@mui/material";
import logo from "../pages/images/logo.jpg";

export default function RulesGuideLines({ createDialog, setCreateDialog }) {
    return (
        <Dialog open={createDialog} maxWidth="sm" fullWidth>
            <DialogTitle style={{ background: '#d6a354', color: "white", textAlign: 'center', marginBottom:10 }}>
                Rules and Guidelines - Villa Aurora Private Resort Swimming Pool
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} className="text-center">
                        <img src={logo} alt="Logo" style={{ maxWidth: '200px', height: 'auto', boxShadow: '2px 2px 4px black' }} />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center', paddingBottom: 20 }}>
                <Button variant="contained" onClick={() => setCreateDialog(false)} style={{ background: '#d6a354', color: 'white' }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
