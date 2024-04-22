const { resolve } = require('path');

require('colors');


const mostrarMenu = () => {

    return new Promise(resolve => {

        console.clear();

        console.log(`${'1.'.green} Crear tarea(s)`);
        console.log(`${'2.'.green} Listar tarea(s)`);
        console.log(`${'3.'.green} Listar tarea(s) completadas`);
        console.log(`${'4.'.green} Listar tarea(s) pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea(s)`);
        console.log(`${'0.'.green} Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt)
        });

    });

};

const pausa = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar...`, (opt) => {
            readline.close();
            resolve(opt);
        });

    });

};

module.exports = {
    mostrarMenu,
    pausa,
};