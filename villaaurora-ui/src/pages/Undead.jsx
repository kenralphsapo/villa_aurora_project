import { Typography } from '@mui/material';
import React, { useState } from 'react'

export default function Undead() {
    const [open , setOpen] = useState(false);
    const onCreateTestimonial = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                transaction_id: $("#transaction_id").val(),
                feedback: $("#feedback").val(),
                rating: rating,
            };

            addTestimonial(body)
                .then((res) => {
                    console.log(res);
                    if (res?.ok) {
                        toast.success(res?.message ?? "Testimonial successful");
                        setCreateTestimonialDialog(false);
                        refreshData();
                        setWarnings({});
                        setRating(0);
                    } else {
                        toast.error(
                            res?.message ?? "Testimonial creation failed."
                        );
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };


  return (
    <>
    {
        open ? (
            
       <Dialog open={createTestimonialDialog}>
       <DialogTitle>Create Transaction Form</DialogTitle>
       <DialogContent>
           <Box component="form" onSubmit={onCreateTestimonial}>
               <Box>
                   <TextField
                       id="transaction_id"
                       label="Transaction ID"
                       variant="outlined"
                       margin="normal"
                       fullWidth
                       required
                   />
               </Box>
               <Box>
                   <TextField
                       id="feedback"
                       label="Feedback"
                       variant="outlined"
                       margin="normal"
                       fullWidth
                       required
                   />
               </Box>
               <Box>
                   <Box sx={{ mt: 1 }}>
                       <Typography>Rating</Typography>
                       <Box
                           style={{
                               textAlign: "center",
                               fontSize: "24px",
                               color: "#ffc107",
                           }}
                       >
                           {[1, 2, 3, 4, 5].map((value) => (
                               <FontAwesomeIcon
                                   key={value}
                                   icon={faStar}
                                   style={{
                                       cursor: "pointer",
                                       color:
                                           value <= rating
                                               ? "#ffc107"
                                               : "#e4e5e9",
                                       marginRight: "5px",
                                   }}
                                   onClick={() =>
                                       onStarValue(value)
                                   }
                               />
                           ))}
                       </Box>
                   </Box>
               </Box>

               <Box className="d-flex justify-content-center align-items-center mt-2">
                   <Button
                       color="info"
                       onClick={() =>
                           setCreateTestimonialDialog(false)
                       }
                   >
                       Close
                   </Button>
                   <Button
                       disabled={loading}
                       type="submit"
                       color="success"
                       style={{ marginLeft: "10px" }}
                   >
                       Submit
                   </Button>
               </Box>
           </Box>
       </DialogContent>
   </Dialog>
        ) : null
    }
    </>
  )
}
