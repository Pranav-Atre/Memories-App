import React, { useCallback, useEffect, useState } from 'react'
import memoriesLogo from "../../images/memoriesLogo.png"
import memoriesText from "../../images/memoriesText.png"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import useStyles from "./styles"
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode'


const NavBar = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleLogout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        history.push('/auth');
    }, [dispatch, history]);

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, handleLogout, user?.token])
    return (
        <AppBar className={classes.appBar} position="static" color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={memoriesText} alt='Memories' height='45px' />
                <img className={classes.image} src={memoriesLogo} alt='icon' height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user?.result.name}</Typography>
                        <Button variant='contained' color='secondary' className={classes.logout} onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar >
    )
}

export default NavBar
