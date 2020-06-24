import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';

const useStyles = makeStyles((theme) => ({
    root     : {
        display       : 'flex',
        justifyContent: 'center',
        flexWrap      : 'wrap',
        listStyle     : 'none',
        padding       : theme.spacing(0.5),
        margin        : theme.spacing(4)
    },
    uploadBtn: {
        display       : 'flex',
        justifyContent: 'center',
        flexDirection : 'column',
        marginTop     : theme.spacing(2)
    },
    chip     : {
        margin: theme.spacing(0.5)
    }
}));

const FileUploadBox = ({limitFilesCount = 50, uploadedFiles, onChange}) => {
    const classes = useStyles();
    const fileUploader = React.useRef(null);
    const [files, setFiles] = React.useState(uploadedFiles || []);

    React.useEffect(() => {
        if (onChange)
            onChange(files);

    }, [files]);

    const onFileChangeHandler = e => {
        const selectedFiles = e.target.files;
        let isImageValidationOk = true;
        let isImageSizeOk = true;
        [...selectedFiles].forEach(file => {
            if (!isFileImage(file))
                isImageValidationOk = false;
            if (Math.round((file.size / 1024)) >= 4096)
                isImageSizeOk = false;
        });
        if (!isImageValidationOk) {
            alert('فایل های انتخاب شده فقط باید عکس باشند');
            return;
        }
        if (!isImageSizeOk) {
            alert('عکس های انتخاب شده باید حجمی کمتر از 4 مگابایت داشته باشند');
            return;
        }
        if ([...selectedFiles].length + files.length > limitFilesCount)
            alert('تعداد فایل های انتخاب شده بیش از حد مجاز برای این بند است');
        else
            // file haye tekrari ro ezafe nemikonim
            setFiles(prevState => {
                const fls = [];
                [...selectedFiles].forEach(file => {
                    if (!files.find(f => f.name === file.name))
                        fls.push(file);
                });
                return [...prevState, ...fls];
            });

        //fileUploader.current.value = null;
    };

    const isFileImage = file => file && file['type'].split('/')[0] === 'image';

    const onDeleteFileHandler = file => setFiles(prevFiles => prevFiles.filter(f => f.name !== file.name));
    const onClickHandler = file => {
        if (file.hasOwnProperty('full_url'))
            window.open(file.full_url, '_blank');
        else
            window.open(URL.createObjectURL(file), '_blank');
    };
    return (
        <>
            <div className={classes.uploadBtn}>
                <Button
                    style={{margin: 'auto'}}
                    disabled={limitFilesCount <= 0}
                    variant="outlined"
                    color="primary"
                    size='large'
                    onClick={() => fileUploader.current.click()}
                    startIcon={<CloudUploadIcon/>}>
                    بارگذاری مدارک
                </Button>

                <Typography variant='caption' style={{textAlign: 'center', marginTop: 5}}>
                    فرمت مجاز : <b>jpg</b> , <b>jpeg</b> , <b>png</b>
                    <br/>
                    حداکثر حجم مجاز برای هر فایل: <b>4 مگابایت</b>
                </Typography>

                <input hidden
                       type="file"
                       id="file"
                       ref={fileUploader}
                       accept='.jpg,.png,.jpeg'
                       multiple={limitFilesCount > 1}
                       onChange={onFileChangeHandler}/>
            </div>
            {
                files.length > 0 &&
                <Paper component="ul" elevation={2} className={classes.root}>
                    {files.map((file) => {
                        return (
                            <li key={file.name}>
                                <Chip
                                    variant='outlined'
                                    onClick={() => onClickHandler(file)}
                                    icon={<ImageRoundedIcon/>}
                                    label={file.name}
                                    onDelete={() => onDeleteFileHandler(file)}
                                    className={classes.chip}/>
                            </li>
                        );
                    })}
                </Paper>
            }
        </>
    );
};

export default React.memo(FileUploadBox, (prev, next) => prev.uploadedFiles === next.uploadedFiles && prev.limitFilesCount === next.limitFilesCount);
