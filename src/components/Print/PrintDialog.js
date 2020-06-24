import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PrintContent from './PrintContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import PrintRoundedIcon from '@material-ui/icons/PrintRounded';

const styles = (theme) => ({
    root       : {
        margin : 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right   : theme.spacing(1),
        top     : theme.spacing(1),
        color   : theme.palette.grey[500]
    }
});
const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" style={{textAlign: 'center'}}>{children}</Typography>
            {onClose ? (
                <IconButton id='closeBtn'
                            className={classes.closeButton}
                            onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin : 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);
const PrintDialog = ({onClose}) => {
    return (
        <Dialog open={true} fullWidth={true} maxWidth='md' onClose={onClose}>
            <DialogTitle onClose={onClose}>
                فرم امتیازات سازماندهی دوره ابتدایی 1400- 1399
                <br/>
                <Typography variant="caption">
                    اداره آموزش و پرورش شهرستان گتوند
                    <br/>
                    کارشناسی آموزش ابتدایی
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <PrintContent/>
            </DialogContent>
            <DialogActions style={{justifyContent: 'center'}}>
                <Button autoFocus
                        id='printBtn'
                        onClick={() => window.print()}
                        color="primary"
                        startIcon={<PrintRoundedIcon/>}
                        variant='contained'>
                    چاپ فرم
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PrintDialog;
