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
            margin: theme.spacing(1),
            width : '25ch'
        }
    }
}));
const Question16 = () => {
    const q16 = useSelector(state => state.form.questions[15]);
    const takafol = q16.javab.takafol || '';
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateQuestion(q16, {
            javab        : {
                ...q16.javab,
                [name]: value
            },
            emtiaz_karbar: +value * 2
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به کسانی که تکفل یا سرپرسی پدر، مادر یا خواهر و برادران صغار خود را برعهده دارند به ازای هر نفر (2)
                امتیاز تعلق میگیرد
                <br/>
                <b>ارائه گواهی از مراجع قضایی الزامی است</b>
            </Typography>
            <form className={classes.form}>
                <TextField InputProps={{endAdornment: <InputAdornment position="start">نفر</InputAdornment>}}
                           type='number'
                           name='takafol'
                           value={takafol}
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>
            <FileUploadBox
                uploadedFiles={q16.javab.files}
                onChange={files => dispatch(updateFiles(q16, files))}
                limitFilesCount={+takafol}/>
            <Points question={q16}/>
            {
                q16.taeed_karshenas &&
                <ObjectionBox question={q16}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question16;
