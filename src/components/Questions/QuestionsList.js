import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Badge from '@material-ui/core/Badge';
import StepContent from '@material-ui/core/StepContent';
import UploadProgressDialog from '../UploadProgressDialog/UploadProgressDialog';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {useDispatch, useSelector} from 'react-redux';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import {setActiveStep} from '../../redux/step/step.actions';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import Question5 from './Question5';
import Question6 from './Question6';
import Question7 from './Question7';
import Question8 from './Question8';
import Question9 from './Question9';
import Question10 from './Question10';
import Question11 from './Question11';
import Question12 from './Question12';
import Question13 from './Question13';
import Question14 from './Question14';
import Question15 from './Question15';
import Question16 from './Question16';
import Question17 from './Question17';
import Question18 from './Question18';
import Question19 from './Question19';
import Question20 from './Question20';
import Question21 from './Question21';
import Question22 from './Question22';
import Question23 from './Question23';
import Question24 from './Question24';
import Question25 from './Question25';
import Question26 from './Question26';
import Question27 from './Question27';
import Question28 from './Question28';
import Question29 from './Question29';
import Question30 from './Question30';
import Question31 from './Question31';
import Question32 from './Question32';
import Question33 from './Question33';
import Question34 from './Question34';
import PrintDialog from '../Print/PrintDialog';

import TableChartRoundedIcon from '@material-ui/icons/TableChartRounded';

const QuestionsList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user.user);
    const questions = useSelector(state => state.form.questions);
    const points = questions.length > 0 ? questions.map(q => {
        return {
            id              : q.id,
            emtiaz_karbar   : q.emtiaz_karbar,
            emtiaz_karshenas: q.emtiaz_karshenas,
            taeed_karshenas : q.taeed_karshenas
        };
    }) : [];
    const [startSendingData, setStartSendingData] = React.useState(false);
    const [snackbarState, setSnackbarState] = React.useState({
        open    : false,
        message : '',
        severity: 'success'
    });


    //age index = -1 bud yani mikhad shorou kone
    //age index > length bud yani tamum karde
    const activeStep = useSelector(state => state.step);


    const snackbarHandleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarState(prev => ({...prev, open: false}));
    };

    const onAbortHandler = (isCancel, message) => {
        setStartSendingData(false);
        setSnackbarState({
            open    : true,
            message : isCancel ? 'ارسال فرم توسط کاربر لغو شد !' : 'ارسال فرم با خطا مواجه شده است ! لطفاً به کارشناس اطلاع دهید',
            severity: isCancel ? 'warning' : 'error'
        });
        console.log(message);
    };
    const onCompletedHandler = () => {
        setPrintDialogShow(true);
        dispatch(setActiveStep(-1));
        setStartSendingData(false);
        setSnackbarState({
            open    : true,
            message : 'فرم شما با موفقیت ارسال شد',
            severity: 'success'
        });
    };

    const hasErrorBadge = index => points.length > 0 ? points[index].taeed_karshenas && points[index].emtiaz_karshenas !== points[index].emtiaz_karbar : false;
    const badgeContent = index => points.length > 0 ? points[index].emtiaz_karbar > 0 && `(${points[index].emtiaz_karbar})` : null;

    const [printDialogShow, setPrintDialogShow] = React.useState(false);
    const steps = [
        {
            title    : 'تجربه ی آموزشی و اداری',
            component: <Question1/>
        },
        {
            title    : 'خدمت آموزشی در روستا',
            component: <Question2/>
        },
        {
            title    : 'بیتوته',
            component: <Question3/>
        },
        {
            title    : 'خدمت داوطلبانه در مناطق جنگی یا محروم',
            component: <Question4/>
        },
        {
            title    : 'خدمت تمام وقت در اداره آموزش و پرورش',
            component: <Question5/>
        },
        {
            title    : 'خدمت داوطلبانه در جبهه های جنگ',
            component: <Question6/>
        },
        {
            title    : 'جانبازان فرهنگی',
            component: <Question7/>
        },
        {
            title    : 'اسارت آزاده',
            component: <Question8/>
        },
        {
            title    : 'پدر، مادر، فرزند یا همسر شهداء، اسراء و مفقودالاثرها',
            component: <Question9/>
        },
        {
            title    : 'تدریس در پایه های اول و ششم - تدریس در پایه های دوم تا پنجم',
            component: <Question10/>
        },
        {
            title    : 'تدریس پایه ی اضافی در کلاس های چندپایه',
            component: <Question11/>
        },
        {
            title    : 'همکاری با اداره سواد آموزی',
            component: <Question12/>
        },
        {
            title    : 'تشویقی فردی آموزشی ، اداری',
            component: <Question13/>
        },
        {
            title    : 'تاهل - حضانت فرزندان',
            component: <Question14/>
        },
        {
            title    : 'فرزندان تحت تکفل طبق شناسنامه',
            component: <Question15/>
        },
        {
            title    : 'تکفل یا سرپرستی',
            component: <Question16/>
        },
        {
            title    : 'مدیریت یا معاونت',
            component: <Question17/>
        },
        {
            title    : 'معلم راهنمای شهری - راهبر آموزشی',
            component: <Question18/>
        },
        {
            title    : 'مدرک تحصیلی',
            component: <Question19/>
        },
        {
            title    : 'محل اخذ مدرک',
            component: <Question20/>
        },
        {
            title    : 'کارآموزی و بازآموزی',
            component: <Question21/>
        },
        {
            title    : 'فعالیت های پژوهشی',
            component: <Question22/>
        },
        {
            title    : 'مدیریت مجتمع شهری یا روستایی',
            component: <Question23/>
        },
        {
            title    : 'فعالیت در گروه های آموزشی',
            component: <Question24/>
        },
        {
            title    : 'کسب عنوان معلم نمونه',
            component: <Question25/>
        },
        {
            title    : 'دوره ی مدرسی مربوط به دوره ی ابتدایی',
            component: <Question26/>
        },
        {
            title    : 'جشنواره الگوهای مناسب تدریس، درس پژوهی و مدیریت',
            component: <Question27/>
        },
        {
            title    : 'حضور فعال در کارگاه های آموزشی',
            component: <Question28/>
        },
        {
            title    : 'کلاس بدون تکرار پایه و ترک تحصیل',
            component: <Question29/>
        },
        {
            title    : 'طرح مداخله و قبولی بیش از 95 درصد دانش آموزان',
            component: <Question30/>
        },
        {
            title    : 'خیرین آموزشی',
            component: <Question31/>
        },
        {
            title    : 'تدریس تمام وقت در شیفت مخالف',
            component: <Question32/>
        },
        {
            title    : 'طرح جابر بن حیان و فرصت های متنوع یادگیری',
            component: <Question33/>
        },
        {
            title    : 'غیبت غیر موجه',
            component: <Question34/>
        }
    ];
    return (
        <div>
            <Typography style={{textAlign: 'justify', marginTop: '20px', marginBottom: '20px'}}>
                اینجانب <b>{`${user.first_name} ${user.last_name}`}</b> فرزند <b>{user.father}</b> با کد
                پرسنلی <b>{user.username}</b> شاغل در
                پست <b>آموزگاری</b> اداره آموزش و پرورش شهرستان <b>گتوند</b> با مطالعه ی کامل موارد ضوابط
                امتیازبندی شرعاً
                و قانوناً متعهد گردیدم که سوالات زیر را به طور صحیح پاسخ داده، مدارک لازم را به ضمیمه در
                مهلت مقرر بارگذاری و ارسال نمایم تا توسط مسئول بلافصل امور اداری اداره متبوع بررسی شود. چنانچه خلاف
                موارد زیر ثابت شود یا مدارک لازم ضمیمه نباشد اداره متبوع حق دارد محل خدمت اینجانب را به طریق مقتضی تعیین
                و ابلاغ صادر نماید و حق هیچگونه اعتراضی نخواهم داشت.
            </Typography>
            {
                activeStep === -1 &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20}}>
                    <Button size='large'
                            color='primary'
                            variant='contained'
                            fullWidth
                            onClick={() => dispatch(setActiveStep(0))}>
                        شروع
                    </Button>
                </div>
            }
            <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
                {
                    steps.map((step, index) =>
                        <Step key={index}>
                            <StepLabel style={{cursor: 'pointer'}}
                                       onClick={() => dispatch(setActiveStep(index))}
                                       error={hasErrorBadge(index)}>
                                <Badge badgeContent={badgeContent(index)}>
                                    {step.title}
                                </Badge>
                            </StepLabel>
                            <StepContent>
                                {step.component}
                            </StepContent>
                        </Step>
                    )
                }


            </Stepper>

            <div style={{
                display       : 'flex',
                justifyContent: 'center',
                alignItems    : 'center',
                flexDirection : 'column',
                marginTop     : 20,
                marginBottom  : 20
            }}>
                <Button size='large'
                        style={{marginBottom: 20}}
                        color='secondary'
                        variant='contained'
                        startIcon={<SendRoundedIcon/>}
                        onClick={() => setStartSendingData(true)}>
                    ثبت / ویرایش فرم
                </Button>

                <Button variant='outlined'
                        color='primary'
                        startIcon={<TableChartRoundedIcon/>}
                        onClick={() => setPrintDialogShow(true)}>
                    نمایش فرم به صورت خلاصه
                </Button>
                {
                    printDialogShow && <PrintDialog onClose={() => setPrintDialogShow(false)}/>
                }

                {
                    startSendingData &&
                    <UploadProgressDialog
                        onAbort={onAbortHandler}
                        onCompleted={onCompletedHandler}/>
                }
            </div>
            <Snackbar
                id={'snackbar'}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={snackbarState.open}
                autoHideDuration={6000}
                onClose={snackbarHandleClose}>
                <MuiAlert elevation={6}
                          severity={snackbarState.severity}
                          variant="filled">
                    {snackbarState.message}
                </MuiAlert>
            </Snackbar>

        </div>
    );
};

export default QuestionsList;
