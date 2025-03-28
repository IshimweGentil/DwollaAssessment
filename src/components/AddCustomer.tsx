import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState} from 'react';

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
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        businessName: '',
        email: ''
    }) //added useState hooks to track info entered by user

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    } //updates corresponding state when an input field is changed

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/customers', { //sends request to the API endpoint to add a new customer
                method: 'POST', //sepcifies POST request
                headers: {
                    'Content-Type': 'application/json', //request is JSON format
                },
                body: JSON.stringify(customer), //turns customer object into a JSON string
            });
            if (!response.ok) {
                throw new Error('Failed to add customer');
            }

            setCustomer({
                firstName: '',
                lastName: '',
                businessName: '',
                email: ''
            }); //resets the customer object to empty strings after successful submission

            handleClose(); //closes the modal after submission
        }   catch(err) {
            setError('Failed to add customer. Please try again.');
        }   finally {
            setLoading(false); //sets loading to false after submission
        }
    }

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

                        {/* connected input fields to state using value and onChange */}

                        <TextField name="firstName" label="First Name" variant="outlined" value={customer.firstName} onChange={handleChange} required />
                        <TextField name="lastName" label="Last Name" variant="outlined" value={customer.lastName} onChange={handleChange} required />
                        <TextField name="businessName" label="Business Name" variant="outlined" value={customer.businessName} onChange={handleChange}  />
                    </Stack>
                    <TextField name="email" label="Email" variant="outlined" value={customer.email} onChange={handleChange} required sx={{width:'100%', justifyContent: 'flex-end',}}/>

                    {error && <Typography color="error" sx={{ marginTop: 1 }}>{error}</Typography>}

                    <Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: 2}}>
                        <Stack spacing={2} direction="row" sx={{ marginTop: 2,}}>

                            {/* cancel button closes modal and is disabled when loading */}
                            {/* create button triggers handleSubmit and updates label when loading */}
                            <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Adding...' : 'Create'}
                            </Button>


                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
    }

export default AddCustomer