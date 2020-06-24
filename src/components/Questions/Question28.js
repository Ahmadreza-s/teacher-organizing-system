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
            margin   : theme.spacing(1),
            width    : '25ch',
            marginTop: theme.spacing(3)
        }
    }
}));
const Question28 = () => {
    const q28 = useSelector(state => state.form.questions[27]);
    const tedad = q28.javab.tedad || '';

    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        const calcPoint = +value * 3;
        dispatch(updateQuestion(q28, {
            javab        : {
                ...q28.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint >= 21 ? 21 : calcPoint
        }));
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                حضور فعال در کارگاه های آموزشی به ازای هر جلسه حضور (3) امتیاز و در سال حداکثر (21) امتیاز.
                <br/>
                ارائه گواهی از مراجع ذی ربط ضروری است.
                <br/>
                <b>* توجه: این امتیاز فقط سال قبل از سازماندهی محاسبه می گردد.</b>
                <HelpPopup>
                    گواهی شرکت در کارگاه های آموزشی از تاریخ 97/7/1 تا 98/6/31 بارگذاری شود
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">جلسه</InputAdornment>}}
                           type='number'
                           name='tedad'
                           onChange={handleChange}
                           value={tedad}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>
            <FileUploadBox uploadedFiles={q28.javab.files}
                           onChange={files => dispatch(updateFiles(q28, files))}
                           limitFilesCount={q28.emtiaz_karbar > 0 ? 1 : 0}/>
            <Points question={q28}/>
            {
                q28.taeed_karshenas &&
                <ObjectionBox question={q28}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question28;
