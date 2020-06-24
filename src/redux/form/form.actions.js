import {GET_FORM_FAIL, GET_FORM_START, GET_FORM_SUCCESS, UPDATE_FILES, UPDATE_QUESTION} from './form.types';
import {getFormRequest} from '../../apis/form';

const getFormStart = () => ({type: GET_FORM_START});
const getFormSuccess = (questions, formId) => ({type: GET_FORM_SUCCESS, questions, formId});
const getFormFail = error => ({type: GET_FORM_FAIL, error});

export const getForm = () => async (dispatch, getState) => {
    dispatch(getFormStart());

    try {
        const response = await getFormRequest();
        const questions = response.data.results[0].questions.sort((a, b) => a.order - b.order);
        const formId = response.data.results[0].id;
        const {user} = getState().user.user;
        const {history} = getState().history;


        //q2
        let salGhable66 = 0;
        let daraje1 = 0;
        let daraje2 = 0;
        let daraje3 = 0;
        history.forEach(h => {
            if (h.sal_tahsili < 1366)
                salGhable66++;

            if (h.daraje_roosta === 1)
                daraje1++;

            if (h.daraje_roosta === 2)
                daraje2++;

            if (h.daraje_roosta === 3)
                daraje3++;
        });
        questions[1].emtiaz_karbar = salGhable66 * 2 + daraje1 * 1.5 + daraje2 * 3 + daraje3 * 4.5;
        questions[1].javab = {
            salGhable66, daraje1, daraje2, daraje3
        };


        //q3
        let beytute = 0;
        if (history.length > 0)
            history.forEach(h => {
                if (h.beitote)
                    beytute++;
            });
        questions[2].emtiaz_karbar = beytute * 4;
        questions[2].javab = {
            sal: beytute
        };

        //q6
        const day = user.profile.war_zone || 0;
        const mah = day < 30 ? 0 : +((+day / 30).toFixed(2));
        const mahHamsar = +questions[5].javab.mahHamsar || 0;
        let calcPoint = +mah * 2 >= 10 ? 10 : +mah * 2;
        if (user.gender === 'F')
            calcPoint += +mahHamsar * .5 >= 5 ? 5 : +mahHamsar * .5;

        questions[5].emtiaz_karbar = calcPoint;
        questions[5].javab = {
            ...questions[5].javab,
            mah
        };

        //q10
        let paye1Va6 = 0;
        let paye2Ta5 = 0;
        history.forEach(h => {
            if (h.paye_aval || h.paye_sheshom)
                paye1Va6++;
            else if (h.paye_dovom || h.paye_sevom || h.paye_chaharom || h.paye_panjom)
                paye2Ta5++;
        });
        questions[9].emtiaz_karbar = paye1Va6 * 3 + paye2Ta5 * 2;
        questions[9].javab = {
            paye1Va6, paye2Ta5
        };


        //q11
        let payeEzafi = 0;
        history.forEach(h => {
            const countOfClass = +h.paye_aval +
                +h.paye_dovom +
                +h.paye_sevom +
                +h.paye_chaharom +
                +h.paye_panjom +
                +h.paye_sheshom;
            if (countOfClass > 1)
                payeEzafi += countOfClass - 1;

        });
        questions[10].emtiaz_karbar = payeEzafi;
        questions[10].javab = {payeEzafi};


        //q17
        let salModirAmuzegar = 0;
        let salModirMostaghel = 0;
        let salMoavenat = 0;
        history.forEach(h => {
            if (h.semat === 'معاون آموزگار' || h.semat === 'مدیر آموزگار')
                salModirAmuzegar++;
            if (h.semat === 'مدیر')
                salModirMostaghel++;
            if (h.semat === 'معاون')
                salMoavenat++;
        });
        questions[16].emtiaz_karbar = salModirAmuzegar + salModirMostaghel * 2 + salMoavenat;
        questions[16].javab = {salMoavenat, salModirAmuzegar, salModirMostaghel};


        //q32
        if (user.profile.overtime_work?.find(c => c === 1398)) {
            questions[31].javab = {
                ...questions[31].javab,
                tadrisShiftMokhalef: true
            };
            questions[31].emtiaz_karbar = 3;
        }
        dispatch(getFormSuccess(questions, formId));
    } catch (e) {
        dispatch(getFormFail('دریافت فرم با خطا مواجه شده است'));
    }
};

export const updateQuestion = (question, object) => ({type: UPDATE_QUESTION, question, object});

export const updateFiles = (question, files) => ({type: UPDATE_FILES, question, files});
