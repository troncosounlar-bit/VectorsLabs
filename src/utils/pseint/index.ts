// Punto de entrada principal del conversor de PSeInt a JavaScript

import { ConversionResult, ErrorDetail } from './types';
import { convertAlgorithm, convertFunctions } from './converter';

/**
 * Convierte código PSeInt a JavaScript
 * Esta es la función principal que debes usar para convertir pseudocódigo
 */
export function convertPseintToJS(pseudocode: string): ConversionResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const detailedErrors: ErrorDetail[] = [];
  let jsCode = "";

  try {
    // Limpiar el código y remover líneas vacías
    const lines = pseudocode.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Verificar estructura básica
    const hasAlgoritmo = lines.some(line => line.toLowerCase().startsWith('algoritmo'));
    const hasFinAlgoritmo = lines.some(
      line => line.toLowerCase().trim() === 'finalgoritmo'
    );
    
    if (!hasAlgoritmo) {
      errors.push("Falta la declaración 'Algoritmo nombre'");
      detailedErrors.push({
        line: 0,
        code: 'Algoritmo nombre',
        message: "Falta la declaración 'Algoritmo nombre'",
        type: 'structure'
      });
      return { success: false, javascript: "", errors, warnings, detailedErrors };
    }
    
    if (!hasFinAlgoritmo) {
      errors.push("Falta 'FinAlgoritmo' al final");
      detailedErrors.push({
        line: lines.length - 1,
        code: 'Finalgoritmo',
        message: "Falta 'FinAlgoritmo' al final",
        type: 'structure'
      });
    }

    // Encontrar funciones auxiliares (están después de FinAlgoritmo)
    const finAlgoritmoIndex = lines.findIndex(line => line.toLowerCase() === 'finalgoritmo');
    const mainLines = finAlgoritmoIndex >= 0 ? lines.slice(0, finAlgoritmoIndex + 1) : lines;
    const functionLines = finAlgoritmoIndex >= 0 ? lines.slice(finAlgoritmoIndex + 1) : [];

    // Iniciar conversión
    jsCode += "// Código convertido de PSeInt a JavaScript\n";
    jsCode += "// Nota: Los índices de arrays se ajustan de PSeInt (1-N) a JavaScript (0-N-1)\n\n";
    
    // Convertir funciones auxiliares primero (si existen)
    if (functionLines.length > 0) {
      const functionsResult = convertFunctions(functionLines, warnings);
      jsCode += functionsResult;
      if (functionsResult) {
        jsCode += '\n';
      }
    }
    
    // Convertir el algoritmo principal
    const mainResult = convertAlgorithm(mainLines, warnings);
    jsCode += mainResult;

    // Agregar llamada de ejecución al final (fuera de todas las funciones)
    const algorithmNameMatch = lines.find(l => l.toLowerCase().startsWith('algoritmo'));
    if (algorithmNameMatch) {
      const name = algorithmNameMatch.split(/\s+/)[1] || 'programa';
      jsCode += `\n// Ejecutar el algoritmo\n${name}();\n`;
    }

    return {
      success: errors.length === 0,
      javascript: jsCode,
      errors,
      warnings,
      detailedErrors
    };

  } catch (error: unknown) {
    // Validación segura del tipo
    const errorMessage =
      error && typeof error === "object" && "message" in error
        ? (error as { message: string }).message
        : String(error);

    return {
      success: false,
      javascript: "",
      errors: [`Error de conversión: ${errorMessage}`],
      warnings,
      detailedErrors
    };
  }
}

/**
 * Función de ejemplo para probar el conversor
 */
export function getExampleConversion(): ConversionResult {
  const pseudocode = `Algoritmo Ejemplo
    Definir x, y, suma Como Entero
    
    Escribir "Ingresa x:"
    Leer x
    Escribir "Ingresa y:"
    Leer y
    
    suma <- x + y
    Escribir "La suma es:", suma
FinAlgoritmo`;

  return convertPseintToJS(pseudocode);
}

// Exportar tipos para que otros módulos puedan usarlos
export type { ConversionResult, ErrorDetail } from './types';
