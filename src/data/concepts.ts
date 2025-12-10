// Base de datos de conceptos algorítmicos

export interface Concept {
  id: string;
  title: string;
  category: "basico" | "condicionales" | "bucles" | "arrays" | "funciones";
  description: string;
  explanation: string;
  example: string;
  pseudocode?: string;
  realCode?: string;
}

export const concepts: Concept[] = [
  // CONCEPTOS BÁSICOS
  {
    id: "variables",
    title: "Variables",
    category: "basico",
    description: "Espacios en memoria para almacenar datos",
    explanation: `Una variable es un contenedor que almacena un valor que puede cambiar durante la ejecución del programa. 

En programación, necesitamos guardar información temporalmente: números, textos, resultados de cálculos, etc. Las variables nos permiten hacer esto asignándoles un nombre descriptivo.

**Características:**
- Tienen un nombre único (identificador)
- Almacenan un valor
- El valor puede cambiar (variar)
- Tienen un tipo de dato (número, texto, etc.)`,
    example: "edad = 25\nnombre = 'Juan'\nsalario = 1500.50",
    pseudocode: `Algoritmo Variables
    Definir edad Como Entero
    Definir nombre Como Cadena
    
    edad <- 25
    nombre <- "Juan"
    
    Escribir "Edad: ", edad
    Escribir "Nombre: ", nombre
FinAlgoritmo`,
    realCode: `// JavaScript
let edad = 25;
let nombre = "Juan";

console.log("Edad:", edad);
console.log("Nombre:", nombre);`
  },
  {
    id: "operadores",
    title: "Operadores Aritméticos",
    category: "basico",
    description: "Símbolos para realizar operaciones matemáticas",
    explanation: `Los operadores aritméticos nos permiten realizar cálculos matemáticos básicos:

**Operadores principales:**
- \`+\` Suma: a + b
- \`-\` Resta: a - b
- \`*\` Multiplicación: a * b
- \`/\` División: a / b
- \`MOD\` o \`%\` Módulo (resto): a MOD b

**Orden de precedencia:**
1. Paréntesis ()
2. Multiplicación y División
3. Suma y Resta`,
    example: "resultado = 10 + 5 * 2\n// resultado = 20 (no 30)",
    pseudocode: `Algoritmo Operadores
    Definir a, b, suma, resta Como Entero
    
    a <- 10
    b <- 5
    
    suma <- a + b
    resta <- a - b
    
    Escribir "Suma: ", suma
    Escribir "Resta: ", resta
FinAlgoritmo`,
    realCode: `// JavaScript
let a = 10;
let b = 5;

let suma = a + b;      // 15
let resta = a - b;     // 5
let mult = a * b;      // 50
let div = a / b;       // 2
let mod = a % 3;       // 1`
  },

  // CONDICIONALES
  {
    id: "if-simple",
    title: "IF Simple (Si-Entonces)",
    category: "condicionales",
    description: "Ejecuta código solo si una condición es verdadera",
    explanation: `La estructura IF permite tomar decisiones en el programa. Evalúa una condición y ejecuta un bloque de código solo si la condición es verdadera.

**Sintaxis:**
\`\`\`
Si (condición) Entonces
    // código si es verdadero
FinSi
\`\`\`

**Ejemplo real:** "Si tengo dinero, entonces compro el producto"

La condición debe ser una expresión que resulte en verdadero o falso.`,
    example: "Si edad >= 18 Entonces\n    Escribir 'Eres mayor de edad'\nFinSi",
    pseudocode: `Algoritmo IfSimple
    Definir edad Como Entero
    
    Escribir "Ingresa tu edad:"
    Leer edad
    
    Si edad >= 18 Entonces
        Escribir "Eres mayor de edad"
        Escribir "Puedes votar"
    FinSi
FinAlgoritmo`,
    realCode: `// JavaScript
let edad = 20;

if (edad >= 18) {
    console.log("Eres mayor de edad");
    console.log("Puedes votar");
}`
  },
  {
    id: "if-else",
    title: "IF-ELSE (Si-Sino)",
    category: "condicionales",
    description: "Ejecuta un código u otro según la condición",
    explanation: `IF-ELSE permite ejecutar un código si la condición es verdadera, y otro código diferente si es falsa.

**Sintaxis:**
\`\`\`
Si (condición) Entonces
    // código si es verdadero
Sino
    // código si es falso
FinSi
\`\`\`

**Ejemplo real:** "Si tengo dinero, compro el producto, sino voy al banco"

Siempre se ejecuta uno de los dos bloques, nunca ambos.`,
    example: "Si nota >= 60 Entonces\n    Escribir 'Aprobado'\nSino\n    Escribir 'Reprobado'\nFinSi",
    pseudocode: `Algoritmo IfElse
    Definir nota Como Real
    
    Escribir "Ingresa tu nota:"
    Leer nota
    
    Si nota >= 60 Entonces
        Escribir "¡Aprobado! 🎉"
    Sino
        Escribir "Reprobado 😞"
    FinSi
FinAlgoritmo`,
    realCode: `// JavaScript
let nota = 75;

if (nota >= 60) {
    console.log("¡Aprobado! 🎉");
} else {
    console.log("Reprobado 😞");
}`
  },

  // BUCLES
  {
    id: "for",
    title: "FOR (Para)",
    category: "bucles",
    description: "Repite código un número específico de veces",
    explanation: `El bucle FOR se usa cuando sabemos exactamente cuántas veces queremos repetir algo.

**Sintaxis:**
\`\`\`
Para variable <- inicio Hasta fin Con Paso incremento Hacer
    // código a repetir
FinPara
\`\`\`

**Componentes:**
1. **Variable de control**: Lleva la cuenta de las iteraciones
2. **Inicio**: Valor inicial de la variable
3. **Fin**: Valor final (inclusive)
4. **Paso**: Cuánto aumenta cada vez (opcional, por defecto 1)

**Ejemplo real:** "Para cada día desde lunes hasta viernes, ir a trabajar"`,
    example: "Para i <- 1 Hasta 5 Hacer\n    Escribir i\nFinPara\n// Imprime: 1, 2, 3, 4, 5",
    pseudocode: `Algoritmo BucleFor
    Definir i Como Entero
    
    Escribir "Números del 1 al 10:"
    Para i <- 1 Hasta 10 Hacer
        Escribir i
    FinPara
    
    Escribir "Números pares del 2 al 10:"
    Para i <- 2 Hasta 10 Con Paso 2 Hacer
        Escribir i
    FinPara
FinAlgoritmo`,
    realCode: `// JavaScript
// Del 1 al 10
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// Pares del 2 al 10
for (let i = 2; i <= 10; i += 2) {
    console.log(i);
}`
  },
  {
    id: "while",
    title: "WHILE (Mientras)",
    category: "bucles",
    description: "Repite mientras una condición sea verdadera",
    explanation: `El bucle WHILE repite un bloque de código mientras una condición sea verdadera. Se verifica la condición ANTES de cada iteración.

**Sintaxis:**
\`\`\`
Mientras (condición) Hacer
    // código a repetir
FinMientras
\`\`\`

**Características:**
- Puede ejecutarse 0 o más veces
- Si la condición es falsa desde el inicio, nunca se ejecuta
- Útil cuando no sabemos cuántas iteraciones necesitamos

**Ejemplo real:** "Mientras tenga hambre, seguir comiendo"

⚠️ **Cuidado:** Si la condición nunca se vuelve falsa, tendremos un bucle infinito.`,
    example: "contador = 0\nMientras contador < 5 Hacer\n    contador = contador + 1\nFinMientras",
    pseudocode: `Algoritmo BucleWhile
    Definir numero, contador Como Entero
    
    contador <- 0
    Escribir "¿Cuántos números quieres ver?"
    Leer numero
    
    Mientras contador < numero Hacer
        contador <- contador + 1
        Escribir contador
    FinMientras
    
    Escribir "¡Terminado!"
FinAlgoritmo`,
    realCode: `// JavaScript
let contador = 0;
let numero = 5;

while (contador < numero) {
    contador++;
    console.log(contador);
}

console.log("¡Terminado!");`
  },
  {
    id: "do-while",
    title: "DO-WHILE (Repetir)",
    category: "bucles",
    description: "Ejecuta al menos una vez, luego repite si la condición es verdadera",
    explanation: `El bucle DO-WHILE (Repetir) es similar a WHILE, pero con una diferencia clave: verifica la condición DESPUÉS de ejecutar el código.

**Sintaxis:**
\`\`\`
Repetir
    // código a ejecutar
Hasta Que (condición de parada)
\`\`\`

**Características:**
- Se ejecuta AL MENOS UNA VEZ, sin importar la condición
- La condición se verifica al final
- Útil para menús y validaciones

**Ejemplo real:** "Repetir: pedir la contraseña, hasta que sea correcta"

**Diferencia con WHILE:**
- WHILE: verifica primero, ejecuta después
- DO-WHILE: ejecuta primero, verifica después`,
    example: "Repetir\n    Leer opcion\nHasta Que opcion >= 1 Y opcion <= 3",
    pseudocode: `Algoritmo BucleDoWhile
    Definir opcion Como Entero
    
    Repetir
        Escribir "=== MENÚ ==="
        Escribir "1. Opción 1"
        Escribir "2. Opción 2"
        Escribir "3. Salir"
        Escribir "Elige:"
        Leer opcion
        
        Si opcion < 1 O opcion > 3 Entonces
            Escribir "Opción inválida"
        FinSi
    Hasta Que opcion >= 1 Y opcion <= 3
    
    Escribir "Opción válida seleccionada"
FinAlgoritmo`,
    realCode: `// JavaScript
let opcion;

do {
    console.log("=== MENÚ ===");
    console.log("1. Opción 1");
    console.log("2. Opción 2");
    console.log("3. Salir");
    
    // Simular entrada
    opcion = parseInt(prompt("Elige:"));
    
    if (opcion < 1 || opcion > 3) {
        console.log("Opción inválida");
    }
} while (opcion < 1 || opcion > 3);

console.log("Opción válida");`
  },

  // ARRAYS
  {
    id: "arrays",
    title: "Arrays/Vectores",
    category: "arrays",
    description: "Estructura que almacena múltiples valores del mismo tipo",
    explanation: `Un array (arreglo/vector) es una estructura de datos que almacena múltiples valores bajo un mismo nombre, accediendo a cada valor mediante un índice numérico.

**Características:**
- Almacena múltiples valores del mismo tipo
- Los elementos están ordenados
- Se accede por índice (posición)
- El primer índice es 0 (en la mayoría de lenguajes)
- Tienen tamaño fijo o dinámico según el lenguaje

**Ventajas:**
- Organiza datos relacionados
- Fácil de recorrer con bucles
- Acceso rápido por índice

**Declaración:**
\`\`\`
Dimensionar vector[tamaño]
\`\`\`

**Acceso:**
\`\`\`
vector[0]  // Primer elemento
vector[1]  // Segundo elemento
\`\`\``,
    example: "numeros[0] = 10\nnumeros[1] = 20\nnumeros[2] = 30",
    pseudocode: `Algoritmo EjemploArrays
    Definir numeros Como Entero
    Dimension numeros[5]
    Definir i Como Entero
    
    // Llenar el array
    Para i <- 0 Hasta 4 Hacer
        numeros[i] <- (i + 1) * 10
    FinPara
    
    // Mostrar el array
    Para i <- 0 Hasta 4 Hacer
        Escribir "Posición ", i, ": ", numeros[i]
    FinPara
FinAlgoritmo`,
    realCode: `// JavaScript
let numeros = [];

// Llenar el array
for (let i = 0; i < 5; i++) {
    numeros[i] = (i + 1) * 10;
}

// Mostrar el array
for (let i = 0; i < numeros.length; i++) {
    console.log(\`Posición \${i}: \${numeros[i]}\`);
}

// También con forEach
numeros.forEach((valor, indice) => {
    console.log(\`Posición \${indice}: \${valor}\`);
});`
  },

  // FUNCIONES
  {
    id: "funciones",
    title: "Funciones",
    category: "funciones",
    description: "Bloques de código reutilizables que realizan una tarea específica",
    explanation: `Una función es un bloque de código que tiene un nombre y puede ser llamado múltiples veces. Ayuda a organizar el código y evitar repetición.

**Características:**
- Tienen un nombre descriptivo
- Pueden recibir parámetros (datos de entrada)
- Pueden retornar un valor (dato de salida)
- Se definen una vez, se usan muchas veces

**Tipos:**
1. **Sin parámetros ni retorno**: Solo ejecutan acciones
2. **Con parámetros**: Reciben datos
3. **Con retorno**: Devuelven un resultado
4. **Con parámetros y retorno**: Reciben datos y devuelven resultado

**Ventajas:**
- Reutilización de código
- Código más organizado
- Más fácil de mantener
- Más fácil de probar`,
    example: "Funcion resultado <- Sumar(a, b)\n    resultado <- a + b\nFinFuncion",
    pseudocode: `Algoritmo EjemploFunciones
    Definir num1, num2, resultado Como Entero
    
    num1 <- 10
    num2 <- 5
    
    resultado <- Sumar(num1, num2)
    Escribir "Suma: ", resultado
    
    resultado <- Multiplicar(num1, num2)
    Escribir "Multiplicación: ", resultado
FinAlgoritmo

Funcion retorno <- Sumar(a, b)
    Definir retorno Como Entero
    retorno <- a + b
FinFuncion

Funcion retorno <- Multiplicar(a, b)
    Definir retorno Como Entero
    retorno <- a * b
FinFuncion`,
    realCode: `// JavaScript
function sumar(a, b) {
    return a + b;
}

function multiplicar(a, b) {
    return a * b;
}

// Uso
let num1 = 10;
let num2 = 5;

let resultado = sumar(num1, num2);
console.log("Suma:", resultado);

resultado = multiplicar(num1, num2);
console.log("Multiplicación:", resultado);

// Arrow functions (ES6+)
const dividir = (a, b) => a / b;
console.log("División:", dividir(num1, num2));`
  }
];

// Función helper para obtener conceptos por categoría
export function getConceptsByCategory(category: Concept["category"]): Concept[] {
  return concepts.filter(concept => concept.category === category);
}

// Función helper para obtener un concepto por ID
export function getConceptById(id: string): Concept | undefined {
  return concepts.find(concept => concept.id === id);
}

// Función helper para obtener todas las categorías
export function getCategories(): Array<{id: Concept["category"], name: string}> {
  return [
    { id: "basico", name: "Conceptos Básicos" },
    { id: "condicionales", name: "Condicionales" },
    { id: "bucles", name: "Bucles" },
    { id: "arrays", name: "Arrays/Vectores" },
    { id: "funciones", name: "Funciones" }
  ];
}
