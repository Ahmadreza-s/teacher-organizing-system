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
const Question20 = () => {
    const classes = useStyles();
    const q20 = useSelector(state => state.form.questions[19]);
    const selected = q20.javab.selected || 0;
    const dispatch = useDispatch();
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(updateQuestion(q20, {
            javab        : {
                ...q20.javab,
                [name]: value
            },
            emtiaz_karbar: calcPoint(+value)
        }));
    };
    let calcPoint = (selected) => {
        switch (selected) {
            case 1:
                return 3;
            case 2:
                return 6;
            case 3:
                return 9;
            default:
                return 0;
        }
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                دوره های تربیت معلم یا دانشگاه فرهنگیان
            </Typography>
            <FormControl className={classes.formControl}>
                <Select
                    name='selected'
                    value={selected}
                    onChange={handleChange}>
                    <MenuItem value={0}>هیچکدام</MenuItem>
                    <MenuItem value={1}>
                        دوره ی تربیت معلم دانشسرای دوساله و چهارساله قبل از دیپلم که منجر به اخذ مدرک دیپلم دانشسرا شده
                        باشد
                    </MenuItem>
                    <MenuItem value={2}>
                        دوره فوق دیپلم مراکز تربیت معلم
                    </MenuItem>
                    <MenuItem value={3}>
                        دوره ی کارشناسی دانشگاه فرهنگیان
                    </MenuItem>

                </Select>
            </FormControl>
            <Points question={q20}/>
            {
                q20.taeed_karshenas &&
                <ObjectionBox question={q20}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question20;
