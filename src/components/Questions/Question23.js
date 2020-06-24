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
            margin: theme.spacing(1),
            width : '25ch'
        }
    }
}));
const Question23 = () => {
    const classes = useStyles();
    const q23 = useSelector(state => state.form.questions[22]);
    const salRustayi = q23.javab.salRustayi || '';
    const salShahri = q23.javab.salShahri || '';

    /* const dispatch = useDispatch();
     const handleChange = e => {
     const name = e.target.name;
     const value = e.target.value;

     const newSalRustayi = name === 'salRustayi' ? +value : +salRustayi,
     newSalShahri  = name === 'salShahri' ? +value : +salShahri;
     dispatch(updateQuestion(q23, {
     javab        : {
     ...q23.javab,
     [name]: value
     },
     emtiaz_karbar: +newSalShahri * 3 + +newSalRustayi * 4
     }));
     };*/

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر سال اشتغال در پست مدیر مجتمع شهری (3) امتیاز و روستایی (4) امتیاز
                <HelpPopup>
                    امتیاز این بند از فرم سوابق شما استخراج و محاسبه می شود
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField
                    InputProps={{endAdornment: <InputAdornment position="start">سال</InputAdornment>, readOnly: true}}
                    type='number'
                    name='salShahri'
                    value={salShahri}
                    helperText='مدیر مجتمع شهری'
                    inputProps={{
                        onKeyPress: justPositiveNumberHandler,
                        style     : {textAlign: 'center', direction: 'ltr'}
                    }}/>
                <TextField
                    InputProps={{endAdornment: <InputAdornment position="start">سال</InputAdornment>, readOnly: true}}
                    type='number'
                    name='salRustayi'
                    value={salRustayi}
                    helperText='مدیر مجتمع روستایی'
                    inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>

            </form>

            <Points question={q23}/>

            {
                q23.taeed_karshenas &&
                <ObjectionBox question={q23}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question23;
