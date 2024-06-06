import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // State variables to hold data and search inputs
  const [data, setData] = useState([]);
  const [userIdSearch, setUserIdSearch] = useState('');
  const [idSearch, setIdSearch] = useState('');
  const [completedSearch, setCompletedSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Fetch data from API on component mount
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  // Filter data whenever search inputs change
  useEffect(() => {
    filterData();
  }, [userIdSearch, idSearch, completedSearch]);

  // Function to filter data based on search inputs
  const filterData = () => {
    let filtered = data;

    if (userIdSearch) {
      filtered = filtered.filter(item => item.userId.toString() === userIdSearch);
    }

    if (idSearch) {
      filtered = filtered.filter(item => item.id.toString() === idSearch);
    }

    if (completedSearch) {
      filtered = filtered.filter(item =>
        (completedSearch.toLowerCase() === 'true' && item.completed) ||
        (completedSearch.toLowerCase() === 'false' && !item.completed)
      );
    }

    setFilteredData(filtered);
  };

  // Handle search button click and navigate to results page with filtered data
  const handleSearchClick = () => {
    navigate('/results', { state: { data: filteredData } });
  };

  // Handle mouse enter and leave events to toggle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Define row style for hover effect
  const rowStyle = {
    backgroundColor: isHovered ? '#f5f5f5' : 'inherit', // Change color on hover
    cursor: 'pointer', // Optional: Change cursor to pointer on hover
  };

  return (
    <Container style={{ backgroundColor: '#f5f5f5', color: '#333', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px', marginTop: '20px', color: '#ff6600' }}>
        Search List
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, marginBottom: 2 }}>
        <TextField
          label="Search by User ID"
          variant="outlined"
          fullWidth
          value={userIdSearch}
          onChange={(e) => setUserIdSearch(e.target.value)}
        />
        <TextField
          label="Search by ID"
          variant="outlined"
          fullWidth
          value={idSearch}
          onChange={(e) => setIdSearch(e.target.value)}
        />
        <TextField
          label="Search by Completed (true/false)"
          variant="outlined"
          fullWidth
          value={completedSearch}
          onChange={(e) => setCompletedSearch(e.target.value)}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSearchClick} style={{ marginBottom: '20px', backgroundColor: '#ff6600', color: '#fff' }}>
        Search
      </Button>
      <Paper style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#ff6600', color: '#fff' }}>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} style={rowStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.completed ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Home;
