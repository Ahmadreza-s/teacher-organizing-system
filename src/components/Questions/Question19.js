import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {useDispatch, useSelector} from 'react-redux';
import {updateQuestion} from '../../redux/form/form.actions';
import ObjectionBox from '../ObjectionBox/ObjectionBox';

const useStyles = makeStyles((theme) => ({
    formControl: {
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
        '& > *'       : {
            margin: theme.spacing(1),
            width : '100ch'
        }
    }
}));
const Question19 = () => {
    const classes = useStyles();
    const q19 = useSelector(state => state.form.questions[18]);
    const selected = q19.javab.selected || 0;
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateQuestion(q19, {
            javab        : {
                ...q19.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint(+value)
        }));
    };
    let calcPoint = (selected) => {
        switch (selected) {
            case 1:
                return 24;
            case 2:
                return 36;
            case 3:
                return 32;
            case 4:
                return 50;
            case 5:
                return 42;
            case 6:
                return 60;
            case 7:
                return 54;
            case 8:
                return 70;
            case 9:
                return 64;
            default:
                return 0;
        }
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                آخرین مدرک تحصیلی
            </Typography>
            <FormControl className={classes.formControl}>
                <Select
                    value={selected}
                    name={'selected'}
                    onChange={handleChange}>
                    <MenuItem value={0}>هیچکدام</MenuItem>
                    <MenuItem value={1}>
                        پایان تحصیلات متوسطه نظام قدیم و جدید و معادل آن، دیپلم دانشسرای نظام قدیم و جدید
                    </MenuItem>
                    <MenuItem value={2}>
                        مدرک تحصیلی پایه دوره ی کاردانی (فوق دیپلم) یا معادل آن در رشته ی آموزش ابتدایی
                    </MenuItem>
                    <MenuItem value={3}>
                        مدرک تحصیلی پایان دوره ی کاردانی (فوق دیپلم) یا معادل آن در سایر رشته ها
                    </MenuItem>
                    <MenuItem value={4}>
                        مدرک تحصیلی پایان دوره ی لیسانس در رشته ی آموزش ابتدایی و علوم تربیتی با گرایش دبستانی و پیش
                        دبستانی مشروط بر اشتغال در دوره ی لیسانس در دوره ی ابتدایی و قبل از دبستان
                    </MenuItem>
                    <MenuItem value={5}>
                        مدرک تحصیلی پایان دوره ی لیسانس یا معادل آن در سایر رشته ها
                    </MenuItem>
                    <MenuItem value={6}>
                        مدرک تحصیلی پایان دوره ی فوق لیسانس در رشته ی آموزش ابتدایی و علوم تربیتی با گرایش دبستانی و پیش
                        دبستانی مشروط بر اشتغال در دوره ی ابتدایی
                    </MenuItem>
                    <MenuItem value={7}>
                        مدرک پایان دوره ی فوق لیسانس و یا معادل آن در سایر رشته ها
                    </MenuItem>
                    <MenuItem value={8}>
                        مدرک تحصیلی پایان دوره ی دکترا در رشته ی آموزش ابتدایی و علوم تربیتی با گرایش دبستانی و پیش
                        دبستانی مشروط بر اشتغال در دوره ی ابتدایی
                    </MenuItem>
                    <MenuItem value={9}>
                        مدرک تحصیلی پایان دوره ی دکترا و یا معادل سایر رشته ها
                    </MenuItem>

                </Select>
            </FormControl>
            <Points question={q19}/>
            {
                q19.taeed_karshenas &&
                <ObjectionBox question={q19}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question19;
