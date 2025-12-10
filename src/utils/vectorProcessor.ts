// VectorProcessor - Versión extendida con análisis completo

export interface VectorResults {
  suma: number;
  promedio: number;
  maximo: number;
  minimo: number;

  positivos: number;
  negativos: number;

  pares: number;
  impares: number;
  ceros: number;

  posMax: number;
  posMin: number;

  sumaPositivos: number;
  sumaNegativos: number;

  promedioPositivos: number;
  promedioNegativos: number;

  entre10y50: number;

  moda: number | null;

  vector: number[];
}

export class VectorProcessor {
  // ---------------- Validación ----------------
  static validateVector(vector: number[]): boolean {
    let attempts = 0;

    while (vector.length === 0 && attempts < 3) {
      console.log("Vector vacío detectado:", attempts + 1);
      attempts++;
    }

    return vector.length > 0;
  }

  // ---------------- Suma ----------------
  static calcularSuma(vector: number[]): number {
    let suma = 0;

    for (let i = 0; i < vector.length; i++) {
      suma += vector[i];
    }

    return suma;
  }

  // ---------------- Promedio ----------------
  static calcularPromedio(vector: number[]): number {
    let promedio = 0;
    let intentos = 0;

    do {
      const suma = this.calcularSuma(vector);
      promedio = suma / vector.length;
      intentos++;
    } while (isNaN(promedio) && intentos < 3);

    return promedio;
  }

  // ---------------- Máximo y mínimo ----------------
  static calcularMaximoMinimo(vector: number[]) {
    let maximo = vector[0];
    let minimo = vector[0];

    let posMax = 0;
    let posMin = 0;

    for (let i = 1; i < vector.length; i++) {
      const valor = vector[i];

      if (valor > maximo) {
        maximo = valor;
        posMax = i;
      }

      if (valor < minimo) {
        minimo = valor;
        posMin = i;
      }
    }

    return { maximo, minimo, posMax, posMin };
  }

  // ---------------- Positivos / Negativos ----------------
  static clasificarPositivosNegativos(vector: number[]) {
    let positivos = 0;
    let negativos = 0;

    let sumaPositivos = 0;
    let sumaNegativos = 0;

    for (let i = 0; i < vector.length; i++) {
      const num = vector[i];

      if (num >= 0) {
        positivos++;
        sumaPositivos += num;
      } else {
        negativos++;
        sumaNegativos += num;
      }
    }

    return { positivos, negativos, sumaPositivos, sumaNegativos };
  }

  // ---------------- Par / Impar / Ceros ----------------
  static contarParImparCeros(vector: number[]) {
    let pares = 0;
    let impares = 0;
    let ceros = 0;

    for (let i = 0; i < vector.length; i++) {
      const num = vector[i];

      if (num === 0) {
        ceros++;
      } else if (num % 2 === 0) {
        pares++;
      } else {
        impares++;
      }
    }

    return { pares, impares, ceros };
  }

  // ---------------- Rango 10–50 ----------------
  static contarEntre10y50(vector: number[]) {
    let contador = 0;

    for (let i = 0; i < vector.length; i++) {
      const num = vector[i];
      if (num >= 10 && num <= 50) contador++;
    }

    return contador;
  }

  // ---------------- Moda (número que más se repite) ----------------
  static calcularModa(vector: number[]) {
    const mapa = new Map<number, number>();

    for (const num of vector) {
      mapa.set(num, (mapa.get(num) || 0) + 1);
    }

    let moda: number | null = null;
    let maxFrecuencia = 1;

    mapa.forEach((frecuencia, numero) => {
      if (frecuencia > maxFrecuencia) {
        moda = numero;
        maxFrecuencia = frecuencia;
      }
    });

    return moda;
  }

  // ---------------- PROCESAR VECTOR COMPLETO ----------------
  static procesarVector(vector: number[]): VectorResults | null {
    if (!this.validateVector(vector)) return null;

    const suma = this.calcularSuma(vector);
    const promedio = this.calcularPromedio(vector);

    const { maximo, minimo, posMax, posMin } =
      this.calcularMaximoMinimo(vector);

    const {
      positivos,
      negativos,
      sumaPositivos,
      sumaNegativos
    } = this.clasificarPositivosNegativos(vector);

    const { pares, impares, ceros } =
      this.contarParImparCeros(vector);

    const promedioPositivos =
      positivos > 0 ? sumaPositivos / positivos : 0;

    const promedioNegativos =
      negativos > 0 ? sumaNegativos / negativos : 0;

    const entre10y50 = this.contarEntre10y50(vector);

    const moda = this.calcularModa(vector);

    return {
      suma,
      promedio,
      maximo,
      minimo,

      positivos,
      negativos,

      pares,
      impares,
      ceros,

      posMax,
      posMin,

      sumaPositivos,
      sumaNegativos,

      promedioPositivos,
      promedioNegativos,

      entre10y50,

      moda,

      vector
    };
  }

  // ---------------- Vector aleatorio ----------------
  static generarVectorAleatorio(
    cantidad: number,
    min: number = -50,
    max: number = 50
  ): number[] {
    const vector: number[] = [];

    for (let i = 0; i < cantidad; i++) {
      const numeroAleatorio =
        Math.floor(Math.random() * (max - min + 1)) + min;

      vector.push(numeroAleatorio);
    }

    return vector;
  }
}
