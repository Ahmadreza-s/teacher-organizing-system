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
const Question13 = () => {
    const classes = useStyles();
    const q13 = useSelector(state => state.form.questions[12]);
    const mantaghe = q13.javab.mantaghe || '',
          ostan    = q13.javab.ostan || '',
          vezarat  = q13.javab.vezarat || '';
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;


        const newMantaghe = name === 'mantaghe' ? +value : mantaghe;
        const newOstan = name === 'ostan' ? +value : ostan;
        const newVezarat = name === 'vezarat' ? +value : vezarat;
        let calcPoint = +newMantaghe + +newOstan * 3 + +newVezarat * 4;
        dispatch(updateQuestion(q13, {
            javab        : {
                ...q13.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint >= 20 ? 20 : calcPoint
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                تشویق فردی، آموزشی و اداری از سوی مسئولین آموزش و پرورش منطقه (1) امتیاز، استان (3) امتیاز و وزارت (4)
                امتیاز
                <br/>
                <b>حداکثر (20) امتیاز</b>
            </Typography>
            <form className={classes.form}>
                <TextField label="منطقه"
                           type='number'
                           name='mantaghe'
                           value={mantaghe}
                           helperText='تعداد تشویقی'
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField label="استانی"
                           type='number'
                           name='ostan'
                           value={ostan}
                           helperText='تعداد تشویقی'
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField label="وزارت"
                           type='number'
                           name='vezarat'
                           value={vezarat}
                           helperText='تعداد تشویقی'
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>
            <FileUploadBox
                uploadedFiles={q13.javab.files}
                onChange={files => dispatch(updateFiles(q13, files))}
                limitFilesCount={+mantaghe + +ostan + +vezarat}/>
            <Points question={q13}/>
            {
                q13.taeed_karshenas &&
                <ObjectionBox question={q13}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question13;
