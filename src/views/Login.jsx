import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Button, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

/*
    hardcoding for time
    usally would send the reqest to backend and get a session token if correct
    and then store that session token securely
*/
const Login = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e, obj) => {
        e.preventDefault();
    
        if(obj.username === "admin" && obj.password === "password123"){ 
          props.setAuth(true);
          props.history.push('/contents');
        }
        else{
          toast.error("Failed to Login. Check Username and Password");
        }
      }

    return (
        <div>
            <h1>Login</h1>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <TextField
                        id="txtUsername"
                        label="Username"
                        variant="filled"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        id="txtPassword"
                        label="Password"
                        type="password"
                        variant="filled"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>

                <Grid item>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={(e) => handleLogin(e, { username, password })}>
                        Log In
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;