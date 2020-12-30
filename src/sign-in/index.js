import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {DDAlert, sendErrorAlert} from "../alert";

function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={props.copyrightLink}>
        {props.copyrightTitle}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const DD_ALERT_SIGN_IN = "DDAlert-SignIn";

export function DDSignIn(props) {

  let uname = props.username || '';
  let pword = props.password || '';
  let me = props.rememberMe || false;

  const [username, setUsername] = useState(uname);
  const [password, setPassword] = useState(pword)
  const [rememberMe, setRememberMe] = useState(me);

  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault();
    let value = {
      [props.usernameKey || 'username']: username,
      [props.passwordKey || 'password']: password,
      [props.rememberMeKey || 'rememberMe']: rememberMe
    };
    console.log('value', value);
    if (props.onSubmit) {
      props.onSubmit(value);
    }
    if (props.authLink) {
      let data = JSON.stringify(value);
      fetch(props.authLink, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: data
      })
        .then(res => res.json())
        .then(response => {
          if (response.code && response.code === 400) {
            if (typeof props.onError === 'function') {
              props.onError(response);
            } else {
              sendErrorAlert({title: "Login Error", message: response.message});
            }
          } else {
            if (typeof props.onSuccess === 'function') {
              props.onSuccess(response);
            } else {
              sendErrorAlert({title: "Login Error", message: response.message})
            }
            console.log('--- response --- ', response);
          }
        })
        .catch(error => {
          if (typeof props.onError === 'function') {
            props.onError(error);
          } else {
            sendErrorAlert({title: "Login Error", message: error.message || JSON.stringify(error)})
          }
        });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <DDAlert id={DD_ALERT_SIGN_IN}/>
      <CssBaseline/>
      <div className={classes.paper}>
        {props.avatar &&
        <Avatar className={classes.avatar} src={props.avatar} alt={'Logo'}/>
        }
        {!props.avatar &&
        <Avatar className={classes.avatar} src={props.avatar} alt={'Logo'}>
          <LockOutlinedIcon/>
        </Avatar>}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox color="primary"
                        checked={rememberMe}
                        value={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}/>
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={props.forgotLink ? props.forgotLink : '#'} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={props.signUpLink ? props.signUpLink : '#'} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright copyrightLink={props.copyrightLink} copyrightTitle={props.copyrightTitle}/>
      </Box>
    </Container>
  );
}
