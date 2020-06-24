import axios from 'axios';

export const getFormRequest = () => axios.get('/form/');

export const objectionRequest = (answer_id, matn_eteraz) =>
    axios.post('/form/objection/', [{answer_id, matn_eteraz}]);

export const answerFormRequest = (answers, formId) => axios.post(`/form/${formId}/answer/`, {answers});

export const uploadFile = (data, options) =>
    axios.post('/uploader/', data, {
        headers: {'content-type': 'multipart/form-data'},
        ...options
    });
