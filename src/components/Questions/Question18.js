import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import HelpPopup from '../HelpPopup/HelpPopup';
import {useSelector} from 'react-redux';
import ObjectionBox from '../ObjectionBox/ObjectionBox';

const useStyles = makeStyles((theme) => ({
    form: {
        display       : 'flex',
        justifyContent: 'center',
        '& > *'       : {
            margin   : theme.spacing(1),
            width    : '25ch',
            marginTop: theme.spacing(3)
        }
    }
}));
const Question17 = () => {
    const classes = useStyles();
    const q18 = useSelector(state => state.form.questions[17]);
    const salRahbarAmuzeshi = q18.javab.salRahbarAmuzeshi || '',
          salRahnamaShahri  = q18.javab.salRahnamaShahri || '';

    /*const dispatch = useDispatch();
     const handleChange = e => {
     const name = e.target.name;
     const value = e.target.value;

     const newSalRahbar = name === 'salRahbarAmuzeshi' ? +value : +salRahbarAmuzeshi;
     const newSarRahnama = name === 'salRahnamaShahri' ? +value : +salRahnamaShahri;
     dispatch(updateQuestion(q18, {
     javab        : {
     ...q18.javab,
     [name]: value
     },
     emtiaz_karbar: +newSarRahnama * 2 + +newSalRahbar * 3
     }));
     };*/
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر سال اشتغال در پست معلم راهنمای شهری (2) امتیاز و راهبر آموزشی و تربیتی (3) امتیاز
                <HelpPopup>
                    امتیاز این بند از فرم سوابق شما استخراج و محاسبه می شود
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{
                    endAdornment: <InputAdornment position="start">سال</InputAdornment>,
                    readOnly    : true
                }}
                           type='number'
                           name='salRahnamaShahri'
                           value={salRahnamaShahri}
                           helperText='معلم راهنمای شهری'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField InputProps={{
                    endAdornment: <InputAdornment position="start">سال</InputAdornment>,
                    readOnly    : true
                }}
                           type='number'
                           name='salRahbarAmuzeshi'
                           value={salRahbarAmuzeshi}
                           helperText='راهبر آموزشی و تربیتی روستایی'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>

            </form>

            <Points question={q18}/>

            {
                q18.taeed_karshenas &&
                <ObjectionBox question={q18}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question17;
