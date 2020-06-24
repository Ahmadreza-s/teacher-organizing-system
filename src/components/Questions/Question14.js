import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import HelpPopup from '../HelpPopup/HelpPopup';
import {useDispatch, useSelector} from 'react-redux';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
import ObjectionBox from '../ObjectionBox/ObjectionBox';
import FileUploadBox from '../FileUploadBox/FileUploadBox';

const useStyles = makeStyles((theme) => ({
    formControl: {
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
        '& > *'       : {
            margin: theme.spacing(1),
            width : '30ch'
        }
    }
}));
const Question14 = () => {

    const q14 = useSelector(state => state.form.questions[13]);
    const selected = q14.javab.selected || 0;
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateQuestion(q14, {
            javab        : {
                ...q14.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint(+value)
        }));
    };
    const calcPoint = (selected) => {
        switch (selected) {
            case 1:
                return 6;
            case 2:
                return 10;
            default:
                return 0;
        }
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                تاهل (6) امتیاز - افرادی که به دلیلی فاقد همسر بوده و حضانت فرزندان خود را به عهده دارند (10) امتیاز
                <br/>
                <b>همکاران رسمی و پیمانی نیازی به بارگذاری مدرک ندارند</b>
                <HelpPopup>
                    صفحه دوم شناسنامه بارگذاری شود
                </HelpPopup>
            </Typography>
            <FormControl className={classes.formControl}>
                <Select
                    value={selected}
                    name='selected'
                    onChange={handleChange}>
                    <MenuItem value={0}>هیچکدام</MenuItem>
                    <MenuItem value={1}>تاهل</MenuItem>
                    <MenuItem value={2}>حضانت فرزندان</MenuItem>
                </Select>
            </FormControl>
            <FileUploadBox
                uploadedFiles={q14.javab.files}
                onChange={files => dispatch(updateFiles(q14, files))}
                limitFilesCount={q14.emtiaz_karbar > 0 ? 1 : 0}/>
            <Points question={q14}/>
            {
                q14.taeed_karshenas &&
                <ObjectionBox question={q14}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question14;
