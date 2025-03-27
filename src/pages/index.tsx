import Head from 'next/head';
import useSWR from 'swr';
// Icon for Add Customer button
import { AddRounded } from '@mui/icons-material';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box} from '@mui/material/'
import Button from '@mui/material/Button';
import AddCustomer from '@/components/AddCustomer';
import { useState } from 'react';

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  businessName?: string;
};

export type Customers = Customer[];

export type ApiError = {
  code: string;
  message: string;
};

const Home = () => {
  // SWR is a great library for geting data, but is not really a solution
  // for POST requests. You'll want to use either another library or
  // the Fetch API for adding new customers.
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const body = await response.json();
    if (!response.ok) throw body;
    return body;
  };
  const { data, error, isLoading } = useSWR<Customers, ApiError>(
    '/api/customers',
    fetcher
  );


  // Manage modal state
  const [open, setOpen] = useState(false); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <Head>
        <title>Dwolla | Customers</title>
      </Head>


      <main>
        <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          minHeight: '100vh',
        }}>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (

              <TableContainer 
              component={Paper}
              sx={{
                width:'100%',
                maxWidth: { xs: '100%', sm: '90%', md: '75%',lg:'45%' }
              }}
              >
                  <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px',
                      }}
                    >
                      <Box>
                        <p>15 Customers</p> 
                      </Box>

                      <Button 
                        variant="contained" 
                        startIcon={<AddRounded />} 
                        sx={{ ml: 'auto' }} 
                        onClick={handleOpen}
                      >
                        Add Customer
                      </Button>
                    </Box>

                <Table>

                {/* Name and Email table heading*/}
                <TableHead>
                    <Box
                      sx={{
                        display: 'flex', // Enables Flexbox
                        justifyContent: 'space-between', 
                        alignItems: 'center', // Vertically centers the items
                        backgroundColor:'red'
                        
                      }}
                    >

                    </Box>

                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                  {data.map(customer => (
                    <TableRow key={customer.email}>
                      <TableCell>{customer.firstName} {customer.lastName}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                    </TableRow>

                  ))}
                  </TableBody>

              </Table>
            </TableContainer>
            )}
        </Box>
      </main>

      {/* AddCustomer Modal */}
      <AddCustomer open={open} handleClose={handleClose} />
      
    </>
  );
};

export default Home;
