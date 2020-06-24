import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
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
const Question27 = () => {
    const q27 = useSelector(state => state.form.questions[26]);
    const mantaghe = q27.javab.mantaghe || '',
          vezarat  = q27.javab.vezarat || '',
          ostan    = q27.javab.ostan || '';
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const newOs  = name === 'ostan' ? +value : +ostan,
              newMan = name === 'mantaghe' ? +value : +mantaghe,
              newVez = name === 'vezarat' ? +value : +vezarat;
        const calcPoint = +newMan + +newOs * 2 + +newVez * 3;
        dispatch(updateQuestion(q27, {
            javab        : {
                ...q27.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint >= 10 ? 10 : calcPoint
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                کسب رتبه اول در جشنواره الگوهای تدریس، درس پژوهی و مدیریت با ارائه گواهی لازم از منطقه یا ناحیه (1)
                امتیاز، استان (2) امتیاز و وزارت (3) امتیاز محاسبه می گردد.
                <br/>
                <b>حداکثر 10 امتیاز</b>
            </Typography>
            <form className={classes.form}>
                <TextField label="منطقه"
                           type='number'
                           name='mantaghe'
                           value={mantaghe}
                           helperText='تعداد رتبه اول'
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField label="استانی"
                           type='number'
                           name='ostan'
                           value={ostan}
                           helperText='تعداد رتبه اول'
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField label="وزارت"
                           type='number'
                           name='vezarat'
                           value={vezarat}
                           helperText='تعداد رتبه اول'
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>
            <FileUploadBox
                uploadedFiles={q27.javab.files}
                onChange={files => dispatch(updateFiles(q27, files))}
                limitFilesCount={+mantaghe + +ostan + +vezarat}/>
            <Points question={q27}/>
            {
                q27.taeed_karshenas &&
                <ObjectionBox question={q27}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question27;
