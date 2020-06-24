import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import InputAdornment from '@material-ui/core/InputAdornment';
import HelpPopup from '../HelpPopup/HelpPopup';

import {useSelector} from 'react-redux';
import ObjectionBox from '../ObjectionBox/ObjectionBox';

const useStyles = makeStyles((theme) => ({
    form: {
        display       : 'flex',
        justifyContent: 'center',
        '& > *'       : {
            margin   : theme.spacing(1),
            marginTop: theme.spacing(3),
            width    : '25ch'
        }
    }
}));
const Question3 = () => {
    const classes = useStyles();
    const q3 = useSelector(state => state.form.questions[2]);
    const {sal} = q3.javab;
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازای هر سال بیتوته کامل در روستا برای افراد غیربومی (4) امتیاز، محاسبه می شود
                <HelpPopup>
                    امتیاز این بند از فرم سوابق شما استخراج و محاسبه می شود
                    <br/>
                    <b>* توجه : هیچکدام از مدارس شهرستان گتوند، امتیاز بیتوته ندارند.</b>
                </HelpPopup>
            </Typography>
            <form className={classes.form}>
                <TextField type='number'
                           name='sal'
                           value={sal}
                           variant='outlined'
                           InputProps={{
                               readOnly    : true,
                               endAdornment: <InputAdornment position="start">سال</InputAdornment>
                           }}
                           inputProps={{style: {textAlign: 'center', direction: 'ltr'}}}/>

            </form>

            <Points question={q3}/>
            {
                q3.taeed_karshenas &&
                <ObjectionBox question={q3}/>
            }<ActionButtons/>
        </>
    );
};

export default Question3;
