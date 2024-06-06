import React from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Results Component
 * 
 * This component displays filtered results received from the Home component.
 * It renders a table with the filtered data and provides a button to navigate back.
 */
const Results = () => {
  // Get the current location
  const location = useLocation();
  // Initialize navigation hook
  const navigate = useNavigate();
  // Destructure data from location state, default to an empty array if not available
  const { data } = location.state || [];

  // Function to handle back button click
  const handleBackClick = () => {
    // Navigate back to the Home page
    navigate('/');
  };

  return (
    <Container style={{ backgroundColor: '#f5f5f5', color: '#333', padding: '20px', borderRadius: '10px' }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
        Filtered Results
      </Typography>
      
      {/* Back Button */}
      <Button variant="contained" color="primary" onClick={handleBackClick} style={{ marginBottom: '20px', backgroundColor: '#ff6600', color: '#fff' }}>
        Back
      </Button>
      
      {/* Results Table */}
      <Paper style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow style={{ backgroundColor: '#ff6600', color: '#fff' }}>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
          </TableHead>
          
          {/* Table Body */}
          <TableBody>
            {/* Render table rows based on data availability */}
            {data.length > 0 ? (
              // If data is available, map through each item and render a table row
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.userId}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.completed ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))
            ) : (
              // If no data is available, display a single table row with a message
              <TableRow>
                <TableCell colSpan={4}>No results found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Results;
