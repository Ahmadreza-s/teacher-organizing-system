import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../../redux/user/user.actions';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop    : theme.spacing(15),
        display      : 'flex',
        flexDirection: 'column',
        alignItems   : 'center'
    },

    form  : {
        width    : '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin : theme.spacing(3, 0, 2),
        padding: theme.spacing(2)
    }

}));

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);
    const [codePersoneli, setCodePersoneli] = React.useState('');
    const [password, setPassword] = React.useState('');
    React.useEffect(() => {
        dispatch(logout());
    }, []);
    const loginHandler = e => {
        e.preventDefault();
        dispatch(login(codePersoneli, password));
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    ورود به سامانه ارزشیابی و سازماندهی
                </Typography>
                <Typography component="h2" variant="caption" style={{textAlign: 'center'}}>
                    اداره آموزش و پرورش شهرستان گتوند
                    <br/>
                    کارشناسی آموزش ابتدایی
                </Typography>
                <form className={classes.form}
                      noValidate
                      autoComplete={'off'}
                      onSubmit={loginHandler}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="code_personeli"
                        type='number'
                        label="کد پرسنلی"
                        name="code_personeli"
                        inputProps={{
                            onKeyPress: justPositiveNumberHandler,
                            style     : {textAlign: 'center', direction: 'ltr', letterSpacing: 5}
                        }}
                        autoFocus
                        value={codePersoneli}
                        direction='ltr'
                        onChange={e => setCodePersoneli(e.target.value)}
                        disabled={loading}
                        error={error}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        inputProps={{
                            style: {textAlign: 'center', direction: 'ltr', letterSpacing: 5}
                        }}
                        label="رمز عبور"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading}
                        error={error}/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={loginHandler}
                        endIcon={!loading && <VpnKeyRoundedIcon/>}
                        className={classes.submit}>
                        {
                            !loading && 'ورود'
                        }
                        <CircularProgress size={24}/>
                    </Button>

                </form>

                <footer style={{marginTop: 20, textAlign: 'center', fontWeight: 'bold'}}>
                    <p>طراحی و توسعه :</p>
                    <p>احمدرضا صالحوند&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;سجاد اسماعیلی</p>
                </footer>
            </div>

            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={5000}
                open={!!error}>
                <MuiAlert elevation={6}
                          severity='error'
                          variant="filled">
                    {error}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default Login;
