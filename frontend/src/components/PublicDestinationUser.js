import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResponsiveAppBar from './ResponsiveAppBar';
import { Box, Button, Typography, Divider } from "@mui/material";
import {useIsAuthenticated, useSignOut, useAuthUser} from 'react-auth-kit';

const PublicDestination = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [openDateForm, setOpenDateForm] = useState(false);
    const nav = useNavigate();

    const authState = useAuthUser();
    const userID = authState().id;

    const handleAddToBucketListClick = async () => {
        let path = `/addCheckinCheckout/${id}`;
        nav(path);
    }

    useEffect(() => {
        const fetchDestination = async () => {
            let response = await fetch(`https://localhost:7183/api/PublicDestinations/${id}`);
            let data = await response.json();
            setDestination(data);
        }
        fetchDestination();
    }, []);

    if (!destination) {
        return <Typography variant="h4" align="center">Loading...</Typography>
    }
    else {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f9f9f9',
                    height: '100vh',
                    width: '100%'
                }}
            >
                <ResponsiveAppBar />
                <Box sx={{ borderRadius: '1em', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '1080px' }}>
                    <Box sx={{ width: '100%', overflow: 'hidden' }}>
                        <img src={destination.image} alt="Destination" sx={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
                    </Box>
                    <Box 
                        sx={{ 
                            p: 3,
                            overflowY: 'auto',
                            maxHeight: 'calc(100vh - 300px - 64px)', // adjust as per your need, this considers appBar height and image height
                        }}
                    >
                        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
                            {destination.name}
                        </Typography>
                        <Divider sx={{ mb: 2 }}/>
                        <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                            Location: {destination.geolocation}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {destination.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="contained" color="primary" onClick={id && handleAddToBucketListClick} sx={{ mr: 1 }}>Add to BucketList</Button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', textAlign: 'center', py: 2, bgcolor:'#3874cb', color: 'white' }}>
                    <Typography variant="body2" component="div">
                        Time to Travel, toate drepturile rezervate @ ISS (kill me please)
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export default PublicDestination;
