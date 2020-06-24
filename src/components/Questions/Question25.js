import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import {useDispatch, useSelector} from 'react-redux';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
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
const Question25 = () => {
    const q25 = useSelector(state => state.form.questions[24]);
    const ostan    = q25.javab.ostan || '',
          mantaghe = q25.javab.mantaghe || '',
          vezarat  = q25.javab.vezarat || '';

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const newOs  = name === 'ostan' ? +value : +ostan,
              newMan = name === 'mantaghe' ? +value : +mantaghe,
              newVez = name === 'vezarat' ? +value : +vezarat;

        const calcPoint = +newMan + +newOs * 2 + +newVez * 3;

        dispatch(updateQuestion(q25, {
            javab        : {
                ...q25.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint >= 10 ? 10 : calcPoint
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                کسب عنوان معلم نمونه در منطقه (1) امتیاز، استان (2) امتیاز، وزارت (3) امتیاز
                <br/>
                <b>با ارائه گواهی از ستاد بزرگداشت مقام معلم از سال تحصیلی 82 - 81 به بعد محاسبه گردد</b>
                <br/>
                حداکثر (10) امتیاز
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">عدد</InputAdornment>}}
                           type='number'
                           name='mantaghe'
                           onChange={handleChange}
                           value={mantaghe}
                           helperText='معلم نمونه منطقه'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">عدد</InputAdornment>}}
                           type='number'
                           name='ostan'
                           onChange={handleChange}
                           value={ostan}
                           helperText='معلم نمونه استان'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">عدد</InputAdornment>}}
                           type='number'
                           name='vezarat'
                           onChange={handleChange}
                           value={vezarat}
                           helperText='معلم نمونه وزارت'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>


            </form>
            <FileUploadBox uploadedFiles={q25.javab.files}
                           onChange={files => dispatch(updateFiles(q25, files))}/>
            <Points question={q25}/>

            {
                q25.taeed_karshenas &&
                <ObjectionBox question={q25}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question25;
