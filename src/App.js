import React, { Fragment, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import Swal from 'sweetalert2';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerCitasAction, eliminarCitasAction } from './actions/pacienteActions';

function App() {

  const dispatch = useDispatch();

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
      let cargarCitas = () => dispatch(obtenerCitasAction());
      cargarCitas();
      // eslint-disable-next-line
  }, [] );

  const citas = useSelector( state => state.paciente.citas);

  const eliminarCita = id => {

    // preguntar al usuario
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Una cita que se elimina no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
          // pasarlo al action
          dispatch(eliminarCitasAction(id));
      }
    });
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario/>
          </div>
          <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;