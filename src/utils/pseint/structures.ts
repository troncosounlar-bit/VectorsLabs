// Conversión de estructuras de control de PSeInt a JavaScript

import { replaceBooleans } from './helpers';
import { convertCondition, convertExpression } from './expressions';

/**
 * Convierte una estructura Si-Entonces
 */
export function convertSi(line: string): string {
  let condition = line.replace(/si/i, '').replace(/entonces/i, '').trim();

  // Reemplazar Verdadero / Falso
  condition = replaceBooleans(condition);

  const jsCondition = convertCondition(condition);
  return `if (${jsCondition}) {`;
}

/**
 * Convierte una estructura Mientras
 */
export function convertMientras(line: string): string {
  // Mientras x < 10 Hacer -> while (x < 10) {
  const condition = line.replace(/mientras/i, '').replace(/hacer/i, '').trim();
  const jsCondition = convertCondition(condition);
  return `while (${jsCondition}) {`;
}

/**
 * Convierte una estructura Para
 */
export function convertPara(line: string, declaredVars: Set<string>): string {
  // Acepta:
  // Para i <- 1 Hasta 10 Con Paso 1 Hacer
  // Para i = 1 Hasta 10 Con Paso 1 Hacer;
  // PARA i = 1 HASTA 10 HACER
  // (con variaciones de espacios)
  
  const match = line.match(
    /para\s+(\w+)\s*(?:<-|=)\s*(.+?)\s+hasta\s+(.+?)(?:\s+con\s+paso\s+(.+?))?\s+hacer;?/i
  );

  if (!match) {
    return `// Para no convertido: ${line}`;
  }

  const [, variable, inicio, fin, paso] = match;

  const inicioJS = convertExpression(inicio.trim());
  const finJS = convertExpression(fin.trim());
  const pasoJS = convertExpression((paso || '1').trim());

  const varDeclaration = declaredVars.has(variable) ? '' : 'let ';

  return `for (${varDeclaration}${variable} = ${inicioJS}; ${variable} <= ${finJS}; ${variable} += ${pasoJS}) {`;
}

/**
 * Convierte una declaración de Función
 */
export function convertFuncion(line: string): string {
  // Formato 1: Funcion retorno <- Nombre(param)
  let match = line.match(/funcion\s+(\w+)\s*<-\s*(\w+)\s*\((.*?)\)/i);
  if (match) {
    const [, retorno, nombre, params] = match;
    return `function ${nombre}(${params}) {\n  let ${retorno};`;
  }

  // Formato 2: Funcion Nombre(param) : retorno
  match = line.match(/funcion\s+(\w+)\s*\((.*?)\)\s*:\s*(\w+)/i);
  if (match) {
    const [, nombre, params, retorno] = match;
    return `function ${nombre}(${params}) {\n  let ${retorno};`;
  }

  // Formato 3: Funcion retorno<-Nombre(param) (sin espacios)
  match = line.match(/funcion\s+(\w+)<-\s*(\w+)\s*\((.*?)\)/i);
  if (match) {
    const [, retorno, nombre, params] = match;
    return `function ${nombre}(${params}) {\n  let ${retorno};`;
  }

  return `// Función no convertida: ${line}`;
}
