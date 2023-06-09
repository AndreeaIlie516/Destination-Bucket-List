import { InputLabel, Container, FormControl, FormHelperText, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material"
import {useIsAuthenticated, useSignOut, useAuthUser} from 'react-auth-kit';

const AddCheckinCheckout = () => {
    const { id } = useParams();

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const nav = useNavigate();

    const authState = useAuthUser();
    const userID = authState().id;

    useEffect(() => {
        const fetchDestination = async () => {
            let response = await fetch(`https://localhost:7183/api/PublicDestinations/${id}`);
            let data = await response.json();
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
        }
        fetchDestination();
    }, []);

    const handleAddToBucketList = async () => {
        const params = new URLSearchParams();
        params.append('publicDestinationId', id);
        params.append('checkIn', checkIn);
        params.append('checkOut', checkOut);
        let response = await fetch(`https://localhost:7183/api/BucketList/${id}/${checkIn}/${checkOut}/PublicDestinationBucketlistItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        
        });
        
        if (!response.ok) {
            console.error('Failed to create PublicDestinationBucketListItem');
            return;
        }
        
        let publicDestinationBucketListItem = await response.json();
        
        const bucketListParams = new URLSearchParams();
        bucketListParams.append('bucketListItemId', publicDestinationBucketListItem.item.id);
        let itemId = publicDestinationBucketListItem.item.id;
    
        response = await fetch(`https://localhost:7183/api/BucketList/${userID}/${itemId}/item`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: bucketListParams
        });
        
        if (!response.ok) {
            console.error('Failed to add item to BucketList');
            return;
        }
        
        
        nav('/');
    }

    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Container sx={{ width: '100%', marginTop: '3em' }}>
                <br></br>
                <InputLabel htmlFor="checkin-input" sx={{ width: '100%', marginTop: '2em' }}>CheckIn</InputLabel>
                <Input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} id="checkin-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} />
                <InputLabel htmlFor="checkout-input" sx={{ width: '100%', marginTop: '2em' }}>CheckOut</InputLabel>
                <Input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} id="checkout-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} />
                <Button variant="contained" color="primary" onClick={handleAddToBucketList} sx={{ marginTop: '2em', mr: 1 }}>Add To BucketList</Button>
            </Container>
        </>
    )
}


export default AddCheckinCheckout;