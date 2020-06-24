import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import {useDispatch, useSelector} from 'react-redux';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
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
const Question26 = () => {
    const q26 = useSelector(state => state.form.questions[25]);
    const tedad = q26.javab.tedad || '';

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const calcPoint = +value * 2;
        dispatch(updateQuestion(q26, {
            javab        : {
                ...q26.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint >= 10 ? 10 : calcPoint
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                اخذ گواهی دوره ی مدرسی مربوط به دوره ابتدایی (2) امتیاز ، حداکثر 10 امتیاز
                <br/>
                <b>تاییدیه اداره برنامه ریزی اداره کل الزامی است</b>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">گواهی</InputAdornment>}}
                           type='number'
                           name='tedad'
                           onChange={handleChange}
                           value={tedad}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>
            <FileUploadBox
                uploadedFiles={q26.javab.files}
                onChange={files => dispatch(updateFiles(q26, files))}
                limitFilesCount={tedad}/>
            <Points question={q26}/>
            {
                q26.taeed_karshenas &&
                <ObjectionBox question={q26}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question26;
