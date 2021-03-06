import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none'
    },
    paper  : {
        padding: theme.spacing(1)
    }
}));

const HelpPopup = ({children}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = event => setAnchorEl(event.currentTarget);

    const handlePopoverClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);

    return (
        <div style={{display: 'inline-block', float: 'left'}}>
            <HelpOutlineRoundedIcon
                color='secondary'
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            />
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{paper: classes.paper}}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical  : 'center',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical  : 'top',
                    horizontal: 'left'
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus>
                <Typography>{children}</Typography>
            </Popover>
        </div>
    );
};
export default HelpPopup;
