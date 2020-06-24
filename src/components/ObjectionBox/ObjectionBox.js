import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {objectionRequest} from '../../apis/form';
import {useDispatch} from 'react-redux';
import {updateQuestion} from '../../redux/form/form.actions';

const useStyles = makeStyles((theme) => ({
    root   : {
        width         : '100%',
        display       : 'flex',
        justifyContent: 'center'
    },
    heading: {
        fontSize  : theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

const ObjectionBox = ({question}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [matn, setMatn] = React.useState(question.matn_eteraz || '');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [completed, setCompleted] = React.useState(false);
    const objectionRequestHandler = async () => {
        setLoading(true);
        setError(null);
        setCompleted(false);

        try {
            await objectionRequest(question.id, matn);
            dispatch(updateQuestion(question, {
                matn_eteraz: matn,
                eteraz     : true
            }));
            setCompleted(true);
        } catch (e) {
            setError('خطا در ارسال اعتراض ...');
            console.log(e);
        } finally {
            setLoading(false);
        }

    };
    return (
        <div className={classes.root}>
            <ExpansionPanel style={{width: '30%'}}>
                <ExpansionPanelSummary style={{backgroundColor: '#ccc'}}
                                       expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>اعتراض به امتیاز</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{flexDirection: 'column', alignItems: 'center'}}>
                    <TextField
                        style={{marginTop: '5px', width: '100%'}}
                        label="متن اعتراض"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={matn}
                        onChange={e => {
                            setCompleted(false);
                            setMatn(e.target.value);
                        }}
                        disabled={loading}
                        error={!!error}
                        helperText={error ? error : null}/>

                    <Button
                        style={{marginTop: '10px'}}
                        variant='contained'
                        color='primary'
                        disabled={loading || completed}
                        onClick={objectionRequestHandler}>
                        {
                            loading ? 'در حال ارسال ...' : completed ? 'اعتراض شما ثبت شد' : 'ثبت اعتراض'
                        }
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};
export default React.memo(ObjectionBox, (prev, next) => prev.question.id === next.question.id && prev.question.matn_eteraz === next.question.matn_eteraz);
