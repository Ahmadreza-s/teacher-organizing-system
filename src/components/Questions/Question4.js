import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import justPositiveNumberHandler from '../../utilities/justIntegerNumberHandler';
import HelpPopup from '../HelpPopup/HelpPopup';
import {useDispatch, useSelector} from 'react-redux';
import {updateQuestion} from '../../redux/form/form.actions';
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
const Question4 = () => {
    const q4 = useSelector(state => state.form.questions[3]);
    const sal = q4.javab.sal || '';
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        let calcPoint = +value * 3;
        if (+value > 5)
            calcPoint += (+value - 5) * 6;
        dispatch(updateQuestion(q4, {
            javab        : {
                ...q4.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint
        }));
    };

    return (
        <>

            <Typography style={{lineHeight: 1.7}}>
                به ازای هر سال خدمت داوطلبانه در مناطق جنگی یا محروم بعد از پیروزی انقلاب اسلامی و پس از استخدام،
                برای
                افراد غیر بومی (3) امتیاز
                <br/>
                <b>امتیاز مناطق جنگی تا پایان شهریور ماه سال 1367 قابل احتساب است</b>
                <br/>
                این امتیاز به همسران افراد مشمول این بند که به تبعیت از همسر به منطقه ی جنگی یا محروم انتقال یافته
                اند
                در صورتی که بومی یا استخدامی آن منطقه نباشند، تعلق نمیگیرد؛ کمتر از 6 ماه امتیاز ندارد. به افراد
                غیربومی
                که از سهمیه استخدامی مناطق محروم یا جنگی استفاده نموده اند پس از اتمام تعهد (5 سال) به ازای هر سال
                خدمت
                مازاد بر تعهد (6) امتیاز تعلق میگیرد
                <HelpPopup>
                    مدارس شهرستان گتوند جزو مناطق جنگی یا محروم محسوب نمی شود.
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField type='number'
                           InputProps={{endAdornment: <InputAdornment position="start">سال</InputAdornment>}}
                           name='sal'
                           onChange={handleChange}
                           value={sal}
                           inputProps={{
                               onKeyPress: justPositiveNumberHandler,
                               style     : {textAlign: 'center', direction: 'ltr'}
                           }}/>

            </form>

            <Points question={q4}/>

            {
                q4.taeed_karshenas &&
                <ObjectionBox question={q4}/>
            }<ActionButtons/>
        </>
    );
};

export default Question4;
