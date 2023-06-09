import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {useIsAuthenticated, useSignOut, useAuthUser} from 'react-auth-kit';

const PublicDestinationCard = ({data}) => {
    let navigate = useNavigate();
    let authState = useAuthUser();
    const isLoggedIn = useIsAuthenticated();
    
    const handleClick = () => {
        if(isLoggedIn()) {
            let userID = authState().id;
            let accessLevel = authState().accessLevel;
            let path = '';
            let id = data.id;
            if(accessLevel === 1)
                path = `/publicDestinations/${id}`;
            else 
                path = `/publicDestinationsUser/${id}`;
            navigate(path);
        }
    }
    return (
        <Card sx={{
          borderRadius: '1em', 
          border: '0px',
          boxShadow: '0 10px 4px rgba(0,0,0,0.2)', 
          height: '420px',
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
                image={data.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{textAlign: 'center' }}>
                    {data.name}
                    <br></br><br></br>
                    <Button variant="contained" onClick={handleClick}>
                    See Details
                    </Button>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default PublicDestinationCard;
