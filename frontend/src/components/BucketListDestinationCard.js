import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const BucketListDestinationCard = ({data}) => {
    let navigate = useNavigate();
    const handleClickPublic = () => {
        let path = `/BucketListPublicDestination/${data.publicDestinationId}`;
        navigate(path);
    }
    const handleClickPrivate = () => {
        let path = `/BucketListPrivateDestination/${data.privateDestinationId}`;
        navigate(path);
    }
    if(data.publicDestination) {
        return (
            <Card sx={{
              borderRadius: '1em', 
              border: '0px',
              boxShadow: '0 10px 4px rgba(0,0,0,0.2)', 
              height: '500px',
              transition: '0.3s',
              ':hover': {
                boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
                transform: 'scale(1.05)',
                cursor: 'pointer',
              },
            }}>
                <CardMedia 
                    component="img"
                    borderRadius='5em'
                    alt="title alternative"
                    height="250"
                    image={data.publicDestination.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center' }}>
                        {data.publicDestination.name}
                        {data.checkIn && <Typography variant="body2" color="text.secondary">Check In: {data.checkIn}</Typography>}
                        {data.checkOut && <Typography variant="body2" color="text.secondary">Check Out: {data.checkOut}</Typography>}
                        <br></br><br></br>
                        <Button variant="contained" onClick={data.publicDestination && handleClickPublic}>
                        See Details
                        </Button>
                    </Typography>
                </CardContent>
            </Card>
        );
    }
    else {
        if(data.privateDestination) {
            return (
                <Card sx={{
                  borderRadius: '1em', 
                  border: '0px',
                  boxShadow: '0 10px 4px rgba(0,0,0,0.2)', 
                  height: '500px',
                  transition: '0.3s',
                  ':hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
                    transform: 'scale(1.05)',
                    cursor: 'pointer',
                  },
                }}>
                    <CardMedia 
                        component="img"
                        borderRadius='5em'
                        alt="title alternative"
                        height="250"
                        image={data.privateDestination.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center' }}>
                            {data.privateDestination.name}
                            {data.checkIn && <Typography variant="body2" color="text.secondary">Check In: {data.checkIn}</Typography>}
                            {data.checkOut && <Typography variant="body2" color="text.secondary">Check Out: {data.checkOut}</Typography>}
                            <br></br><br></br>
                            <Button variant="contained" onClick={data.privateDestination && handleClickPrivate}>
                            See Details
                            </Button>
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
    }
}

export default BucketListDestinationCard;
