import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
            marginTop: theme.spacing(3),
            width    : '35ch'
        }
    }
}));
const Question22 = () => {
    const classes = useStyles();
    const q22 = useSelector(state => state.form.questions[21]);

    const talifat = q22.javab.talifat || '';
    const seminarOstani = q22.javab.seminarOstani || '';
    const seminarKeshvari = q22.javab.seminarKeshvari || '';
    const seminarBeynolmelali = q22.javab.seminarBeynolmelali || '';
    const maghaleKeshvari = q22.javab.maghaleKeshvari || '';
    const maghaleBeynolmelali = q22.javab.maghaleBeynolmelali || '';


    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const newTalifat     = name === 'talifat' ? +value : +talifat,
              newSeminarOs   = name === 'seminarOstani' ? +value : +seminarOstani,
              newSeminarKesh = name === 'seminarKeshvari' ? +value : +seminarKeshvari,
              newSeminarBey  = name === 'seminarBeynolmelali' ? +value : +seminarBeynolmelali,
              newMaghaleKesh = name === 'maghaleKeshvari' ? +value : +maghaleKeshvari,
              newMaghaleBeyn = name === 'maghaleBeynolmelali' ? +value : +maghaleBeynolmelali;

        let calcPoint = 0;
        if (newTalifat)
            calcPoint += +newTalifat * 6;
        if (newSeminarOs)
            calcPoint += +newSeminarOs * 3;
        if (newSeminarKesh)
            calcPoint += +newSeminarKesh * 6;
        if (newSeminarBey)
            calcPoint += +newSeminarBey * 9;
        if (newMaghaleKesh)
            calcPoint += +newMaghaleKesh * 3;
        if (newMaghaleBeyn)
            calcPoint += +newMaghaleBeyn * 9;


        dispatch(updateQuestion(q22, {
            javab        : {
                ...q22.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint >= 15 ? 15 : calcPoint
        }));
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                <b>حداکثر کل امتیاز : 15</b>
            </Typography>
            <form className={classes.form}>
                <TextField type='number'
                           name='talifat'
                           onChange={handleChange}
                           value={talifat}
                           helperText='تالیفات دارای شابک که در زمینه ی آموزش ابتدایی'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField type='number'
                           name='maghaleKeshvari'
                           onChange={handleChange}
                           value={maghaleKeshvari}
                           helperText="ارائه مقاله مرتبط در مجلات معتبر علمی و پژوهشی داخل کشور"
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField type='number'
                           name='maghaleBeynolmelali'
                           onChange={handleChange}
                           value={maghaleBeynolmelali}
                           helperText="ارائه مقاله مرتبط در مجلات معتبر علمی و پژوهشی بین المللی"
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField type='number'
                           name='seminarOstani'
                           onChange={handleChange}
                           value={seminarOstani}
                           helperText="شرکت در سمینار های استانی مرتبط با رشته شغلی"
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField type='number'
                           name='seminarKeshvari'
                           onChange={handleChange}
                           value={seminarKeshvari}
                           helperText="شرکت در سمینار های کشوری مرتبط با رشته شغلی"
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField type='number'
                           name='seminarBeynolmelali'
                           onChange={handleChange}
                           value={seminarBeynolmelali}
                           helperText="شرکت در سمینار های بین المللی مرتبط با رشته شغلی"
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>

            <FileUploadBox
                uploadedFiles={q22.javab.files}
                onChange={files => dispatch(updateFiles(q22, files))}
                limitFilesCount={+talifat + +seminarOstani + +seminarKeshvari + +seminarBeynolmelali + +maghaleKeshvari + +maghaleBeynolmelali}/>
            <Points question={q22}/>
            {
                q22.taeed_karshenas &&
                <ObjectionBox question={q22}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question22;
