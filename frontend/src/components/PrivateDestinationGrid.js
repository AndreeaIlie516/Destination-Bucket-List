import React, {useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"; 
import PrivateDestinationCard from "./PrivateDestinationCard";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const PrivateDestinationGrid = ({id}) => {
  const [privateDestinations, setPrivateDestinations] = useState([]);
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
      let response = await fetch("https://localhost:7183/api/PrivateDestinations");
      let data = await response.json();
      setPrivateDestinations(data);
    }
    fetchData();
  }, [])

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleAdd = () => {
    nav("/addPrivate");
  }

  console.log(privateDestinations);
  return (
    <div>
      {accessLevel === 0 && <Button onClick={handleAdd} variant='contained' sx={{marginBottom : "20px"}}>Add private Destination</Button>}
      <Grid container columnSpacing={6} rowSpacing={6}>
        {privateDestinations.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(privateDestination => (
          <Grid item  md={4} key={privateDestination.id} >
            <Paper elevation={0}>
              <PrivateDestinationCard data={privateDestination}></PrivateDestinationCard>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2.2em' }}>
        <Pagination count={Math.ceil(privateDestinations.length / itemsPerPage)} page={page} onChange={handleChange} />
      </Box>
    </div>
  );
}

export default PrivateDestinationGrid;

    