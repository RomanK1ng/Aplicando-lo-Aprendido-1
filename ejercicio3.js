// Instalar prompt-sync antes de usar: npm install prompt-sync
const prompt = require('prompt-sync')({sigint: true});

// Clase para representar una tarea
class Tarea {
    constructor(titulo, descripcion, dificultad) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.dificultad = dificultad; // 1-3
        this.estado = 0; // 0: Pendiente, 1: EnCurso, 2: Terminada, 3: Cancelada
    }

    cambiarEstado(nuevoEstado) {
        if (nuevoEstado >= 0 && nuevoEstado <= 3) {
            this.estado = nuevoEstado;
        } else {
            console.log("Estado inválido");
        }
    }

    mostrar() {
        const estados = ["Pendiente", "EnCurso", "Terminada", "Cancelada"];
        console.log(`Título: ${this.titulo}`);
        console.log(`Descripción: ${this.descripcion}`);
        console.log(`Dificultad: ${this.dificultad}`);
        console.log(`Estado: ${estados[this.estado]}`);
        console.log("---------------------------");
    }
}

// Clase para manejar la lista de tareas
class ListaTareas {
    constructor() {
        this.tareas = [];
    }

    agregarTarea(tarea) {
        this.tareas.push(tarea);
    }

    listarTareas() {
        if (this.tareas.length === 0) {
            console.log("No hay tareas");
            return;
        }
        this.tareas.forEach(t => t.mostrar());
    }

    cambiarEstadoTarea(titulo, nuevoEstado) {
        const tarea = this.tareas.find(t => t.titulo === titulo);
        if (tarea) {
            tarea.cambiarEstado(nuevoEstado);
            console.log("Estado cambiado con éxito");
        } else {
            console.log("Tarea no encontrada");
        }
    }

    eliminarTarea(titulo) {
        const index = this.tareas.findIndex(t => t.titulo === titulo);
        if (index !== -1) {
            this.tareas.splice(index, 1);
            console.log("Tarea eliminada con éxito");
        } else {
            console.log("Tarea no encontrada");
        }
    }
}

// Función principal con menú
function menu() {
    const lista = new ListaTareas();
    let opcion;

    do {
        console.log("\n--- MENÚ DE TAREAS ---");
        console.log("1. Agregar tarea");
        console.log("2. Listar tareas");
        console.log("3. Cambiar estado de tarea");
        console.log("4. Eliminar tarea");
        console.log("0. Salir");
        opcion = prompt("Elige una opción: ");

        switch(opcion) {
            case "1":
                const titulo = prompt("Título de la tarea: ");
                const descripcion = prompt("Descripción: ");
                const dificultad = parseInt(prompt("Dificultad (1-3): "));
                lista.agregarTarea(new Tarea(titulo, descripcion, dificultad));
                break;
            case "2":
                lista.listarTareas();
                break;
            case "3":
                const tituloCambio = prompt("Título de la tarea a cambiar: ");
                console.log("Estados: 0-Pendiente, 1-EnCurso, 2-Terminada, 3-Cancelada");
                const nuevoEstado = parseInt(prompt("Nuevo estado: "));
                lista.cambiarEstadoTarea(tituloCambio, nuevoEstado);
                break;
            case "4":
                const tituloEliminar = prompt("Título de la tarea a eliminar: ");
                lista.eliminarTarea(tituloEliminar);
                break;
            case "0":
                console.log("¡Hasta luego!");
                break;
            default:
                console.log("Opción inválida");
        }

    } while(opcion !== "0");
}

// Ejecutar el menú
menu();
