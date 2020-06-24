import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import HelpPopup from '../HelpPopup/HelpPopup';
import {useDispatch, useSelector} from 'react-redux';
import {updateQuestion} from '../../redux/form/form.actions';
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
const Question5 = () => {
    const q5 = useSelector(state => state.form.questions[4]);
    const sal = q5.javab.sal || '';
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        const point = +value * 4;
        dispatch(updateQuestion(q5, {
            javab        : {
                ...q5.javab,
                [name]: value
            },
            emtiaz_karbar: point
        }));
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر سال خدمت تمام وقت (44 ساعت کار در هفته) در ادارات آموزش و پرورش و دفاتر سنادی (4) امتیاز
                <br/>
                <b>این امتیاز به پنج سال اول خدمت تعلق نمی گیرد.</b>
                <HelpPopup>
                    به همکارانی که در 5 سال اول در اداره آموزش و پرورش مشغول به کار هستند امتیازی تعلق نمی گیرد، اما به
                    سایر همکاران با سابقه بیش از 5 سال تعلق میگیرد.
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField type='number'
                           InputProps={{endAdornment: <InputAdornment position="start">سال</InputAdornment>}}
                           name='sal'
                           onChange={handleChange}
                           value={sal}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>

            </form>

            <Points question={q5}/>

            {
                q5.taeed_karshenas &&
                <ObjectionBox question={q5}/>
            }<ActionButtons/>
        </>
    );
};

export default Question5;
