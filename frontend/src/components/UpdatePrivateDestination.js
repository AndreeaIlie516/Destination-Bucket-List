import { InputLabel, Container, FormControl, FormHelperText, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material"

const UpdatePrivateDestination = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [name, setName] = useState("");
    const [geolocation, setGeolocation] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const fetchDestination = async () => {
            let response = await fetch(`https://localhost:7183/api/PrivateDestinations/${id}`);
            let data = await response.json();
            setDestination(data);
            setName(data.name);
            setGeolocation(data.geolocation);
            setImage(data.image);
            setDescription(data.description);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
        }
        fetchDestination();
    }, []);

    const handleSubmit = async () => {
        const response = await fetch(`https://localhost:7183/api/PrivateDestinations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json-patch+json',
            },
            body: JSON.stringify({
                id,
                name,
                geolocation,
                image,
                description,
            }),
        });
        if (response.ok) {
            nav(`/privateDestinations/${id}`);
        }
    }

    if (!destination) {
        return <h1>Loading...</h1>
    }
    else {
        return (
            <>
                <ResponsiveAppBar></ResponsiveAppBar>
                <Container sx={{ width: '100%', marginTop: '3em' }}>
                    <br></br>
                    <InputLabel htmlFor="name-input">Name</InputLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)} id="name-input" aria-describedby="my-helper-text" sx={{ width: '100%' }} />
                    <InputLabel htmlFor="geolocation-input" sx={{ width: '100%', marginTop: '2em' }}>Geolocation</InputLabel>
                    <Input value={geolocation} onChange={(e) => setGeolocation(e.target.value)} id="geolocation-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} />
                    <InputLabel htmlFor="image-input" sx={{ width: '100%', marginTop: '2em' }}>Image</InputLabel>
                    <Input value={image} onChange={(e) => setImage(e.target.value)} id="image-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} />
                    <InputLabel htmlFor="description-input" sx={{ width: '100%', marginTop: '2em' }}>Description</InputLabel>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} id="description-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} />
                    <InputLabel htmlFor="checkin-input" sx={{ width: '100%', marginTop: '2em' }}>CheckIn</InputLabel>
                    <Input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} id="checkin-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} />
                    <InputLabel htmlFor="checkout-input" sx={{ width: '100%', marginTop: '2em' }}>CheckOut</InputLabel>
                    <Input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} id="checkout-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} />
                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: '2em', mr: 1 }}>Update</Button>
                </Container>
            </>
        )
    }
}


export default UpdatePrivateDestination;