import React from 'react';
import Typography from '@material-ui/core/Typography';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import HelpPopup from '../HelpPopup/HelpPopup';
import {useSelector} from 'react-redux';
import ObjectionBox from '../ObjectionBox/ObjectionBox';

const Question11 = () => {
    const q11 = useSelector(state => state.form.questions[10]);
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                به ازاء تدریس در هر پایه ی اضافی در کلاس های چندپایه به صورت موظف در هر سال تحصیلی (1) امتیاز محسوب می
                شود
                <HelpPopup>
                    امتیاز این بند از فرم سوابق شما استخراج و محاسبه می شود
                </HelpPopup>
            </Typography>

            <Points question={q11}/>
            {
                q11.taeed_karshenas &&
                <ObjectionBox question={q11}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question11;
