import React from 'react';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import {useDispatch, useSelector} from 'react-redux';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
import ObjectionBox from '../ObjectionBox/ObjectionBox';
import HelpPopup from '../HelpPopup/HelpPopup';

const Question33 = () => {
    const q33 = useSelector(state => state.form.questions[32]);
    const dispatch = useDispatch();

    const jaber = q33.javab.jaber || false;
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.checked;
        dispatch(updateQuestion(q33, {
            javab        : {
                ...q33.javab,
                [name]: value
            },
            emtiaz_karbar: value ? 2 : 0
        }));
    };
    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                <b>* توجه: این امتیاز فقط سال قبل از سازماندهی محاسبه گردد</b>
                <HelpPopup>طرح جابربن حیان سال تحصیلی 98-97.</HelpPopup>
            </Typography>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={jaber}
                            onChange={handleChange}
                            name="jaber"
                            color='primary'/>
                    }
                    label='مشارکت فعال در اجرای طرح جابر بن حیان و فرصت های متنوع یادگیری'
                />
            </FormGroup>

            <FileUploadBox
                uploadedFiles={q33.javab.files}
                onChange={files => dispatch(updateFiles(q33, files))}
                limitFilesCount={q33.emtiaz_karbar > 0 ? 1 : 0}/>
            <Points question={q33}/>
            {
                q33.taeed_karshenas &&
                <ObjectionBox question={q33}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question33;
