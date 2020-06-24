import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
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
const Question6 = () => {
    const q6 = useSelector(state => state.form.questions[5]);
    const isMale = useSelector(state => state.user.user.user.gender) === 'M';
    const mah = q6.javab.mah || '';
    const mahHamsar = q6.javab.mahHamsar || '';
    const dispatch = useDispatch();
    const classes = useStyles();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;


        const newMah = name === 'mah' ? +value : mah;
        const newMahHamsar = name === 'mahHamsar' ? +value : mahHamsar;
        let calcPoint = +newMah * 2 >= 10 ? 10 : +newMah * 2;

        if (!isMale)
            calcPoint += +newMahHamsar * .5 >= 5 ? 5 : +newMahHamsar * .5;

        dispatch(updateQuestion(q6, {
            javab        : {
                ...q6.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint
        }));
    };

    const onFileChange = files => dispatch(updateFiles(q6, files));
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر ماه خدمت داوطلبانه قبل و بعد از استخدام در جبهه های جنگ (2) امتیاز - حداکثر (10) امتیاز
                <br/>
                {
                    !isMale && <>
                        به خواهران فرهنگی به ازای هر ماه خدمت داوطلبانه ی همسرشان در جبهه های جنگ بعد از ازدواج (0.5)
                        امتیاز -
                        حداکثر (5) امتیاز
                        <br/>
                    </>
                }
                * کمتر از یک ماه اعتباری ندارد.
                <br/>
                <b>ارائه گواهی از ارگان های ذی ربط ضروری است؛ خدمت نظام وظیفه و خدمت مجمع های آموزشی مستقر در مناطق
                    غیرجنگی فاقد امتیاز است.</b>
            </Typography>
            <form className={classes.form}>
                <TextField type='number'
                           InputProps={{endAdornment: <InputAdornment position="start">ماه</InputAdornment>}}
                           name='mah'
                           onChange={handleChange}
                           value={mah}
                           helperText='خدمت داوطلبانه شخص'
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                {
                    !isMale &&
                    <TextField type='number'
                               InputProps={{endAdornment: <InputAdornment position="start">ماه</InputAdornment>}}
                               name='mahHamsar'
                               onChange={handleChange}
                               value={mahHamsar}
                               helperText='خدمت داوطلبانه همسر'
                               inputProps={{
                                   onKeyPress: justPositiveNumberHandler,
                                   style     : {textAlign: 'center', direction: 'ltr'}
                               }}/>
                }


            </form>
            <FileUploadBox onChange={onFileChange}
                           uploadedFiles={q6.javab.files}
                           limitFilesCount={q6.emtiaz_karbar > 0 ? 2 : 0}/>
            <Points question={q6}/>

            {
                q6.taeed_karshenas &&
                <ObjectionBox question={q6}/>
            }

            <ActionButtons/>
        </>
    );
};

export default Question6;
