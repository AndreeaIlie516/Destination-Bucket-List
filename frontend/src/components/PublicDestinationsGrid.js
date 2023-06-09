import React, {useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"; 
import PublicDestinationCard from "./PublicDestinationCard";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const PublicDestinationGrid = () => {
  const [publicDestinations, setPublicDestinations] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const isLoggedIn = useIsAuthenticated();
  const cookies = useAuthUser();
  const nav = useNavigate();
  let accessLevel = 0;
  if (isLoggedIn()) {
    accessLevel = cookies().accessLevel;  
  }
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("https://localhost:7183/api/PublicDestinations");
      let data = await response.json();
      setPublicDestinations(data);
    }
    fetchData();
  }, [])

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleAdd = () => {
    nav("/addPublic");
  }

  return (
    <div>
       {accessLevel === 1 && <Button onClick={handleAdd} variant="contained" sx={{marginBottom : "20px"}}>Add Public Destination</Button>}
      <Grid container columnSpacing={6} rowSpacing={6}>
        {publicDestinations.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(publicDestination => (
          <Grid item  md={4} key={publicDestination.id} >
            <Paper elevation={0}>
              <PublicDestinationCard data={publicDestination}></PublicDestinationCard>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2.2em' }}>
        <Pagination count={Math.ceil(publicDestinations.length / itemsPerPage)} page={page} onChange={handleChange} />
      </Box>
    </div>
  );
}

export default PublicDestinationGrid;