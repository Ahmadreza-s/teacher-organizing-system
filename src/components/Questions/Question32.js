import React from 'react';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import {useSelector} from 'react-redux';
import ObjectionBox from '../ObjectionBox/ObjectionBox';
import HelpPopup from '../HelpPopup/HelpPopup';

const Question32 = () => {

    const q32 = useSelector(state => state.form.questions[31]);

    const tadrisShiftMokhalef = q32.javab.tadrisShiftMokhalef || false;

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                <b>* توجه: این امتیاز فقط سال قبل از سازماندهی محاسبه گردد</b>
                <HelpPopup>همکارانی که در سال تحصیلی 98-97 به صورت اضافه کاری تدریس داشته اند.</HelpPopup>
            </Typography>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={tadrisShiftMokhalef}
                            name="tadrisShiftMokhalef"
                            disabled
                            color='primary'/>
                    }
                    label='تدریس تمام وقت در شیفت مخالف ابتدایی'
                />
            </FormGroup>

            <Points question={q32}/>
            {
                q32.taeed_karshenas &&
                <ObjectionBox question={q32}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question32;
