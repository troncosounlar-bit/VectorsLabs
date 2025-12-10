// Conversión de expresiones y condiciones de PSeInt a JavaScript

import { replaceBooleans } from './helpers';

/**
 * Convierte una condición de PSeInt a JavaScript
 * Ejemplo: "x > 5 Y y < 10" -> "x > 5 && y < 10"
 */
export function convertCondition(condition: string): string {
  let jsCondition = condition;

  // Primero reemplazar Verdadero / Falso
  jsCondition = replaceBooleans(jsCondition);
  
  // Operadores lógicos
  jsCondition = jsCondition.replace(/\bY\b/gi, '&&');
  jsCondition = jsCondition.replace(/\bO\b/gi, '||');
  jsCondition = jsCondition.replace(/\bNO\b/gi, '!');
  
  // Comparaciones
  jsCondition = jsCondition.replace(/<>/g, '!=');
  jsCondition = jsCondition.replace(/([^!<>=])=([^=])/g, '$1==$2');
  
  // MOD
  jsCondition = jsCondition.replace(/\bMOD\b/gi, '%');
  
  return jsCondition;
}

/**
 * Convierte una expresión de PSeInt a JavaScript
 * Ejemplo: "x MOD 2" -> "x % 2"
 */
export function convertExpression(expr: string): string {
  let jsExpr = expr;
  
  // MOD
  jsExpr = jsExpr.replace(/\bMOD\b/gi, '%');
  
  // Operadores lógicos
  jsExpr = jsExpr.replace(/\bY\b/gi, '&&');
  jsExpr = jsExpr.replace(/\bO\b/gi, '||');
  jsExpr = jsExpr.replace(/\bNO\b/gi, '!');
  
  // Verdadero/Falso
  jsExpr = jsExpr.replace(/\bVerdadero\b/gi, 'true');
  jsExpr = jsExpr.replace(/\bFalso\b/gi, 'false');

  // azar(n) → Math.floor(Math.random() * n)
  jsExpr = jsExpr.replace(/azar\s*\(\s*(.+?)\s*\)/gi, "Math.floor(Math.random() * ($1))");

  // Potencia: ^ → **
  jsExpr = jsExpr.replace(/\^/g, '**');
  
  return jsExpr;
}
