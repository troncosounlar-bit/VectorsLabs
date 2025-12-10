/**
 * Copia texto al portapapeles con fallback para navegadores que bloquean el API del Clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Intentar usar el API moderno del Clipboard primero
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Si falla, usar el método fallback
      console.warn('Clipboard API falló, usando método alternativo:', err);
    }
  }

  // Método fallback: crear un textarea temporal
  return fallbackCopyToClipboard(text);
}

/**
 * Método fallback para copiar al portapapeles usando el comando execCommand
 */
function fallbackCopyToClipboard(text: string): boolean {
  try {
    // Crear un elemento textarea temporal
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Hacer el textarea invisible pero accesible
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    
    // Seleccionar el texto
    textArea.focus();
    textArea.select();
    
    // Para iOS
    textArea.setSelectionRange(0, 99999);
    
    // Copiar el texto
    const successful = document.execCommand('copy');
    
    // Limpiar
    document.body.removeChild(textArea);
    
    return successful;
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    return false;
  }
}
