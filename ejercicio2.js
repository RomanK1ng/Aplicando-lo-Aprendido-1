const prompt = require('prompt-sync')({sigint: true});

// Pedimos el operador
const operador = prompt("Ingresa el operador (+, -, *, /): ");

// Pedimos los operandos separados por coma
const entrada = prompt("Ingresa los números separados por coma: ");
const numeros = entrada.split(",").map(num => parseFloat(num.trim()));

let resultado;

switch(operador) {
    case "+":
        resultado = numeros.reduce((acc, curr) => acc + curr, 0);
        break;
    case "-":
        resultado = numeros.reduce((acc, curr) => acc - curr);
        break;
    case "*":
        resultado = numeros.reduce((acc, curr) => acc * curr, 1);
        break;
    case "/":
        resultado = numeros.reduce((acc, curr) => {
            if (curr === 0) {
                throw new Error("Error: División por cero");
            }
            return acc / curr;
        });
        break;
    default:
        resultado = "Operador inválido";
}

console.log(`Resultado: ${resultado}`);

