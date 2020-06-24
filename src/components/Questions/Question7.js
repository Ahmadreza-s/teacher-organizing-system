import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
import {useDispatch, useSelector} from 'react-redux';
import ObjectionBox from '../ObjectionBox/ObjectionBox';
import HelpPopup from '../HelpPopup/HelpPopup';

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
const Question7 = () => {
    const q7 = useSelector(state => state.form.questions[6]);
    const darsad = q7.javab.darsad || '';
    const darsadHamsar = q7.javab.darsadHamsar || '';
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        let value = e.target.value;
        if (+value > 70)
            value = 70;

        const newDarsad = name === 'darsad' ? +value : darsad;
        const newDarsadHamsar = name === 'darsadHamsar' ? +value : darsadHamsar;
        let calcDarsadHamsar = +((+newDarsadHamsar / 10 * 2).toFixed(2));
        const calcPoint = +newDarsad + (calcDarsadHamsar >= 12 ? 12 : calcDarsadHamsar);
        dispatch(updateQuestion(q7, {
            javab        : {
                ...q7.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint
        }));
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                برای جانبازان فرهنگی معادل درصد جانبازی آنان بر اساس گواهی از بنیاد جانبازان، امتیاز منظور میگردد.
                <br/>
                برای همسران جانبازان به ازای هر 10 درصد جانبازی همسرشان (2) امتیاز - حداکثر (12) امتیاز منظور
                میگردد.
                <br/>
                <b>ارائه گواهی بنیاد جانبازان ضروری می باشد</b>
                <HelpPopup>
                    درصورتی که همسر همکار جانباز باشد ، اطلاعات وی را وارد کنید و مدارک مودرنظر را بارگذاری کنید
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField type='number'
                           InputProps={{endAdornment: <InputAdornment position="start">درصد</InputAdornment>}}
                           name='darsad'
                           onChange={handleChange}
                           value={darsad}
                           helperText='جانبازی شخص'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>

                <TextField type='number'
                           InputProps={{endAdornment: <InputAdornment position="start">درصد</InputAdornment>}}
                           name='darsadHamsar'
                           onChange={handleChange}
                           value={darsadHamsar}
                           helperText='جانبازی همسر'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>

            </form>
            <FileUploadBox
                uploadedFiles={q7.javab.files}
                onChange={files => dispatch(updateFiles(q7, files))}
                limitFilesCount={q7.emtiaz_karbar > 0 ? 1 : 0}/>
            <Points question={q7}/>

            {
                q7.taeed_karshenas &&
                <ObjectionBox question={q7}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question7;
