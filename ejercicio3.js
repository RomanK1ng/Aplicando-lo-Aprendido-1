// Instalar con: npm install prompt-sync
const prompt = require("prompt-sync")();

console.clear();
console.log("¡Bienvenido!");

// Pedimos el nombre al usuario
const nombre = prompt("Por favor, ingresa tu nombre: ");

// Lista de tareas (array en memoria)
let tareas = [];

let opcion;
do {
    console.clear();
    console.log(`¡Hola ${nombre}!`);
    console.log("\n¿Qué deseas hacer?\n");
    console.log("[1] Ver Mis Tareas.");
    console.log("[2] Buscar una Tarea.");
    console.log("[3] Agregar una Tarea.");
    console.log("[0] Salir.\n");

    opcion = prompt("> ");

    switch (opcion) {
        case "1": // Ver tareas
            console.clear();
            console.log("=== MIS TAREAS ===");
            if (tareas.length === 0) {
                console.log("No tienes tareas guardadas.");
            } else {
                tareas.forEach((t, i) => {
                    console.log(`\n[${i + 1}] ${t.titulo}`);
                });
            }
            prompt("\nPresiona ENTER para continuar.");
            break;

        case "2": // Buscar tarea
            console.clear();
            const clave = prompt("Introduce el título de una Tarea para buscarla: ");
            const coincidencias = tareas.filter(t => t.titulo.toLowerCase().includes(clave.toLowerCase()));

            if (coincidencias.length === 0) {
                console.log("\nLa tarea no existe o no se ha encontrado.");
                prompt("\nPresiona ENTER para volver al menú.");
                break;
            }

            console.log("\nEstas son las tareas relacionadas:\n");
            coincidencias.forEach((t, i) => {
                console.log(`[${i + 1}] ${t.titulo}`);
            });

            const num = parseInt(prompt("\n¿Deseas ver los detalles de alguna?\nIntroduce el número para verla o 0 para volver: "));

            if (num > 0 && num <= coincidencias.length) {
                const tarea = coincidencias[num - 1];
                console.clear();
                console.log("Esta es la tarea que elegiste:\n");
                console.log(`${tarea.titulo}\n`);
                console.log(`${tarea.descripcion}\n`);
                console.log(`Estado: ${tarea.estado}`);
                console.log(`Dificultad: ${tarea.dificultad}`);
                console.log(`Vencimiento: ${tarea.vencimiento}`);
                console.log(`Creación: ${tarea.creacion}\n`);

                const editar = prompt("Si deseas editarla, presiona E, o presiona 0 para volver: ").toUpperCase();
                if (editar === "E") {
                    console.clear();
                    console.log(`Estás editando la tarea ${tarea.titulo}.\n`);
                    console.log("- Si deseas mantener los valores de un atributo, simplemente déjalo en blanco.\n");

                    const nuevaDescripcion = prompt("1. Ingresa la descripción: ");
                    const nuevoEstado = prompt("2. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
                    const nuevaDificultad = prompt("3. Dificultad ([1] / [2] / [3]): ");
                    const nuevoVencimiento = prompt("4. Vencimiento (dd/mm/aaaa): ");

                    if (nuevaDescripcion.trim() !== "") tarea.descripcion = nuevaDescripcion;
                    if (nuevoEstado.trim() !== "") tarea.estado = nuevoEstado;
                    if (nuevaDificultad.trim() !== "") tarea.dificultad = nuevaDificultad;
                    if (nuevoVencimiento.trim() !== "") tarea.vencimiento = nuevoVencimiento;

                    console.log("\n¡Datos guardados!");
                    prompt("\nPresiona ENTER para continuar.");
                }
            }
            break;

        case "3": // Agregar tarea
            console.clear();
            console.log("Estás creando una nueva tarea.\n");

            const titulo = prompt("1. Ingresa el Título: ");
            const descripcion = prompt("2. Ingresa la descripción: ");
            const estado = prompt("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");
            const dificultad = prompt("4. Dificultad ([1] / [2] / [3]): ");
            const vencimiento = prompt("5. Vencimiento (dd/mm/aaaa): ");

            // Fecha de creación automática
            const creacion = new Date().toLocaleDateString("es-AR");

            tareas.push({
                titulo,
                descripcion,
                estado,
                dificultad,
                vencimiento,
                creacion
            });

            console.log("\n¡Datos guardados!");
            prompt("\nPresiona ENTER para continuar.");
            break;

        case "0": // Salir
            console.log("¡Hasta luego!");
            break;

        default:
            console.log("Opción no válida, intenta de nuevo.");
            prompt("Presiona ENTER para continuar.");
    }
} while (opcion !== "0");
