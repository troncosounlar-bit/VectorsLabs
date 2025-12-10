// Lógica principal de conversión de PSeInt a JavaScript

import { LineResult } from './types';
import { getIndent } from './helpers';
import { convertCondition } from './expressions';
import {
  convertDefinir,
  convertDimension,
  convertLeer,
  convertEscribir,
  convertAsignacion
} from './statements';
import {
  convertSi,
  convertMientras,
  convertPara,
  convertFuncion
} from './structures';

/**
 * Convierte una línea individual de PSeInt a JavaScript
 */
export function convertLine(
  line: string,
  lineLower: string,
  indentLevel: number,
  declaredVars: Set<string>,
  warnings: string[],
  lineNumber: number
): LineResult {
  const indent = getIndent(indentLevel);
  let newIndentLevel = indentLevel;

  // Definir variables
  if (lineLower.startsWith('definir')) {
    const converted = convertDefinir(line, declaredVars);
    return { code: indent + converted + '\n', newIndentLevel };
  }

  // Dimension (arrays)
  if (lineLower.startsWith('dimension')) {
    const converted = convertDimension(line, declaredVars);
    return { code: indent + converted + '\n', newIndentLevel };
  }

  // Leer
  if (lineLower.startsWith('leer')) {
    warnings.push(`Línea ${lineNumber + 1}: 'Leer' convertido a prompt()`);
    return { code: convertLeer(line, indentLevel, declaredVars), newIndentLevel };
  }

  // Escribir
  if (lineLower.startsWith('escribir')) {
    const converted = convertEscribir(line);
    return { code: indent + converted + '\n', newIndentLevel };
  }

  // Si-Entonces
  if (lineLower.startsWith('si ')) {
    const converted = convertSi(line);
    newIndentLevel++;
    return { code: indent + converted + '\n', newIndentLevel };
  }

  // Sino
  if (lineLower === 'sino') {
    newIndentLevel = Math.max(0, indentLevel - 1);
    const code = getIndent(newIndentLevel) + '} else {\n';
    newIndentLevel++;
    return { code, newIndentLevel };
  }

  // FinSi
  if (lineLower === 'finsi') {
    newIndentLevel = Math.max(0, indentLevel - 1);
    return { code: getIndent(newIndentLevel) + '}\n', newIndentLevel };
  }

  // Mientras
  if (lineLower.startsWith('mientras')) {
    const converted = convertMientras(line);
    newIndentLevel++;
    return { code: indent + converted + '\n', newIndentLevel };
  }

  // FinMientras
  if (lineLower === 'finmientras') {
    newIndentLevel = Math.max(0, indentLevel - 1);
    return { code: getIndent(newIndentLevel) + '}\n', newIndentLevel };
  }

  // Para
  if (lineLower.startsWith('para ')) {
    const converted = convertPara(line, declaredVars);
    if (converted.startsWith('//')) {
      warnings.push(`Línea ${lineNumber + 1}: Estructura Para requiere revisión manual`);
    }
    newIndentLevel++;
    return { code: indent + converted + '\n', newIndentLevel };
  }

  // FinPara
  if (lineLower === 'finpara') {
    newIndentLevel = Math.max(0, indentLevel - 1);
    return { code: getIndent(newIndentLevel) + '}\n', newIndentLevel };
  }

  // Repetir
  if (lineLower === 'repetir') {
    const code = indent + 'do {\n';
    newIndentLevel = indentLevel + 1;
    return { code, newIndentLevel };
  }

  // Hasta Que
  if (lineLower.startsWith('hasta que')) {
    newIndentLevel = Math.max(0, indentLevel - 1);
    const condition = line.replace(/hasta\s+que/i, '').trim();
    const jsCondition = convertCondition(condition);
    return { code: getIndent(newIndentLevel) + `} while (!(${jsCondition}));\n`, newIndentLevel };
  }

  // Asignación (<-)
  if (line.includes('<-')) {
    const converted = convertAsignacion(line, declaredVars);
    return { code: indent + converted + '\n', newIndentLevel };
  }

  // Línea no reconocida
  warnings.push(`Línea ${lineNumber + 1}: "${line}" - requiere revisión manual`);
  return { code: indent + `// ${line}\n`, newIndentLevel };
}

/**
 * Convierte el algoritmo principal
 */
export function convertAlgorithm(lines: string[], warnings: string[]): string {
  let algorithmCode = "";
  let indentLevel = 0;
  const declaredVars = new Set<string>();
  let algorithmName = "programa";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLower = line.toLowerCase();
    
    // Ignorar líneas vacías o comentarios
    if (!line || line.startsWith('//')) {
      algorithmCode += line + '\n';
      continue;
    }

    // Algoritmo - nombre del programa
    if (lineLower.startsWith('algoritmo')) {
      algorithmName = line.split(/\s+/)[1] || 'programa';
      algorithmCode += `// Algoritmo: ${algorithmName}\n`;
      algorithmCode += `function ${algorithmName}() {\n`;
      indentLevel = 1;
      continue;
    }

    // FinAlgoritmo
    if (lineLower === 'finalgoritmo') {
      indentLevel = Math.max(0, indentLevel - 1);
      algorithmCode += getIndent(indentLevel) + '}\n\n';
      continue;
    }

    // Procesar la línea
    const lineResult = convertLine(line, lineLower, indentLevel, declaredVars, warnings, i);
    algorithmCode += lineResult.code;
    indentLevel = lineResult.newIndentLevel;
  }

  return algorithmCode;
}

/**
 * Convierte funciones auxiliares (después de FinAlgoritmo)
 */
export function convertFunctions(lines: string[], warnings: string[]): string {
  let functionsCode = "";
  let indentLevel = 0;
  const declaredVars = new Set<string>();
  let inFunction = false;
  let currentFunctionReturnVar = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLower = line.toLowerCase();
    
    if (!line || line.startsWith('//')) continue;

    // Función
    if (lineLower.startsWith('funcion')) {
      const funcResult = convertFuncion(line);
      if (funcResult.startsWith('//')) {
        warnings.push(`Función en línea ${i + 1}: No se pudo convertir completamente`);
      }
      functionsCode += funcResult + '\n';
      indentLevel = 1;
      inFunction = true;
    
      // Limpiar variables pero después marcar la variable retorno
      declaredVars.clear();
    
      // Extraer variable de retorno (formato estándar "<-")
      let match = line.match(/funcion\s+(\w+)\s*<-/i);
      if (match) {
        currentFunctionReturnVar = match[1];
        declaredVars.add(currentFunctionReturnVar);
        continue;
      }
    
      // Extraer formato alternativo: "Funcion nombre(params) : retorno"
      match = line.match(/funcion\s+\w+\s*\(.*?\)\s*:\s*(\w+)/i);
      if (match) {
        currentFunctionReturnVar = match[1];
        declaredVars.add(currentFunctionReturnVar);
      }
    
      continue;
    }

    // FinFuncion
    if (lineLower === 'finfuncion') {
      if (currentFunctionReturnVar) {
        functionsCode += getIndent(indentLevel) + `return ${currentFunctionReturnVar};\n`;
      }
      indentLevel = Math.max(0, indentLevel - 1);
      functionsCode += getIndent(indentLevel) + '}\n\n';
      inFunction = false;
      currentFunctionReturnVar = "";
      continue;
    }

    if (!inFunction) continue;

    // Procesar línea dentro de función
    const lineResult = convertLine(line, lineLower, indentLevel, declaredVars, warnings, i);
    functionsCode += lineResult.code;
    indentLevel = lineResult.newIndentLevel;
  }

  return functionsCode;
}
