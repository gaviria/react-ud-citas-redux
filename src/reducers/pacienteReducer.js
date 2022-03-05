import {
    AGREGAR_PACIENTE,
    AGREGAR_PACIENTE_EXITO,
    AGREGAR_PACIENTE_ERROR,
    OBTENER_CITAS,
    OBTENER_CITAS_EXITO,
    OBTENER_CITAS_ERROR,
    ELIMINAR_CITAS,
    ELIMINAR_CITAS_EXITO,
    ELIMINAR_CITAS_ERROR
} from "../types/index";

const initialState = {
    citas: [],
    error: null,
    cargando: null,
    citaEliminar: null
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case AGREGAR_PACIENTE:
        case OBTENER_CITAS:
            return {
                ...state,
                cargando: action.payload
            }
        case AGREGAR_PACIENTE_EXITO:
            return {
                ...state,
                cargando: false,
                citas: [...state.citas, action.payload]
            }
        case AGREGAR_PACIENTE_ERROR:
        case OBTENER_CITAS_ERROR:
        case ELIMINAR_CITAS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case OBTENER_CITAS_EXITO:
            return {
                ...state,
                cargando: false,
                error: null,
                citas: action.payload
            }
        case ELIMINAR_CITAS:
            return {
                ...state,
                citaEliminar: action.payload,
                cargando: true
            }
        case ELIMINAR_CITAS_EXITO:
        return {
            ...state,
            cargando: false,
            citas: state.citas.filter( cita => cita.id !== state.citaEliminar ),
            citaEliminar: null
        }
        default:
            return state
    }
}