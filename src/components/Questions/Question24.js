import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import HelpPopup from '../HelpPopup/HelpPopup';
import {useDispatch, useSelector} from 'react-redux';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
import ObjectionBox from '../ObjectionBox/ObjectionBox';

const useStyles = makeStyles((theme) => ({
    form: {
        display       : 'flex',
        justifyContent: 'center',
        '& > *'       : {
            margin   : theme.spacing(1),
            width    : '35ch',
            marginTop: theme.spacing(3)
        }
    }
}));
const Question24 = () => {
    const q24 = useSelector(state => state.form.questions[23]);
    const salMantaghe = q24.javab.salMantaghe || '';
    const salOstan = q24.javab.salOstan || '';

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const newSalOs  = name === 'salOstan' ? +value : +salOstan,
              newSalMan = name === 'salMantaghe' ? +value : +salMantaghe;

        const calcPoint = +newSalOs * 3 + +newSalMan * 2;
        dispatch(updateQuestion(q24, {
            javab        : {
                ...q24.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint >= 15 ? 15 : calcPoint
        }));
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                فعالیت در گروه های آموزشی استان به ازای هر سال (3) امتیاز - گروه آموزشی منطقه یا ناحیه (2) امتیاز
                <br/>
                <b>از سال تحصیلی 82 - 81 به بعد محاسبه گردد</b>
                <br/>
                حداکثر (15) امتیاز
                <HelpPopup>
                    ابلاغ گروه های آموزشی استان یا شهرستان بارگذاری شود
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">سال</InputAdornment>}}
                           type='number'
                           name='salOstan'
                           onChange={handleChange}
                           value={salOstan}
                           helperText='فعالیت در گروه های آموزشی استان'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">سال</InputAdornment>}}
                           type='number'
                           name='salMantaghe'
                           onChange={handleChange}
                           value={salMantaghe}
                           helperText='فعالیت در گروه های آموزشی منطقه یا ناحیه'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>

            </form>
            <FileUploadBox uploadedFiles={q24.javab.files}
                           onChange={files => dispatch(updateFiles(q24, files))}
                           limitFilesCount={q24.emtiaz_karbar > 0 ? 1 : 0}/>
            <Points question={q24}/>

            {
                q24.taeed_karshenas &&
                <ObjectionBox question={q24}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question24;
