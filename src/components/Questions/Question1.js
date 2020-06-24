import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import {useDispatch, useSelector} from 'react-redux';
import ObjectionBox from '../ObjectionBox/ObjectionBox';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import HelpPopup from '../HelpPopup/HelpPopup';

const useStyles = makeStyles((theme) => ({
    form: {
        display       : 'flex',
        justifyContent: 'center',
        '& > *'       : {
            margin: theme.spacing(1),
            width : '25ch'
        }
    },

    button          : {
        marginTop  : theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    actionsContainer: {
        marginBottom: theme.spacing(2)
    }
}));
const Question1 = () => {
    const q1 = useSelector(state => state.form.questions[0]);
    const sal   = q1.javab.sal || '',
          mah   = q1.javab.mah || '',
          hafte = q1.javab.hafte || '';
    const classes = useStyles();
    const dispatch = useDispatch();


    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        const newSal = name === 'sal' ? +value : sal;
        const newMah = name === 'mah' ? +value : mah;
        const newHafte = name === 'hafte' ? +value : hafte;
        dispatch(updateQuestion(q1, {
            javab        : {
                ...q1.javab,
                [name]: value
            },
            emtiaz_karbar: +newSal * 12 + +newMah + +newHafte * .25
        }));
    };
    return (
        <>

            <Typography style={{lineHeight: 1.7}}>
                تجربه ی آموزشی و اداری تمام وقت قابل قبول در ترفیع (به استثناء دوران تحصیل در دانشسراها و
                مراکز تربیت معلم یا تربیت دبیر، مدت مرخصی بدون حقوق، انفصال از خدمت و ...) تا شهریور ماه سال
                تحصیلی جاری هر سال (12) امتیاز هر ماه (1) امتیاز و هر هفته (0.25) امتیاز
                <br/>
                <b>حکم کارگزینی بارگذاری شود</b>
                <HelpPopup>
                    نیروهای حق التدریس نیازی به بارگذاری حکم نیست
                </HelpPopup>
            </Typography>

            <form className={classes.form}>

                <TextField type='number'
                           name='sal'
                           InputProps={{endAdornment: <InputAdornment position="start">سال</InputAdornment>}}
                           value={sal}
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField type='number'
                           name='mah'
                           InputProps={{endAdornment: <InputAdornment position="start">ماه</InputAdornment>}}
                           value={mah}
                           onChange={handleChange}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
                <TextField type='number'
                           InputProps={{endAdornment: <InputAdornment position="start">هفته</InputAdornment>}}
                           name='hafte'
                           onChange={handleChange}
                           value={hafte}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>
            </form>

            <FileUploadBox
                uploadedFiles={q1.javab.files}
                onChange={files => dispatch(updateFiles(q1, files))}
                limitFilesCount={q1.emtiaz_karbar > 0 ? 1 : 0}/>

            <Points question={q1}/>

            {
                q1.taeed_karshenas &&
                <ObjectionBox question={q1}/>
            }


            <ActionButtons isFirst/>
        </>
    );
};

export default Question1;
