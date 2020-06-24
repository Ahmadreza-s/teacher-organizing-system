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
            width    : '25ch',
            marginTop: theme.spacing(3)
        }
    }
}));
const Question31 = () => {
    const q31 = useSelector(state => state.form.questions[30]);
    const classes = useStyles();
    const jalase = q31.javab.jalase || '';
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const calcPoint = (+value / 12 * 2).toFixed(2);
        dispatch(updateQuestion(q31, {
            javab        : {
                ...q31.javab,
                [name]: value
            },
            emtiaz_karbar: +calcPoint
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                خیرین آموزشی به ازای هر 12 جلسه (2) امتیاز
                <br/>
                <b>* توجه: این امتیاز فقط سال قبل از سازماندهی محاسبه گردد.</b>
                <HelpPopup>
                    ارائه گواهی از مدیر دبستان در سال تحصیلی 98-97
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">جلسه</InputAdornment>}}
                           type='number'
                           name='jalase'
                           onChange={handleChange}
                           value={jalase}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>

            <FileUploadBox
                uploadedFiles={q31.javab.files}
                onChange={files => dispatch(updateFiles(q31, files))}
                limitFilesCount={q31.emtiaz_karbar > 0 ? 1 : 0}/>

            <Points question={q31}/>
            {
                q31.taeed_karshenas &&
                <ObjectionBox question={q31}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question31;
