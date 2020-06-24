import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MainListItems from './ListItems';
import Button from '@material-ui/core/Button';
import Main from '../../components/Main/Main';
import {Redirect, Route, Switch} from 'react-router-dom';
import History from '../../components/History/History';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/user/user.actions';
import {getHistory} from '../../redux/history/history.actions';
import Loading from '../../components/Loading/Loading';
import {getForm} from '../../redux/form/form.actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root            : {
        display: 'flex'
    },
    toolbar         : {
        paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon     : {
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'flex-end',
        padding       : '0 8px',
        ...theme.mixins.toolbar
    },
    appBar          : {
        zIndex    : theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing  : theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift     : {
        marginLeft: drawerWidth,
        width     : `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing  : theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton      : {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title           : {
        flexGrow: 1
    },
    drawerPaper     : {
        position  : 'relative',
        whiteSpace: 'nowrap',
        width     : drawerWidth,
        transition: theme.transitions.create('width', {
            easing  : theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX                   : 'hidden',
        transition                  : theme.transitions.create('width', {
            easing  : theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width                       : theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9)
        }
    },
    appBarSpacer    : theme.mixins.toolbar,
    content         : {
        flexGrow: 1,
        height  : '100vh',
        overflow: 'auto'
    },
    container       : {
        paddingTop   : theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper           : {
        padding      : theme.spacing(2),
        display      : 'flex',
        overflow     : 'auto',
        flexDirection: 'column'
    },
    fixedHeight     : {
        height: 240
    }
}));

export default function Dashboard() {
    const loadingHistory = useSelector(state => state.history.loading);
    const loadingQuestions = useSelector(state => state.form.loading);

    const errorHistory = useSelector(state => state.form.error);
    const errorQuestions = useSelector(state => state.history.error);

    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    React.useEffect(() => {
        dispatch(getHistory())
            .then(() => dispatch(getForm()));
    }, []);
    React.useEffect(() => {
        if (errorHistory)
            alert('داده های مربوط به سوابق شما دریافت نشد، به کارشناس گزارش دهید');
        if (errorQuestions)
            alert('داده های مربوط به فرم شما دریافت نشد، به کارشناس گزارش دهید');
        if (errorQuestions || errorHistory) {
            alert('در حال انتقال به صفحه ورود');
            dispatch(logout());
        }

    }, [errorQuestions, errorHistory]);
    return (
        <>
            {
                loadingQuestions || loadingHistory || errorHistory || errorQuestions ? <Loading/> :
                    <div className={classes.root}>
                        <CssBaseline/>
                        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                            <Toolbar className={classes.toolbar}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                                    <MenuIcon/>
                                </IconButton>
                                <Typography component="h1" variant="h4" color="inherit" noWrap
                                            className={classes.title}>
                                    سامانه سازماندهی نیروهای انسانی
                                </Typography>
                                <IconButton color="inherit" onClick={() => dispatch(logout())}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        startIcon={<ExitToAppIcon/>}>
                                        خروج
                                    </Button>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <Drawer
                            variant="permanent"
                            classes={{
                                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
                            }}
                            open={open}
                        >
                            <div className={classes.toolbarIcon}>
                                <IconButton onClick={handleDrawerClose}>
                                    <ChevronRightIcon/>
                                </IconButton>
                            </div>
                            <Divider/>
                            <List>
                                <MainListItems/>
                            </List>
                        </Drawer>
                        <main className={classes.content}>
                            <div className={classes.appBarSpacer}/>
                            <Container maxWidth="lg" className={classes.container}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper}>
                                            <Switch>
                                                <Route path='/dashboard/history'>
                                                    <History/>
                                                </Route>

                                                {/*<Route exact path='/dashboard/organize'>
                                                 <TabP/>
                                                 </Route>*/}

                                                <Route exact path='/dashboard'>
                                                    <Main/>
                                                </Route>


                                                <Redirect to='/dashboard'/>
                                            </Switch>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Container>
                        </main>
                    </div>
            }
        </>
    );
}
