import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {useDispatch, useSelector} from 'react-redux';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
import ObjectionBox from '../ObjectionBox/ObjectionBox';
import HelpPopup from '../HelpPopup/HelpPopup';

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
const Question9 = () => {
    const q9 = useSelector(state => state.form.questions[8]);
    const selected = q9.javab.selected || 0;
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateQuestion(q9, {
            javab        : {
                ...q9.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint(+value)
        }));
    };
    const calcPoint = (selected) => {
        switch (selected) {
            case 1:
            case 2:
            case 3:
            case 4:
                return 12;
            default:
                return 0;
        }
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به پدر، مادر، فرزند، همسر شهداء و اسراء و مفقودالاثرها با ارئه مدرک تایید شده از سوی بنیاد شهید انقلاب
                اسلامی (12) امتیاز تعلق می گیرد
                <HelpPopup>
                    گواهی از بنیاد شهید انقلاب اسلامی ضمیمه شود
                </HelpPopup>
            </Typography>
            <FormControl className={classes.formControl}>
                <Select
                    value={selected}
                    name='selected'
                    onChange={handleChange}>
                    <MenuItem value={0}>هیچکدام</MenuItem>
                    <MenuItem value={1}>پدر</MenuItem>
                    <MenuItem value={2}>مادر</MenuItem>
                    <MenuItem value={3}>فرزند</MenuItem>
                    <MenuItem value={4}>همسر</MenuItem>
                </Select>
            </FormControl>

            <FileUploadBox
                uploadedFiles={q9.javab.files}
                onChange={files => dispatch(updateFiles(q9, files))}
                limitFilesCount={q9.emtiaz_karbar > 0 ? 1 : 0}/>

            <Points question={q9}/>

            {
                q9.taeed_karshenas &&
                <ObjectionBox question={q9}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question9;
