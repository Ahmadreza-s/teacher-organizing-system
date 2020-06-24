import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
import {useDispatch, useSelector} from 'react-redux';
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
const Question8 = () => {
    const q8 = useSelector(state => state.form.questions[7]);
    const sal = q8.javab.sal || '',
          mah = q8.javab.mah || '';
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        let point = name === 'sal' ? +mah + +value * 5 : +value + +sal * 5;
        dispatch(updateQuestion(q8, {
            javab        : {
                ...q8.javab,
                [name]: value
            },
            emtiaz_karbar: point
        }));
    };
    const classes = useStyles();
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر ماه اسارت آزاده (1) امتیاز منظور می شود
                <br/>
                برای همسر آزاده که قبل از اسارت ازدواج نموده است به ازای هر سال اسارت همسران (5) امتیاز
                <br/>
                <b>ارائه گواهی از بنیاد امور آزادگان ضروری است</b>

            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">ماه</InputAdornment>}}
                           type='number'
                           onChange={handleChange}
                           value={mah}
                           name='mah'
                           helperText='اسارت آزاده'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">سال</InputAdornment>}}
                           type='number'
                           onChange={handleChange}
                           value={sal}
                           name='sal'
                           helperText='همسر آزاده'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>

            <FileUploadBox
                uploadedFiles={q8.javab.files}
                onChange={files => dispatch(updateFiles(q8, files))}
                limitFilesCount={q8.emtiaz_karbar > 0 ? 1 : 0}/>

            <Points question={q8}/>

            {
                q8.taeed_karshenas &&
                <ObjectionBox question={q8}/>
            }
            <ActionButtons/>
        </>
    );
};

export default React.memo(Question8);
