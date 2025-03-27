import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


interface AddCustomerProps {
    open: boolean;
    handleClose: () => void;
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: '400px', md: '600px' },
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  };
  
  const AddCustomer: React.FC<AddCustomerProps> = ({ open, handleClose }) => {
    return (
        <Box
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom:3}}>
                    Add Customer
                    </Typography>

                    <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                        <TextField id="outlined-basic" label="First Name *" variant="outlined" />
                        <TextField id="outlined-basic" label="Last Name *" variant="outlined" />
                        <TextField id="outlined-basic" label="Business Name *" variant="outlined" />
                    </Stack>
                    <TextField id="outlined-basic" label="Email *" variant="outlined" sx={{width:'100%', justifyContent: 'flex-end',}}/>

                    <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 2}}>
                        <Stack spacing={2} direction="row" sx={{ marginTop: 2,}}>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button variant="contained">Create</Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
    }

export default AddCustomer
