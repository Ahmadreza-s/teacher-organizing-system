import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import {useDispatch, useSelector} from 'react-redux';
import {updateQuestion} from '../../redux/form/form.actions';
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
const Question34 = () => {
    const q34 = useSelector(state => state.form.questions[33]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const gheybat = q34.javab.gheybat || '';
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateQuestion(q34, {
            javab        : {
                ...q34.javab,
                [name]: value
            },
            emtiaz_karbar: +value * -.5
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر روز غیبت غیر موجه در سال جاری (0.5) امتیاز از مجموع امتیاز های کسر شود.
                <br/>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">روز</InputAdornment>}}
                           type='number'
                           name='gheybat'
                           onChange={handleChange}
                           value={gheybat}
                           helperText='تعداد غیبت'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>

            </form>

            <Points question={q34}/>
            {
                q34.taeed_karshenas &&
                <ObjectionBox question={q34}/>
            }
            <ActionButtons isLast/>
        </>
    );
};

export default Question34;
