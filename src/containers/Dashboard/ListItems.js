import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import ApartmentRoundedIcon from '@material-ui/icons/ApartmentRounded';
import {NavLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    active: {
        backgroundColor: '#ccc'
    }
}));
const MainListItems = () => {
    const classes = useStyles();

    return (
        <div>

            <ListItem button
                      component={NavLink}
                      exact
                      activeClassName={classes.active}
                      to={'/dashboard'}>
                <ListItemIcon>
                    <ListAltRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="فرم امتیازها"/>
            </ListItem>

            <ListItem button
                      component={NavLink}
                      exact
                      activeClassName={classes.active}
                      to={'/dashboard/history'}>
                <ListItemIcon>
                    <ApartmentRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary="سوابق تدریس"/>
            </ListItem>
            {/* <ListItem button
             component={NavLink}
             exact
             activeClassName={classes.active}
             to='/dashboard/organize'>
             <ListItemIcon>
             <ImportExportRoundedIcon/>
             </ListItemIcon>
             <ListItemText primary="سازماندهی"/>
             </ListItem>*/}
        </div>
    );
};
export default MainListItems;
