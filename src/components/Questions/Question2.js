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
const Question2 = () => {
    const classes = useStyles();
    const q2 = useSelector(state => state.form.questions[1]);
    const salGhable66 = q2.javab.salGhable66,
          daraje1     = q2.javab.daraje1,
          daraje2     = q2.javab.daraje2,
          daraje3     = q2.javab.daraje3;

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر سال خدمت آموزشی در روستا تا پایان شهریور ماه 66 هر سال (2) امتیاز و از 66/7/1 به بعد بر
                اساس
                سه درجه به ازای هر سال ترتیب درجه ی یک (1.5) امتیاز درجه دو (3) امتیاز ، درجه سه (4.5) امتیاز کمتر
                از 6
                ماه خدمت در روستا امتیاز ندارد؛ بیشتر از 6 ماه معادل یک سال محاسبه شود و برای خدمت نظام وظیفه در
                روستا
                امتیاز تعلق نخواهد گرفت.
                <HelpPopup>
                    امتیاز این بند از فرم سوابق شما استخراج و محاسبه می شود
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField label="قبل از 66"
                           type='number'
                           variant='outlined'
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           value={salGhable66}
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
                <TextField label="روستای درجه یک"
                           type='number'
                           variant='outlined'
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           value={daraje1}
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
                <TextField label="روستای درجه دو"
                           type='number'
                           variant='outlined'
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           value={daraje2}
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
                <TextField label="روستای درجه سه"
                           type='number'
                           variant='outlined'
                           value={daraje3}
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
            </form>
            <Points question={q2}/>
            {
                q2.taeed_karshenas &&
                <ObjectionBox question={q2}/>
            }<ActionButtons/>
        </>
    );
};

export default Question2;
