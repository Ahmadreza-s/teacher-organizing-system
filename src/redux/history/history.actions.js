import {GET_HISTORY_FAIL, GET_HISTORY_START, GET_HISTORY_SUCCESS} from './history.types';
import {getHistoryRequest} from '../../apis/history';

const getHistoryStart = () => ({type: GET_HISTORY_START});
const getHistoryFail = error => ({type: GET_HISTORY_FAIL, error});
const getHistorySuccess = history => ({type: GET_HISTORY_SUCCESS, history});

export const getHistory = (limit = 100, offset = 0) => dispatch => {
    return new Promise(async resolve => {
        dispatch(getHistoryStart());
        try {
            const response = await getHistoryRequest(limit, offset);
            dispatch(getHistorySuccess(response.data.results));
        } catch (e) {
            console.log(e);
            dispatch(getHistoryFail('خطا در دریافت '));
        } finally {
            resolve();
        }
    });
};
