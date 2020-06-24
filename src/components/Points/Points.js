import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop     : theme.spacing(2),
        display       : 'flex',
        justifyContent: 'center',
        '& > *'       : {
            margin: theme.spacing(2),
            width : '40ch'
        }
    }
}));
const Points = ({question}) => {
    const classes = useStyles();
    let errText = null;
    if (question.taeed_karshenas && question.tozihat_karshenas)
        errText = question.tozihat_karshenas;
    else if (question.taeed_karshenas && question.tozihat_karshenas)
        errText = 'امتیاز شما توسط کارشناس تایید شد';
    return (
        <div className={classes.root}>
            <TextField
                label="امتیاز محاسبه شده"
                value={question.emtiaz_karbar}
                InputProps={{readOnly: true}}
                inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}
                variant='outlined'/>
            <TextField
                inputProps={{readOnly: true, style: {textAlign: 'center', direction: 'ltr'}}}
                label="امتیاز تایید شده توسط کارشناس"
                value={question.taeed_karshenas ? question.emtiaz_karshenas : 'نامشخص'}
                helperText={errText}
                variant='outlined'
                error={!!question.tozihat_karshenas}
                color='primary'/>
        </div>
    );
};

export default React.memo(Points, (prevProps, nextProps) => {
    const prev = prevProps.question;
    const next = nextProps.question;
    return prev.emtiaz_karbar === next.emtiaz_karbar && prev.emtiaz_karshenas === next.emtiaz_karshenas &&
        prev.taeed_karshenas === next.taeed_karshenas && prev.tozihat_karshenas === next.tozihat_karshenas;
});
