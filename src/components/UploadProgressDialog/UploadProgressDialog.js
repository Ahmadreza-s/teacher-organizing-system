import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {answerFormRequest, uploadFile} from '../../apis/form';

const BorderLinearProgress = withStyles({
    root: {
        minWidth: 500,
        height  : 15
    }
})(LinearProgress);

const UploadProgressDialog = ({onAbort, onCompleted}) => {
          const questions = useSelector(state => state.form.questions);
          const formId = useSelector(state => state.form.formId);
          const userId = useSelector(state => state.user.user.user.id);
          const [progressPercent, setProgressPercent] = React.useState(0);
          let sourceAxios = React.useMemo(() => axios.CancelToken.source(), []);
          const getSizeAllFiles = React.useMemo(() => {
              let total = 0;
              for (const q of questions)
                  if (q.javab.hasOwnProperty('files') && q.javab.files)
                      for (const file of q.javab.files.filter(f => !f.hasOwnProperty('full_url')))
                          total += file.size;
              return total;
          }, [questions]);
          React.useEffect(() => {
              const uploadFunc = async () => {
                  try {
                      const modifiedQuestions = [];
                      let totalByteUploaded = 0;
                      for (const question of questions) {
                          if (question.javab.hasOwnProperty('files') && question.javab.files) {
                              const oldFiles = question.javab.files.filter(file => file.hasOwnProperty('full_url'));
                              const newFiles = question.javab.files.filter(file => !file.hasOwnProperty('full_url'));
                              const newUploadedFiles = [];
                              for (const f of newFiles) {
                                  const formData = new FormData();
                                  formData.append('file', f);
                                  formData.append('user', userId);
                                  const response = await uploadFile(formData, {
                                      onUploadProgress: ({loaded}) => {
                                          const value = Math.round((loaded + totalByteUploaded) * 100 / getSizeAllFiles);
                                          setProgressPercent(value);
                                      },
                                      cancelToken     : sourceAxios.token
                                  });
                                  totalByteUploaded += f.size;
                                  newUploadedFiles.push(response.data);
                              }
                              modifiedQuestions.push({
                                  obj          : question.id,
                                  javab        : {
                                      ...question.javab,
                                      files: [
                                          ...oldFiles,
                                          ...newUploadedFiles
                                      ]
                                  },
                                  emtiaz_karbar: question.emtiaz_karbar
                              });
                          }
                          else
                              modifiedQuestions.push({
                                  obj          : question.id,
                                  javab        : question.javab,
                                  emtiaz_karbar: question.emtiaz_karbar
                              });
                      }

                      await answerFormRequest(modifiedQuestions, formId);
                      setProgressPercent(100);
                      onCompleted();
                  } catch (e) {
                      onAbort(axios.isCancel(e), e.message);
                  }
              };
              uploadFunc();
          }, []);
          return (
              <Dialog
                  open={true}
                  keepMounted>
                  <DialogTitle>
                      در حال ارسال به سرور ...
                  </DialogTitle>
                  <DialogContent>
                      <Typography variant='h6' style={{textAlign: 'left', direction: 'rtl'}}>
                          % {progressPercent}
                      </Typography>
                      <BorderLinearProgress
                          variant="determinate"
                          value={progressPercent}/>
                      <Typography variant='caption' style={{textAlign: 'center'}}>
                          سرعت ارسال به سرور بستگی به تعداد مدارک انتخاب شده جهت آپلود و همچنین به سرعت اینترنت شما بستگی دارد
                          <br/>
                          لطفاً اندکی صبور باشید
                      </Typography>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={() => sourceAxios.cancel('operation canceled by user')} color="secondary"
                              variant='outlined'>
                          لغو
                      </Button>
                  </DialogActions>
              </Dialog>
          );
      }
;

export default UploadProgressDialog;
