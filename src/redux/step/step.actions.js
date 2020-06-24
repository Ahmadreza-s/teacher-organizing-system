import {NEXT_STEP, PREVIOUS_STEP, SET_ACTIVE_STEP} from './step.types';

export const setActiveStep = index => ({type: SET_ACTIVE_STEP, index});
export const nextStep = () => ({type: NEXT_STEP});
export const prevStep = () => ({type: PREVIOUS_STEP});
