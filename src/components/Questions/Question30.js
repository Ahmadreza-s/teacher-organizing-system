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

const Question30 = () => {
    const q30 = useSelector(state => state.form.questions[29]);
    const q29 = useSelector(state => state.form.questions[28]);

    const modakhele = q30.javab.modakhele || false;
    const beduneTekrarPayeVaTarkTahsil = q29.javab.beduneTekrarPayeVaTarkTahsil || false;

    const dispatch = useDispatch();

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.checked;
        dispatch(updateQuestion(q30, {
            javab        : {
                ...q30.javab,
                [name]: value
            },
            emtiaz_karbar: value ? 2 : 0
        }));
    };

    return (
        <>
            <Typography style={{lineHeight: 1.7}}>
                <b>طرح مداخله: ویژه دانش آموزانی که در خرداد ماه قبول نشده اند</b>
                <br/>
                <HelpPopup>
                    ارائه گواهی از مدیر دبستان در سال تحصیلی 98-97
                </HelpPopup>
            </Typography>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={modakhele}
                            onChange={handleChange}
                            name="modakhele"
                            disabled={beduneTekrarPayeVaTarkTahsil}
                            color='primary'/>
                    }
                    label="آموزگارانی که در سال قبل از سازماندهی پس از برگزاری طرح مداخله و قبولی بیش از 95 درصد دانش آموزان آن کلاس"
                />
            </FormGroup>
            <FileUploadBox
                uploadedFiles={q30.javab.files}
                onChange={files => dispatch(updateFiles(q30, files))}
                limitFilesCount={q30.emtiaz_karbar > 0 ? 1 : 0}/>
            <Points question={q30}/>
            {
                q30.taeed_karshenas &&
                <ObjectionBox question={q30}/>
            }
            <ActionButtons/>
        </>
    );
};

export default Question30;
