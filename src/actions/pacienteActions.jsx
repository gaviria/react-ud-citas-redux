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

import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

//crear paciente
export function crearNuevoPacienteActions(paciente) {
    return async (dispacth) => {
        dispacth(agregarPaciente());

        try{
            // insertar en la API
            await clienteAxios.post("/pacientes", paciente);
            dispacth(agregarPacienteExito(paciente));

            // Alerta
            Swal.fire(
                'Correcto', 
                'El paciente se agregó correctamente',
                'success'
            );
        } catch (error){
            //si hay error cambia state
            dispacth(agregarPacienteError(true));

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo: '+ error.message
            });
        }
    }
}

const agregarPaciente = () => ({
    type: AGREGAR_PACIENTE,
    payload: true
});

const agregarPacienteExito = (paciente) => ({
    type: AGREGAR_PACIENTE_EXITO,
    payload: paciente
});

const agregarPacienteError = (isError) => ({
    type: AGREGAR_PACIENTE_ERROR,
    payload: isError
});

//Obtener Citas
export function obtenerCitasAction(){
    return async (dispacth) =>{
        dispacth(obtenerCitas());

        try{
            const citas = await clienteAxios.get('/pacientes');
            dispacth(obtenerCitasExito(citas.data));
        } catch (error) {
            dispacth(obtenerCitasError(true));
            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo: '+ error.message
            });
        }
    }
}

const obtenerCitas = () => ({
    type: OBTENER_CITAS,
    payload: true
});

const obtenerCitasExito = (citas) =>({
    type: OBTENER_CITAS_EXITO,
    payload: citas
});

const obtenerCitasError = (isError) => ({
    type: OBTENER_CITAS_ERROR,
    payload: isError
});

//Eliminar Citas
export function eliminarCitasAction(id){
    return async (dispacth) =>{
        dispacth(eliminarCitas(id));

        try{
            await clienteAxios.delete(`/pacientes/${id}`);
            dispacth(eliminarCitasExito());
            // Alerta
            Swal.fire(
                'Correcto', 
                'Cita eliminada correctamente',
                'success'
            );
        } catch (error) {
            dispacth(eliminarCitasError(true));
        }
    }
}

const eliminarCitas = (id) => ({
    type: ELIMINAR_CITAS,
    payload: id
});

const eliminarCitasExito = () =>({
    type: ELIMINAR_CITAS_EXITO
});

const eliminarCitasError = (isError) => ({
    type: ELIMINAR_CITAS_ERROR,
    payload: isError
})



