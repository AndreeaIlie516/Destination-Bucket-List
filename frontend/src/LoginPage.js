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
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

const defaultTheme = createTheme();

const Login = () => {

    const [error, setError] = useState('');
    const nav = useNavigate();
    const signIn = useSignIn();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let objData = {
            id: 0,
            email: data.get('email'),
            password: data.get('password'),
        }
        if (objData['password'] !== data.get('confirmPassword')) {
            setError('Password doesnt match');
            return;
        }
        fetch('https://localhost:7183/api/Users/login', {
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objData)
        }).then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            }
            else {
                throw Error('Invalid email or password');
            }
        }).then((responseJson) => {
            console.log(responseJson.id);
            console.log(responseJson.accessLevel);
            console.log(responseJson);
            signIn({
                token: responseJson.token,
                expiresIn: 3600, 
                tokenType: 'Bearer',
                authState: {
                    id: responseJson.user.id,
                    accessLevel: responseJson.user.accessLevel
                }
            });
            nav('/');
        }).catch((error) => {
            setError(error.message);
        })
    }

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
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="password"
                                    type='password'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            {error && 
                                <Grid item xs={12} sx={{color: "red"}}>
                                    {error}
                                </Grid>
                            }
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login;