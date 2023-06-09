import { InputLabel, Container, FormControl, FormHelperText, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material"

const AddPublicDestination = () => {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [geolocation, setGeolocation] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (error) {
            setError("");
        }
        if (!name || !geolocation || !image || !description) {
            setError("All fileds must be filled in");
            return;
        }
        const obj = {
            name: name, 
            geolocation: geolocation, 
            image: image, 
            description: description,
        }
        const response = await fetch("https://localhost:7183/api/PublicDestinations", {
            method: "POST", 
            headers: { 
                'Content-Type': 'application/json-patch+json',
            },
            body: JSON.stringify(obj)
        });
        if(response.ok) {
            nav("/");
        }
    }

    return (
        <>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Container sx={{ width: '100%', marginTop: '3em' }}>
                <br></br>
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <Input onChange={(e) =>(setName(e.target.value))} id="name-input" aria-describedby="my-helper-text" sx={{ width: '100%' }} required/>
                <InputLabel htmlFor="geolocation-input" sx={{ width: '100%', marginTop: '2em' }}>Geolocation</InputLabel>
                <Input onChange={(e) => setGeolocation(e.target.value)} id="geolocation-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} required/>
                <InputLabel htmlFor="image-input" sx={{ width: '100%', marginTop: '2em' }}>Image</InputLabel>
                <Input onChange={(e) => setImage(e.target.value)} id="image-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} required />
                <InputLabel htmlFor="description-input" sx={{ width: '100%', marginTop: '2em' }}>Description</InputLabel>
                <Input onChange={(e) => setDescription(e.target.value)} id="description-input" aria-describedby="my-helper-text" sx={{ width: '100%', marginTop: '0.5em' }} required/>
                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: '2em' }}>Add</Button>
                {error !== "" && <Typography sx={{color: "red"}}>{error}</Typography>}
            </Container>
        </>
    )
}


export default AddPublicDestination;