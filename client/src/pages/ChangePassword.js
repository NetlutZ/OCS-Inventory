import { React, useState, useEffect } from 'react';
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

const defaultTheme = createTheme();

export default function ChangePassword() {
    const [showOTP, setShowOTP] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [isOTPCooldown, setIsOTPCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(60);


    const handleSubmit = (event) => {
        event.preventDefault();
        // Your logic for handling form submission
    };

    useEffect(() => {
        // Clean up the cooldown timer when the component is unmounted
        return () => clearTimeout();
    }, []);

    const handleSendOTP = () => {
        if (!isOTPCooldown) {
            setShowOTP(true);
            setIsOTPCooldown(true);

            // Set a timer for 60 seconds to reset the cooldown
            const timer = setInterval(() => {
                setCooldownTime((prevTime) => {
                    if (prevTime === 1) {
                        clearInterval(timer);
                        setIsOTPCooldown(false);
                        setCooldownTime(60);
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
    };

    const handleConfirmOTP = () => {
        setShowPasswordFields(true);
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
                        Change Password
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
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

                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSendOTP}
                                    disabled={isOTPCooldown}
                                    sx={{ mt: 0, mb: 0 }}
                                >
                                    {isOTPCooldown
                                        ? `Resend OTP in ${cooldownTime}s`
                                        : 'Send OTP'}
                                </Button>
                            </Grid>

                            {showOTP && (
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="test"
                                        label="OTP"
                                        name="test"
                                    />
                                </Grid>
                            )}

                            {showOTP && (
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <Button variant="contained" onClick={handleConfirmOTP} sx={{ mt: 0, mb: 0 }}>
                                        Confirm OTP
                                    </Button>
                                </Grid>
                            )}

                            {showPasswordFields && (
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="New Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                        {showPasswordFields && (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Change Password
                            </Button>
                        )}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

// export default ChangePassword
