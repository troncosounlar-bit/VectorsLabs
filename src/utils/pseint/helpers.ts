// Funciones auxiliares para el conversor de PSeInt

/**
 * Reemplaza las palabras clave booleanas de PSeInt por las de JavaScript
 */
export function replaceBooleans(text: string): string {
  return text
    .replace(/verdadero/gi, "true")
    .replace(/falso/gi, "false");
}

/**
 * Genera la indentación correcta según el nivel
 */
export function getIndent(level: number): string {
  const safeLevel = Math.max(0, level);
  return '  '.repeat(safeLevel);
}
