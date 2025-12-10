// Explicaciones dinámicas para cada operación

export interface Explanation {
  title: string;
  steps: string[];
  codePseint: string;
  codeJavaScript: string;
}

export function getSumaExplanation(vector: number[], resultado: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    "Inicializamos suma = 0",
    ...vector.map((num, i) => `Paso ${i + 1}: suma = ${vector.slice(0, i).reduce((a, b) => a + b, 0)} + ${num} = ${vector.slice(0, i + 1).reduce((a, b) => a + b, 0)}`),
    `Resultado final: ${resultado}`
  ];

  const codePseint = `// Recorrido con PARA
Algoritmo SumaVector
    Definir suma, i Como Entero
    suma <- 0
    
    Para i <- 0 Hasta ${vector.length - 1} Hacer
        suma <- suma + vector[i]
    FinPara
    
    Escribir "Suma total: ", suma
FinAlgoritmo
// Resultado: ${resultado}`;

  const codeJavaScript = `// Recorrido con FOR
let suma = 0;
for (let i = 0; i < vector.length; i++) {
  suma += vector[i];
}
console.log("Suma total:", suma);
// Resultado: ${resultado}`;

  return {
    title: "Cálculo de la Suma Total",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getPromedioExplanation(vector: number[], suma: number, promedio: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    `Suma total: ${suma}`,
    `Cantidad de elementos: ${vector.length}`,
    `Promedio = suma / cantidad`,
    `Promedio = ${suma} / ${vector.length} = ${promedio.toFixed(2)}`
  ];

  const codePseint = `// Usamos REPETIR para validar
Algoritmo PromedioVector
    Definir promedio Como Real
    Definir intentos Como Entero
    promedio <- 0
    intentos <- 0
    
    Repetir
        suma <- CalcularSuma(vector)
        promedio <- suma / ${vector.length}
        intentos <- intentos + 1
    Hasta Que NO (promedio = 0 Y intentos < 3)
    
    Escribir "Promedio: ", promedio
FinAlgoritmo
// Resultado: ${promedio.toFixed(2)}`;

  const codeJavaScript = `// Usamos DO-WHILE para validar
let promedio = 0;
let intentos = 0;

do {
  const suma = calcularSuma(vector);
  promedio = suma / vector.length;
  intentos++;
} while (isNaN(promedio) && intentos < 3);

console.log("Promedio:", promedio);
// Resultado: ${promedio.toFixed(2)}`;

  return {
    title: "Cálculo del Promedio",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getMaximoExplanation(vector: number[], maximo: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    `Inicializamos maximo = vector[0] = ${vector[0]}`,
    ...vector.slice(1).map((num, i) => 
      num > Math.max(...vector.slice(0, i + 1)) 
        ? `Paso ${i + 2}: ${num} > ${Math.max(...vector.slice(0, i + 1))} → nuevo máximo = ${num}`
        : `Paso ${i + 2}: ${num} ≤ ${Math.max(...vector.slice(0, i + 1))} → máximo sigue siendo ${Math.max(...vector.slice(0, i + 1))}`
    ),
    `Valor máximo encontrado: ${maximo}`
  ];

  const codePseint = `// Búsqueda con PARA + SI
Algoritmo MaximoVector
    Definir maximo, i Como Entero
    maximo <- vector[0]
    
    Para i <- 1 Hasta ${vector.length - 1} Hacer
        Si vector[i] > maximo Entonces
            maximo <- vector[i]
        FinSi
    FinPara
    
    Escribir "Máximo: ", maximo
FinAlgoritmo
// Resultado: ${maximo}`;

  const codeJavaScript = `// Búsqueda con FOR + IF
let maximo = vector[0];
for (let i = 1; i < vector.length; i++) {
  if (vector[i] > maximo) {
    maximo = vector[i];
  }
}
console.log("Máximo:", maximo);
// Resultado: ${maximo}`;

  return {
    title: "Búsqueda del Máximo",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getMinimoExplanation(vector: number[], minimo: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    `Inicializamos minimo = vector[0] = ${vector[0]}`,
    ...vector.slice(1).map((num, i) => 
      num < Math.min(...vector.slice(0, i + 1)) 
        ? `Paso ${i + 2}: ${num} < ${Math.min(...vector.slice(0, i + 1))} → nuevo mínimo = ${num}`
        : `Paso ${i + 2}: ${num} ≥ ${Math.min(...vector.slice(0, i + 1))} → mínimo sigue siendo ${Math.min(...vector.slice(0, i + 1))}`
    ),
    `Valor mínimo encontrado: ${minimo}`
  ];

  const codePseint = `// Búsqueda con PARA + SI
Algoritmo MinimoVector
    Definir minimo, i Como Entero
    minimo <- vector[0]
    
    Para i <- 1 Hasta ${vector.length - 1} Hacer
        Si vector[i] < minimo Entonces
            minimo <- vector[i]
        FinSi
    FinPara
    
    Escribir "Mínimo: ", minimo
FinAlgoritmo
// Resultado: ${minimo}`;

  const codeJavaScript = `// Búsqueda con FOR + IF
let minimo = vector[0];
for (let i = 1; i < vector.length; i++) {
  if (vector[i] < minimo) {
    minimo = vector[i];
  }
}
console.log("Mínimo:", minimo);
// Resultado: ${minimo}`;

  return {
    title: "Búsqueda del Mínimo",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getPositivosExplanation(vector: number[], positivos: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    "Inicializamos contador = 0",
    ...vector.map((num, i) => 
      num >= 0 
        ? `Paso ${i + 1}: ${num} ≥ 0 → contador++`
        : `Paso ${i + 1}: ${num} < 0 → no contamos`
    ),
    `Total de positivos: ${positivos}`
  ];

  const codePseint = `// Conteo con PARA + SI
Algoritmo ContarPositivos
    Definir contador, i Como Entero
    contador <- 0
    
    Para i <- 0 Hasta ${vector.length - 1} Hacer
        Si vector[i] >= 0 Entonces
            contador <- contador + 1
        FinSi
    FinPara
    
    Escribir "Positivos: ", contador
FinAlgoritmo
// Resultado: ${positivos}`;

  const codeJavaScript = `// Conteo con FOR + IF
let positivos = 0;
for (let i = 0; i < vector.length; i++) {
  if (vector[i] >= 0) {
    positivos++;
  }
}
console.log("Positivos:", positivos);
// Resultado: ${positivos}`;

  return {
    title: "Conteo de Números Positivos",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getNegativosExplanation(vector: number[], negativos: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    "Inicializamos contador = 0",
    ...vector.map((num, i) => 
      num < 0 
        ? `Paso ${i + 1}: ${num} < 0 → contador++`
        : `Paso ${i + 1}: ${num} ≥ 0 → no contamos`
    ),
    `Total de negativos: ${negativos}`
  ];

  const codePseint = `// Conteo con PARA + SI
Algoritmo ContarNegativos
    Definir contador, i Como Entero
    contador <- 0
    
    Para i <- 0 Hasta ${vector.length - 1} Hacer
        Si vector[i] < 0 Entonces
            contador <- contador + 1
        FinSi
    FinPara
    
    Escribir "Negativos: ", contador
FinAlgoritmo
// Resultado: ${negativos}`;

  const codeJavaScript = `// Conteo con FOR + IF
let negativos = 0;
for (let i = 0; i < vector.length; i++) {
  if (vector[i] < 0) {
    negativos++;
  }
}
console.log("Negativos:", negativos);
// Resultado: ${negativos}`;

  return {
    title: "Conteo de Números Negativos",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getParesExplanation(vector: number[], pares: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    "Inicializamos contador = 0",
    ...vector.map((num, i) => 
      num !== 0 && num % 2 === 0
        ? `Paso ${i + 1}: ${num} % 2 = 0 → es par, contador++`
        : num === 0
        ? `Paso ${i + 1}: ${num} es cero → no contamos`
        : `Paso ${i + 1}: ${num} % 2 ≠ 0 → es impar`
    ),
    `Total de pares: ${pares}`
  ];

  const codePseint = `// Conteo con PARA + SI
Algoritmo ContarPares
    Definir contador, i Como Entero
    contador <- 0
    
    Para i <- 0 Hasta ${vector.length - 1} Hacer
        Si vector[i] <> 0 Y vector[i] % 2 = 0 Entonces
            contador <- contador + 1
        FinSi
    FinPara
    
    Escribir "Pares: ", contador
FinAlgoritmo
// Resultado: ${pares}`;

  const codeJavaScript = `// Conteo con FOR + IF
let pares = 0;
for (let i = 0; i < vector.length; i++) {
  if (vector[i] !== 0 && vector[i] % 2 === 0) {
    pares++;
  }
}
console.log("Pares:", pares);
// Resultado: ${pares}`;

  return {
    title: "Conteo de Números Pares",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getImparesExplanation(vector: number[], impares: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    "Inicializamos contador = 0",
    ...vector.map((num, i) => 
      num !== 0 && num % 2 !== 0
        ? `Paso ${i + 1}: ${num} % 2 ≠ 0 → es impar, contador++`
        : num === 0
        ? `Paso ${i + 1}: ${num} es cero → no contamos`
        : `Paso ${i + 1}: ${num} % 2 = 0 → es par`
    ),
    `Total de impares: ${impares}`
  ];

  const codePseint = `// Conteo con PARA + SI
Algoritmo ContarImpares
    Definir contador, i Como Entero
    contador <- 0
    
    Para i <- 0 Hasta ${vector.length - 1} Hacer
        Si vector[i] <> 0 Y vector[i] % 2 <> 0 Entonces
            contador <- contador + 1
        FinSi
    FinPara
    
    Escribir "Impares: ", contador
FinAlgoritmo
// Resultado: ${impares}`;

  const codeJavaScript = `// Conteo con FOR + IF
let impares = 0;
for (let i = 0; i < vector.length; i++) {
  if (vector[i] !== 0 && vector[i] % 2 !== 0) {
    impares++;
  }
}
console.log("Impares:", impares);
// Resultado: ${impares}`;

  return {
    title: "Conteo de Números Impares",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getCerosExplanation(vector: number[], ceros: number): Explanation {
  const steps = [
    `Vector: [${vector.join(", ")}]`,
    "Inicializamos contador = 0",
    ...vector.map((num, i) => 
      num === 0
        ? `Paso ${i + 1}: ${num} = 0 → contador++`
        : `Paso ${i + 1}: ${num} ≠ 0`
    ),
    `Total de ceros: ${ceros}`
  ];

  const codePseint = `// Conteo con PARA + SI
Algoritmo ContarCeros
    Definir contador, i Como Entero
    contador <- 0
    
    Para i <- 0 Hasta ${vector.length - 1} Hacer
        Si vector[i] = 0 Entonces
            contador <- contador + 1
        FinSi
    FinPara
    
    Escribir "Ceros: ", contador
FinAlgoritmo
// Resultado: ${ceros}`;

  const codeJavaScript = `// Conteo con FOR + IF
let ceros = 0;
for (let i = 0; i < vector.length; i++) {
  if (vector[i] === 0) {
    ceros++;
  }
}
console.log("Ceros:", ceros);
// Resultado: ${ceros}`;

  return {
    title: "Conteo de Ceros",
    steps,
    codePseint,
    codeJavaScript
  };
}

export function getGenericExplanation(title: string, vector: number[], resultado: number | string): Explanation {
  return {
    title,
    steps: [
      `Vector: [${vector.join(", ")}]`,
      `Resultado: ${resultado}`,
      "Análisis completo realizado con estructuras algorítmicas"
    ],
    codePseint: `// Procesamiento con estructuras
// IF, FOR, WHILE, DO-WHILE, Arrays
// Resultado: ${resultado}`,
    codeJavaScript: `// Procesamiento con estructuras
// IF, FOR, WHILE, DO-WHILE, Arrays
// Resultado: ${resultado}`
  };
}