import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import HelpPopup from '../HelpPopup/HelpPopup';
import {useSelector} from 'react-redux';
import ObjectionBox from '../ObjectionBox/ObjectionBox';

const useStyles = makeStyles((theme) => ({
    form: {
        display       : 'flex',
        justifyContent: 'center',
        '& > *'       : {
            margin   : theme.spacing(1),
            marginTop: theme.spacing(3),
            width    : '25ch'
        }
    }
}));
const Question10 = () => {
    const classes = useStyles();
    const q10 = useSelector(state => state.form.questions[9]);
    const paye1Va6 = q10.javab.paye1Va6,
          paye2Ta5 = q10.javab.paye2Ta5;
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر سال تدریس در پایه های اول و ششم (3) امتیاز
                <br/>
                به ازای هر سال تدریس در پایه های دوم تا پنجم (2) امتیاز
                <HelpPopup>
                    امتیاز این بند از فرم سوابق شما استخراج و محاسبه می شود
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField type='number'
                           name='paye1Va6'
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           variant='outlined'
                           value={paye1Va6}
                           label='پایه های اول و ششم'
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
                <TextField type='number'
                           name='paye2Ta5'
                           variant='outlined'
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           value={paye2Ta5}
                           label='پایه دوم تا پنجم'
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
            </form>
            <Points question={q10}/>
            {
                q10.taeed_karshenas &&
                <ObjectionBox question={q10}/>
            }<ActionButtons/>
        </>
    );
};

export default Question10;
