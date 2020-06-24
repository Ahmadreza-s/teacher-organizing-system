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
const Question21 = () => {
    const classes = useStyles();

    const q21 = useSelector(state => state.form.questions[20]);
    const saat = q21.javab.saat || '';

    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const calcPoint = +((+value / 30).toFixed(2));

        dispatch(updateQuestion(q21, {
            javab        : {
                ...q21.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint >= 15 ? 15 : calcPoint
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر 30 ساعت کارآموزی و بازآموزی که مرتبط با تدریس یا مدیریت یا معاونت مدارس بوده و به تایید وزارت
                متبوع یا اداره کل آموزش و پرورش استان رسیده باشد، (1) امتیاز - حداکثر (15) امتیاز
                <br/>
                <b>توجه : امتیاز دوره ی کارآموزی به دوره هایی که بر طبق مجوز اداره ی کل تربیت معلم در 3 سال قبل از
                    سازماندهی تشکیل شده باشند تعلق میگیرد.</b>
                <HelpPopup>
                    تصویر دوره های ضمن خدمت از تاریخ 96/7/1 تا 99/4/20 بارگذاری شود
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">ساعت</InputAdornment>}}
                           type='number'
                           name='saat'
                           onChange={handleChange}
                           value={saat}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>

            <FileUploadBox
                uploadedFiles={q21.javab.files}
                onChange={files => dispatch(updateFiles(q21, files))}/>
            <Points question={q21}/>
            {
                q21.taeed_karshenas &&
                <ObjectionBox question={q21}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question21;
