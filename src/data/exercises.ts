// Base de datos de ejercicios prácticos

export interface Exercise {
  id: string;
  title: string;
  difficulty: "facil" | "medio" | "dificil";
  category: "basico" | "condicionales" | "bucles" | "arrays" | "funciones";
  description: string;
  instructions: string[];
  hints: string[];
  expectedOutput: string;
  solution: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

export const exercises: Exercise[] = [
  // EJERCICIOS BÁSICOS
  {
    id: "suma-dos-numeros",
    title: "Suma de Dos Números",
    difficulty: "facil",
    category: "basico",
    description: "Crea un programa que lea dos números y muestre su suma.",
    instructions: [
      "Declara dos variables para almacenar los números",
      "Lee los dos números del usuario",
      "Calcula la suma de ambos números",
      "Muestra el resultado"
    ],
    hints: [
      "Usa la instrucción 'Leer' para obtener datos del usuario",
      "Usa el operador '+' para sumar",
      "Usa 'Escribir' para mostrar el resultado"
    ],
    expectedOutput: "Si los números son 5 y 3, debe mostrar: La suma es: 8",
    solution: `Algoritmo SumaNumeros
    Definir num1, num2, suma Como Entero
    
    Escribir "Ingresa el primer número:"
    Leer num1
    
    Escribir "Ingresa el segundo número:"
    Leer num2
    
    suma <- num1 + num2
    
    Escribir "La suma es: ", suma
FinAlgoritmo`,
    testCases: [
      { input: "5, 3", expectedOutput: "8" },
      { input: "10, 20", expectedOutput: "30" },
      { input: "-5, 5", expectedOutput: "0" }
    ]
  },
  {
    id: "area-rectangulo",
    title: "Área de un Rectángulo",
    difficulty: "facil",
    category: "basico",
    description: "Calcula el área de un rectángulo dados su base y altura.",
    instructions: [
      "Declara variables para base, altura y área",
      "Lee la base y la altura",
      "Calcula el área (base * altura)",
      "Muestra el resultado"
    ],
    hints: [
      "Área = base × altura",
      "Usa variables tipo Real para permitir decimales"
    ],
    expectedOutput: "Si base=5 y altura=3, debe mostrar: El área es: 15",
    solution: `Algoritmo AreaRectangulo
    Definir base, altura, area Como Real
    
    Escribir "Ingresa la base:"
    Leer base
    
    Escribir "Ingresa la altura:"
    Leer altura
    
    area <- base * altura
    
    Escribir "El área es: ", area
FinAlgoritmo`,
    testCases: [
      { input: "5, 3", expectedOutput: "15" },
      { input: "10, 2.5", expectedOutput: "25" },
      { input: "7.5, 4", expectedOutput: "30" }
    ]
  },

  // EJERCICIOS CON CONDICIONALES
  {
    id: "numero-par-impar",
    title: "Número Par o Impar",
    difficulty: "facil",
    category: "condicionales",
    description: "Determina si un número es par o impar.",
    instructions: [
      "Declara una variable para el número",
      "Lee el número del usuario",
      "Usa el operador MOD para verificar si es divisible por 2",
      "Muestra si es par o impar usando IF-ELSE"
    ],
    hints: [
      "Un número es par si (numero MOD 2) = 0",
      "Si no es par, entonces es impar",
      "Usa la estructura Si-Sino"
    ],
    expectedOutput: "Si el número es 4, debe mostrar: El número 4 es PAR",
    solution: `Algoritmo ParImpar
    Definir numero Como Entero
    
    Escribir "Ingresa un número:"
    Leer numero
    
    Si numero MOD 2 = 0 Entonces
        Escribir "El número ", numero, " es PAR"
    Sino
        Escribir "El número ", numero, " es IMPAR"
    FinSi
FinAlgoritmo`,
    testCases: [
      { input: "4", expectedOutput: "PAR" },
      { input: "7", expectedOutput: "IMPAR" },
      { input: "0", expectedOutput: "PAR" }
    ]
  },
  {
    id: "mayor-de-tres",
    title: "Mayor de Tres Números",
    difficulty: "medio",
    category: "condicionales",
    description: "Encuentra el mayor de tres números ingresados.",
    instructions: [
      "Declara tres variables para los números",
      "Lee los tres números",
      "Compara los números usando IF anidados",
      "Muestra cuál es el mayor"
    ],
    hints: [
      "Primero compara los dos primeros números",
      "Luego compara el mayor de esos con el tercero",
      "Puedes usar IF anidados: Si... Entonces Si... FinSi FinSi"
    ],
    expectedOutput: "Si los números son 5, 12, 8, debe mostrar: El mayor es: 12",
    solution: `Algoritmo MayorDeTres
    Definir num1, num2, num3, mayor Como Entero
    
    Escribir "Ingresa el primer número:"
    Leer num1
    Escribir "Ingresa el segundo número:"
    Leer num2
    Escribir "Ingresa el tercer número:"
    Leer num3
    
    Si num1 >= num2 Y num1 >= num3 Entonces
        mayor <- num1
    Sino
        Si num2 >= num3 Entonces
            mayor <- num2
        Sino
            mayor <- num3
        FinSi
    FinSi
    
    Escribir "El mayor es: ", mayor
FinAlgoritmo`,
    testCases: [
      { input: "5, 12, 8", expectedOutput: "12" },
      { input: "15, 3, 9", expectedOutput: "15" },
      { input: "7, 7, 7", expectedOutput: "7" }
    ]
  },

  // EJERCICIOS CON BUCLES
  {
    id: "tabla-multiplicar",
    title: "Tabla de Multiplicar",
    difficulty: "facil",
    category: "bucles",
    description: "Muestra la tabla de multiplicar de un número del 1 al 10.",
    instructions: [
      "Declara variables para el número y el contador",
      "Lee el número del cual quieres la tabla",
      "Usa un bucle FOR del 1 al 10",
      "En cada iteración, multiplica el número por el contador",
      "Muestra el resultado de cada multiplicación"
    ],
    hints: [
      "Usa: Para i <- 1 Hasta 10 Hacer",
      "En cada iteración: resultado <- numero * i",
      "Muestra con formato: 'numero x i = resultado'"
    ],
    expectedOutput: "Si el número es 5, debe mostrar:\n5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50",
    solution: `Algoritmo TablaMultiplicar
    Definir numero, i, resultado Como Entero
    
    Escribir "Ingresa un número:"
    Leer numero
    
    Escribir "Tabla del ", numero, ":"
    Para i <- 1 Hasta 10 Hacer
        resultado <- numero * i
        Escribir numero, " x ", i, " = ", resultado
    FinPara
FinAlgoritmo`,
    testCases: [
      { input: "5", expectedOutput: "5 x 1 = 5, 5 x 2 = 10, ..., 5 x 10 = 50" },
      { input: "3", expectedOutput: "3 x 1 = 3, 3 x 2 = 6, ..., 3 x 10 = 30" }
    ]
  },
  {
    id: "suma-while",
    title: "Suma de Números con WHILE",
    difficulty: "medio",
    category: "bucles",
    description: "Suma números ingresados por el usuario hasta que ingrese 0.",
    instructions: [
      "Declara variables para el número actual y la suma total",
      "Inicializa la suma en 0",
      "Usa un bucle WHILE que continúe mientras el número no sea 0",
      "En cada iteración, lee un número y súmalo al total",
      "Al final, muestra la suma total"
    ],
    hints: [
      "Usa: Mientras numero <> 0 Hacer",
      "Lee el primer número ANTES del bucle",
      "Lee el siguiente número AL FINAL del bucle",
      "Acumula con: suma <- suma + numero"
    ],
    expectedOutput: "Si se ingresan 5, 10, 3, 0, debe mostrar: La suma total es: 18",
    solution: `Algoritmo SumaWhile
    Definir numero, suma Como Entero
    
    suma <- 0
    Escribir "Ingresa números (0 para terminar):"
    Leer numero
    
    Mientras numero <> 0 Hacer
        suma <- suma + numero
        Escribir "Ingresa otro número (0 para terminar):"
        Leer numero
    FinMientras
    
    Escribir "La suma total es: ", suma
FinAlgoritmo`,
    testCases: [
      { input: "5, 10, 3, 0", expectedOutput: "18" },
      { input: "1, 1, 1, 1, 0", expectedOutput: "4" },
      { input: "0", expectedOutput: "0" }
    ]
  },

  // EJERCICIOS CON ARRAYS
  {
    id: "llenar-mostrar-array",
    title: "Llenar y Mostrar un Array",
    difficulty: "facil",
    category: "arrays",
    description: "Crea un array, llénalo con números y muestra su contenido.",
    instructions: [
      "Declara un array de 5 elementos",
      "Usa un FOR para llenar el array con números ingresados",
      "Usa otro FOR para mostrar todos los elementos",
      "Muestra también la posición de cada elemento"
    ],
    hints: [
      "Usa: Dimension numeros[5]",
      "Para llenar: numeros[i] <- ...",
      "Para mostrar: Escribir numeros[i]",
      "Los índices van de 0 a 4"
    ],
    expectedOutput: "Posición 0: 10\nPosición 1: 20\n...",
    solution: `Algoritmo LlenarMostrarArray
    Definir numeros Como Entero
    Dimension numeros[5]
    Definir i Como Entero
    
    Escribir "Ingresa 5 números:"
    Para i <- 0 Hasta 4 Hacer
        Escribir "Número ", i + 1, ":"
        Leer numeros[i]
    FinPara
    
    Escribir ""
    Escribir "Los números ingresados son:"
    Para i <- 0 Hasta 4 Hacer
        Escribir "Posición ", i, ": ", numeros[i]
    FinPara
FinAlgoritmo`,
    testCases: [
      { input: "10, 20, 30, 40, 50", expectedOutput: "10, 20, 30, 40, 50" }
    ]
  },
  {
    id: "buscar-en-array",
    title: "Buscar un Número en un Array",
    difficulty: "medio",
    category: "arrays",
    description: "Busca un número específico en un array y muestra su posición.",
    instructions: [
      "Crea un array de 10 números",
      "Llena el array con números",
      "Lee el número a buscar",
      "Recorre el array con un FOR",
      "Si encuentras el número, muestra su posición",
      "Si no lo encuentras, informa que no está"
    ],
    hints: [
      "Usa una variable booleana 'encontrado'",
      "Cuando encuentres el número, cambia 'encontrado' a Verdadero",
      "Al final del bucle, verifica si se encontró o no"
    ],
    expectedOutput: "Si buscas el 30 y está en la posición 2, muestra: El número 30 está en la posición 2",
    solution: `Algoritmo BuscarEnArray
    Definir numeros Como Entero
    Dimension numeros[10]
    Definir i, buscar Como Entero
    Definir encontrado Como Logico
    
    // Llenar array
    Para i <- 0 Hasta 9 Hacer
        numeros[i] <- (i + 1) * 10
    FinPara
    
    Escribir "Ingresa el número a buscar:"
    Leer buscar
    
    encontrado <- Falso
    Para i <- 0 Hasta 9 Hacer
        Si numeros[i] = buscar Entonces
            Escribir "El número ", buscar, " está en la posición ", i
            encontrado <- Verdadero
        FinSi
    FinPara
    
    Si NO encontrado Entonces
        Escribir "El número ", buscar, " no está en el array"
    FinSi
FinAlgoritmo`,
    testCases: [
      { input: "30", expectedOutput: "posición 2" },
      { input: "100", expectedOutput: "posición 9" },
      { input: "55", expectedOutput: "no está" }
    ]
  },

  // EJERCICIOS CON FUNCIONES
  {
    id: "funcion-factorial",
    title: "Función Factorial",
    difficulty: "medio",
    category: "funciones",
    description: "Crea una función que calcule el factorial de un número.",
    instructions: [
      "Define una función llamada 'Factorial' que reciba un número",
      "Usa un bucle FOR para calcular el factorial",
      "La función debe retornar el resultado",
      "En el algoritmo principal, usa la función para calcular factoriales"
    ],
    hints: [
      "Factorial de n: n! = n × (n-1) × (n-2) × ... × 1",
      "5! = 5 × 4 × 3 × 2 × 1 = 120",
      "Inicializa resultado en 1",
      "Multiplica desde 1 hasta n"
    ],
    expectedOutput: "Si n=5, debe mostrar: El factorial de 5 es: 120",
    solution: `Algoritmo CalcularFactorial
    Definir numero, resultado Como Entero
    
    Escribir "Ingresa un número:"
    Leer numero
    
    resultado <- Factorial(numero)
    Escribir "El factorial de ", numero, " es: ", resultado
FinAlgoritmo

Funcion retorno <- Factorial(n)
    Definir retorno, i Como Entero
    retorno <- 1
    
    Para i <- 1 Hasta n Hacer
        retorno <- retorno * i
    FinPara
FinFuncion`,
    testCases: [
      { input: "5", expectedOutput: "120" },
      { input: "3", expectedOutput: "6" },
      { input: "0", expectedOutput: "1" }
    ]
  },
  {
    id: "funcion-esprimo",
    title: "Función Es Primo",
    difficulty: "dificil",
    category: "funciones",
    description: "Crea una función que determine si un número es primo.",
    instructions: [
      "Define una función 'EsPrimo' que reciba un número",
      "Un número primo solo es divisible por 1 y por sí mismo",
      "Verifica si el número tiene divisores entre 2 y n-1",
      "Retorna Verdadero si es primo, Falso si no lo es"
    ],
    hints: [
      "Un número es primo si no tiene divisores entre 2 y n-1",
      "Usa MOD para verificar divisibilidad",
      "Si encuentras un divisor, ya no es primo",
      "Los números menores que 2 no son primos"
    ],
    expectedOutput: "Si n=7, debe mostrar: 7 es un número primo",
    solution: `Algoritmo VerificarPrimo
    Definir numero Como Entero
    Definir resultado Como Logico
    
    Escribir "Ingresa un número:"
    Leer numero
    
    resultado <- EsPrimo(numero)
    
    Si resultado Entonces
        Escribir numero, " es un número primo"
    Sino
        Escribir numero, " no es un número primo"
    FinSi
FinAlgoritmo

Funcion retorno <- EsPrimo(n)
    Definir retorno Como Logico
    Definir i Como Entero
    
    Si n < 2 Entonces
        retorno <- Falso
    Sino
        retorno <- Verdadero
        Para i <- 2 Hasta n - 1 Hacer
            Si n MOD i = 0 Entonces
                retorno <- Falso
            FinSi
        FinPara
    FinSi
FinFuncion`,
    testCases: [
      { input: "7", expectedOutput: "es primo" },
      { input: "10", expectedOutput: "no es primo" },
      { input: "2", expectedOutput: "es primo" }
    ]
  }
];

// Función helper para obtener ejercicios por dificultad
export function getExercisesByDifficulty(difficulty: Exercise["difficulty"]): Exercise[] {
  return exercises.filter(ex => ex.difficulty === difficulty);
}

// Función helper para obtener ejercicios por categoría
export function getExercisesByCategory(category: Exercise["category"]): Exercise[] {
  return exercises.filter(ex => ex.category === category);
}

// Función helper para obtener un ejercicio por ID
export function getExerciseById(id: string): Exercise | undefined {
  return exercises.find(ex => ex.id === id);
}

// Función helper para obtener ejercicios filtrados
export function getFilteredExercises(
  difficulty?: Exercise["difficulty"],
  category?: Exercise["category"]
): Exercise[] {
  let filtered = exercises;
  
  if (difficulty) {
    filtered = filtered.filter(ex => ex.difficulty === difficulty);
  }
  
  if (category) {
    filtered = filtered.filter(ex => ex.category === category);
  }
  
  return filtered;
}
