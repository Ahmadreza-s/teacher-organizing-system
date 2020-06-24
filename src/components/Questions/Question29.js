import React from 'react';
import Points from '../Points/Points';
import ActionButtons from '../ActionButtons/ActionButtons';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FileUploadBox from '../FileUploadBox/FileUploadBox';
import HelpPopup from '../HelpPopup/HelpPopup';
import {useDispatch, useSelector} from 'react-redux';
import {updateFiles, updateQuestion} from '../../redux/form/form.actions';
import ObjectionBox from '../ObjectionBox/ObjectionBox';

const Question29 = () => {
    const q29 = useSelector(state => state.form.questions[28]);
    const q30 = useSelector(state => state.form.questions[29]);

    const modakhele = q30.javab.modakhele || false;
    const beduneTekrarPayeVaTarkTahsil = q29.javab.beduneTekrarPayeVaTarkTahsil || false;

    const dispatch = useDispatch();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.checked;
        dispatch(updateQuestion(q29, {
            javab        : {
                ...q29.javab,
                [name]: value
            },
            emtiaz_karbar: value ? 5 : 0
        }));
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                <br/>
                <HelpPopup>
                    ارائه گواهی از مدیر دبستان در سال تحصیلی 98-97
                </HelpPopup>
            </Typography>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={beduneTekrarPayeVaTarkTahsil}
                            onChange={handleChange}
                            name="beduneTekrarPayeVaTarkTahsil"
                            disabled={modakhele}
                            color='primary'/>
                    }
                    label="آموزگارانی که در سال تحصیلی قبل از سازماندهی کلاس بدون تکرار پایه و ترک تحصیل داشته باشند."
                />
            </FormGroup>
            <FileUploadBox
                uploadedFiles={q29.javab.files}
                onChange={files => dispatch(updateFiles(q29, files))}
                limitFilesCount={q29.emtiaz_karbar > 0 ? 1 : 0}/>
            <Points question={q29}/>
            {
                q29.taeed_karshenas &&
                <ObjectionBox question={q29}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question29;
