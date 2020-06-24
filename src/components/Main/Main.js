import React from 'react';
import Typography from '@material-ui/core/Typography';
import QuestionsList from '../Questions/QuestionsList';
import {useSelector} from 'react-redux';


function Main() {
    const pointsArray = useSelector(state => state.form.questions.map(q => q.emtiaz_karbar));
    let totalPoints = 0;
    pointsArray.forEach(p => totalPoints += p);
    return (
        <div>
            <Typography style={{textAlign: 'center'}} variant='h5'>
                پرسشنامه ی محاسبه ی امتیازات کارکنان وزارت آموزش و پرورش (دوره ابتدایی)
            </Typography>
            <QuestionsList/>
            <p style={{marginTop: '20px', textAlign: 'center'}}>
                مجموع امتیاز های حساب شده کاربر : {totalPoints}
            </p>
        </div>
    );
}

export default Main;
