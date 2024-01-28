import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../image/Cover.png';
import ocs from '../image/ocs kasetsart.png';

const defaultTheme = createTheme();

function Login() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}`)
      .then((res) => {
        if (res.data.loggedIn) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form fields
    if (!username.trim()) {
      setUsernameError(true);
      return;
    }
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }

    // Reset validation errors
    setUsernameError(false);
    setPasswordError(false);

    const value = {
      username: username,
      password: password,
    };

    axios.post(`${process.env.REACT_APP_API}/login`, value)
      .then((res) => {
        if (res.data.Login) {
          navigate('/dashboard');
        } else {
          setErrorMessage(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={ocs} alt="OCS Kasetsart" className="imageStyle" style={{width:"15rem"}} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                error={usernameError}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError(false);
                }}
              />
              <TextField
                error={passwordError}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="changepassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {errorMessage && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
