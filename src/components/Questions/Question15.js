import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import {useDispatch, useSelector} from 'react-redux';
import ObjectionBox from '../ObjectionBox/ObjectionBox';
import {updateQuestion} from '../../redux/form/form.actions';

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
const Question15 = () => {
    const classes = useStyles();
    const q15 = useSelector(state => state.form.questions[14]);
    const tedadeFarzand = q15.javab.tedadeFarzand || '';
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateQuestion(q15, {
            javab        : {
                ...q15.javab,
                [name]: value
            },
            emtiaz_karbar: +value * 3
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر فرزند تحت تکفل طبق شناسنامه (3) امتیاز
                <br/>
                زوجین فرهنگی هرکدام جداگانه از امتیاز این بند استفاده می نمایند
                <br/>
                <b>تنها به فرزندانی که در حکم کارگزینی ثبت شده اند امتیاز تعلق میگیرد.</b>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">فرزند</InputAdornment>}}
                           type='number'
                           name='tedadeFarzand'
                           value={tedadeFarzand}
                           helperText='تعداد فرزندان'
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>
            <Points question={q15}/>
            {
                q15.taeed_karshenas &&
                <ObjectionBox question={q15}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question15;
