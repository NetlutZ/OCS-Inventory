import { React, useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as ConstanceStrings from '../ConstanceString';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    axios.defaults.withCredentials = true
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState('');
    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        username: false,
        email: false,
        password: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormErrors({ ...formErrors, [name]: !value.trim() });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate input fields
        const firstName = event.target.firstName.value.trim();
        const lastName = event.target.lastName.value.trim();
        const username = event.target.username.value.trim();
        const email = event.target.email.value.trim();
        const password = event.target.password.value.trim();

        if (!firstName || !lastName || !username || !email || !password) {
            // Update formErrors state to highlight empty fields
            setFormErrors({
                firstName: !firstName,
                lastName: !lastName,
                username: !username,
                email: !email,
                password: !password,
            });
            return;
        }

        const value = {
            name: firstName + " " + lastName,
            email: email,
            username: username,
            password: password,
            role: ConstanceStrings.USER,
        };

        axios.post(`${process.env.REACT_APP_API}/register`, value)
            .then((res) => {
                if (res.data.Register) {
                    navigate('/');
                } else {
                    console.log(res.data.error);
                    setErrorMessage(res.data.error);
                    // Handle registration failure (e.g., display an error message)
                }
            })
            .catch((err) => {
                console.log(err);
                // Handle unexpected errors (e.g., display an error message)
            });
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={formErrors.firstName}
                                    helperText={formErrors.firstName ? 'Field is required' : ''}
                                    onChange={handleInputChange}
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
                                    error={formErrors.lastName}
                                    helperText={formErrors.lastName ? 'Field is required' : ''}
                                    onChange={handleInputChange}
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
                                    error={formErrors.username}
                                    helperText={formErrors.username ? 'Field is required' : ''}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={formErrors.email}
                                    helperText={formErrors.email ? 'Field is required' : ''}
                                    onChange={handleInputChange}
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
                                    error={formErrors.password}
                                    helperText={formErrors.password ? 'Field is required' : ''}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        {/* Display the error message to the user */}
                        {errorMessage && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {errorMessage}
                            </Typography>
                        )}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
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