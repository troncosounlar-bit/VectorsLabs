// Conversión de declaraciones básicas de PSeInt a JavaScript

import { getIndent, replaceBooleans } from './helpers';
import { convertExpression } from './expressions';

/**
 * Convierte una declaración de variables: Definir x, y Como Entero
 */
export function convertDefinir(line: string, declaredVars: Set<string>): string {
  const parts = line.split(/\s+Como\s+/i);
  const vars = parts[0].replace(/definir/i, '').trim();

  // Separar variables y filtrar las que no están declaradas aún
  const varsList = vars.split(',').map(v => v.trim()).filter(v => v);
  const newVars = varsList.filter(v => !declaredVars.has(v));

  // Agregar todas al set de declaradas
  varsList.forEach(v => declaredVars.add(v));

  if (newVars.length === 0) return ''; // nada que declarar
  return `let ${[...new Set(newVars)].join(', ')};`;
}

/**
 * Convierte una dimensión de array: Dimension arr[10]
 */
export function convertDimension(line: string, declaredVars: Set<string>): string {
  // Dimension arr[10] -> let arr = new Array(10);
  // NOTA: En PSeInt los índices van de 1 a N, en JS de 0 a N-1
  const match = line.match(/dimension\s+(\w+)\[(\d+)\]/i);
  if (match) {
    const [, varName, size] = match;
    
    if (declaredVars.has(varName)) {
      return `${varName} = new Array(${size});`;
    } else {
      declaredVars.add(varName);
      return `let ${varName} = new Array(${size});`;
    }
  }
  return `// ${line}`;
}

/**
 * Convierte una instrucción Leer a prompt()
 */
export function convertLeer(line: string, currentIndent: number, declaredVars: Set<string>): string {
  // Leer x -> x = parseFloat(prompt("Ingresa x:"));
  const vars = line.replace(/leer/i, '').trim();
  const varList = vars.split(',').map(v => v.trim());
  
  const indent = getIndent(currentIndent);
  
  if (varList.length === 1) {
    const varName = varList[0];
    // Detectar si es un array con índice
    const arrayMatch = varName.match(/(\w+)\[(.+)\]/);
    if (arrayMatch) {
      const [, arrName, index] = arrayMatch;
      return `${indent}${arrName}[${index}] = parseFloat(prompt("Ingresa valor:"));\n`;
    }

    // Declarar automáticamente si no existe
    const decl = declaredVars.has(varName) ? '' : 'let ';
    declaredVars.add(varName);
    
    return `${indent}${varName} = parseFloat(prompt("Ingresa ${varName}:"));\n`;
  } else {
    return varList
      .map(v => {
            const decl = declaredVars.has(v) ? '' : 'let ';
            declaredVars.add(v);
            return `${indent}${decl}${v} = parseFloat(prompt("Ingresa ${v}:"));`;
        })
      .join('\n') + '\n';
  }
}

/**
 * Convierte una instrucción Escribir a console.log()
 */
export function convertEscribir(line: string): string {
  // Escribir "Hola", x -> console.log("Hola", x);
  const content = line.replace(/escribir/i, '').trim();
  return `console.log(${content});`;
}

/**
 * Convierte una asignación: x <- 5
 */

export function convertAsignacion(
  line: string,
  declaredVars: Set<string>,
  forceDeclareOutside: boolean = false
): string {
  const [left, right] = line.split('<-').map(s => s.trim());

  let jsRight = convertExpression(right);
  jsRight = replaceBooleans(jsRight);

  // Declarar variable si no existía y no es un array indexado
  let decl = '';
  if (!left.includes('[')) {   // <-- aquí la clave
    if (!declaredVars.has(left)) {
      declaredVars.add(left);
      decl = forceDeclareOutside ? '' : 'let ';
    }
  }

  return `${decl}${left} = ${jsRight};`;
}
