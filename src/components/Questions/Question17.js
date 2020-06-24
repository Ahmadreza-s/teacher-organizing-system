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
            width    : '30ch',
            marginTop: theme.spacing(3)
        }
    }
}));
const Question17 = () => {
    const classes = useStyles();
    const q17 = useSelector(state => state.form.questions[16]);
    const {salMoavenat, salModirAmuzegar, salModirMostaghel} = q17.javab;

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر سال تحصیلی اشتغال در پست (مدیر آموزگار) یا معاون آموزگار در مدارس ابتدایی (1) امتیاز
                <br/>
                به ازای هر سال تحصیلی اشتغال در پست مدیریت مستقل مدارس ابتدایی (2) امتیاز
                <br/>
                به ازای هر سال تحصیلی اشتغال در پست معاونت مدارس ابتدایی (1) امتیاز
                <HelpPopup>
                    امتیاز این بند از فرم سوابق شما استخراج و محاسبه می شود
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField type='number'
                           name='salModirAmuzegar'
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           variant='outlined'
                           value={salModirAmuzegar}
                           label='مدیر آموزگار یا معاون آموزگار'
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
                <TextField type='number'
                           name='salModirMostaghel'
                           variant='outlined'
                           value={salModirMostaghel}
                           label='مدیریت مستقل'
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
                <TextField label='معاونت'
                           type='number'
                           name='salMoavenat'
                           variant='outlined'
                           value={salMoavenat}
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>
            </form>
            <Points question={q17}/>

            {
                q17.taeed_karshenas &&
                <ObjectionBox question={q17}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question17;
