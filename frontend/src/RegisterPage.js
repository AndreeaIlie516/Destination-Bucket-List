import { react, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Select, InputLabel, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ErrorSharp } from '@mui/icons-material';



const defaultTheme = createTheme();

export default function SignUp() {
    const [accessType, setAccessType] = useState('Regular');
    const [success, setSuccess] = useState(undefined);
    const [error, setError] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let objData = {
            id: 0,
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            accessLevel: accessType,
        }
        if (objData['password'] != data.get('confirmPassword')) {
            setError('Passwords dont match');
            setSuccess(false);
            return;
        }
        fetch('https://localhost:7183/api/Users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json-patch+json',
            },
            body: JSON.stringify(objData),
        }).then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                setSuccess(true);
                return ;
            }
            else {
                throw new Error("Email or username already exists!");
            }
        }).catch((error) => {
            setError(error.message);
            setSuccess(false);
            return;
        })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    type='password'
                                    id='confirmPassword'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Acces Type</InputLabel>
                                <Select
                                    id='accesType'
                                    value={accessType}
                                    label='Acces Type'
                                    onChange={(e) => setAccessType(e.target.value)}
                                >
                                    <MenuItem value='Regular'>Regular</MenuItem>
                                    <MenuItem value='Admin'>Admin</MenuItem>
                                </Select>
                            </Grid>
                            {success &&
                                <Grid item xs={12} sx={{ backgroundColor: 'rgb(0, 204, 255)' }}>
                                    <Typography component='h5' >
                                        Account registered succesfully
                                    </Typography>
                                    <Link href="/login">Go to login</Link>
                                </Grid>}
                            {success == false &&
                                <Grid item xs={12} sx={{ color: 'red' }}>
                                    {error}
                                </Grid>}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}