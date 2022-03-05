import { combineReducers } from 'redux';
import pacienteReducer from './pacienteReducer';

export default combineReducers({
    paciente: pacienteReducer
});