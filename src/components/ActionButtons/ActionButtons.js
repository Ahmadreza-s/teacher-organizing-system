import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import {nextStep, prevStep} from '../../redux/step/step.actions';

const useStyles = makeStyles((theme) => ({

    button          : {
        marginTop  : theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    actionsContainer: {
        marginBottom: theme.spacing(2)
    }
}));
const ActionButtons = ({isFirst = false, isLast = false}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <div className={classes.actionsContainer}>
            <div>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(nextStep())}
                    className={classes.button}>
                    {
                        isLast ? 'اتمام' : 'بعدی'
                    }
                </Button>
                {
                    !isFirst &&
                    <Button
                        onClick={() => dispatch(prevStep())}
                        className={classes.button}>
                        قبلی
                    </Button>
                }
            </div>
        </div>
    );
};


export default ActionButtons;
