import React, {useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"; 
import PublicDestinationCard from "./PublicDestinationCard";
import BucketListDestinationCard from "./BucketListDestinationCard";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const BucketListGrid = ({id}) => {
  const [bucketListDestinations, setBucketListDestinations] = useState([]);
  const [destinationID, setDestinationId] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(`https://localhost:7183/api/BucketList/${id}`);
      let data = await response.json();
      setBucketListDestinations(data.items);
    }
    fetchData();
  }, [])

  const handleChange = (event, value) => {
    setPage(value);
  };

  console.log(bucketListDestinations);
  if (bucketListDestinations) {
    return (
        <div>
          <Grid container columnSpacing={6} rowSpacing={6}>
            {bucketListDestinations.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(bucketListDestination => (
              <Grid item  md={4} key={bucketListDestination.id} >
                <Paper elevation={0}>
                    <BucketListDestinationCard data={bucketListDestination}></BucketListDestinationCard>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2.2em' }}>
            <Pagination count={Math.ceil(bucketListDestinations.length / itemsPerPage)} page={page} onChange={handleChange} />
          </Box>
        </div>
      );
  } else {
    return (
        <div align='center'>
            <p>There is no destination in your bucket list yet.</p>
        </div>
    )
  }

}

export default BucketListGrid;
