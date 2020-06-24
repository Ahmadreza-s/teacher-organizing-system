import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import HelpPopup from '../HelpPopup/HelpPopup';
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
const Question12 = () => {
    const classes = useStyles();
    const q12 = useSelector(state => state.form.questions[11]);
    const dore = q12.javab.dore || '';
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateQuestion(q12, {
            javab        : {
                ...q12.javab,
                [name]: value
            },
            emtiaz_karbar: +value
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر دوره همکاری با اداره سواد آموزی (1) امتیاز حساب می شود
                <br/>
                <b>* تحکیم یا انتقال با ارائه گواهی</b>
                <HelpPopup>
                    امتیاز فقط به تدریس در دوره های مقدماتی و تکمیلی می باشد.
                    <br/>
                    <b>*توجه : همکاری در تصحیح اوراق امتیاز ندارد.</b>
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField helperText='تعداد'
                           InputProps={{endAdornment: <InputAdornment position="start">دوره</InputAdornment>}}
                           type='number'
                           name='dore'
                           value={dore}
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>
            <FileUploadBox
                uploadedFiles={q12.javab.files}
                onChange={files => dispatch(updateFiles(q12, files))}
                limitFilesCount={q12.emtiaz_karbar > 0 ? 1 : 0}/>
            <Points question={q12}/>
            {
                q12.taeed_karshenas &&
                <ObjectionBox question={q12}/>
            }<ActionButtons/>
        </>
    );
};

export default Question12;
