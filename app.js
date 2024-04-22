require('colors');

const { guardarDB, leerDB } = require('./helper/guardarArchivo');
const { 
    inquireMenu,
    pausaMenu,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
} = require('./helper/inquirer');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

// console.clear();


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    // await pausaMenu();

    do {
        opt = await inquireMenu();

        switch (opt) {
            case '1':
                // crear opción
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea(desc)
                break;

            case '2':
                tareas.listadoCompleto();
                break;
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': // lista pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': // Completado || Pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }        
                }
                break;

        }


        guardarDB(tareas.listadoArr);
        await pausaMenu();


    } while (opt !== '0');

    // pausa();
}

main();