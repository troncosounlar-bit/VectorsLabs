"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, Code2, FileCode2, Bug, Lightbulb, X } from "lucide-react";

interface ErrorLike {
  message?: string;
  stack?: string;
}

interface ErrorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: Error | ErrorLike | string | null;
  pseudocode?: string;
  jsCode?: string;
  context?: 'conversion' | 'execution';
}

function getErrorMessage(error: Error | ErrorLike | string | null): string {
  if (!error) return 'Error desconocido';
  if (typeof error === 'string') return error;
  return error.message || String(error);
}

function getErrorStack(error: Error | ErrorLike | string | null): string | undefined {
  if (!error || typeof error === 'string') return undefined;
  return error.stack;
}

export function ErrorDetailModal({
  isOpen,
  onClose,
  error,
  pseudocode = "",
  jsCode = "",
  context = 'execution'
}: ErrorDetailModalProps) {

  const errorMessage = getErrorMessage(error);

  const analyzeError = () => {
    const analysis = {
      location: 'Desconocido',
      cause: 'Error no identificado',
      suggestions: [] as string[],
      affectedCode: '',
      type: 'runtime' as 'syntax' | 'runtime' | 'conversion'
    };

    if (errorMessage.includes('SyntaxError')) {
      analysis.location = 'Código JavaScript generado';
      analysis.cause = 'Error de sintaxis en el código JavaScript convertido';
      analysis.type = 'syntax';
      analysis.suggestions = [
        'Verifica que tu código PSeInt esté correctamente estructurado',
        'Revisa que todas las estructuras de control estén cerradas (FinSi, FinMientras, etc.)',
        'Asegúrate de usar la sintaxis correcta de PSeInt'
      ];
    } else if (errorMessage.includes('ReferenceError') || errorMessage.includes('is not defined')) {
      const match = errorMessage.match(/(\w+) is not defined/);
      const varName = match ? match[1] : 'variable';
      analysis.location = 'Ejecución del código';
      analysis.cause = `La variable "${varName}" no está definida`;
      analysis.type = 'runtime';
      analysis.suggestions = [
        `Declara la variable "${varName}" usando: Definir ${varName} Como Entero`,
        'Verifica que el nombre de la variable esté escrito correctamente',
        'Asegúrate de declarar todas las variables antes de usarlas'
      ];

      const lines = pseudocode.split('\n');
      const foundLine = lines.findIndex(line =>
        line.toLowerCase().includes(varName.toLowerCase()) &&
        !line.toLowerCase().includes('definir')
      );
      if (foundLine !== -1) {
        analysis.affectedCode = `Línea ${foundLine + 1}: ${lines[foundLine].trim()}`;
      }
    } else if (errorMessage.includes('TypeError')) {
      analysis.location = 'Ejecución del código';
      analysis.cause = 'Error de tipo de dato';
      analysis.type = 'runtime';
      analysis.suggestions = [
        'Verifica que estés usando los tipos de datos correctos',
        'Asegúrate de que las variables tengan valores antes de usarlas',
        'Revisa las operaciones matemáticas y lógicas'
      ];
    } else if (errorMessage.includes('NaN') || errorMessage.includes('parseFloat')) {
      analysis.location = 'Entrada de datos';
      analysis.cause = 'Valor no numérico ingresado donde se esperaba un número';
      analysis.type = 'runtime';
      analysis.suggestions = [
        'Asegúrate de ingresar valores numéricos cuando se soliciten',
        'Verifica que los datos de entrada sean del tipo correcto',
        'Considera validar las entradas del usuario'
      ];
    } else if (errorMessage.includes('undefined') && errorMessage.includes('[')) {
      analysis.location = 'Operaciones con arrays/vectores';
      analysis.cause = 'Intento de acceder a un índice fuera del rango del array';
      analysis.type = 'runtime';
      analysis.suggestions = [
        'Verifica que los índices del array estén dentro del rango válido',
        'Recuerda que en JavaScript los arrays empiezan en 0',
        'Asegúrate de que el array esté inicializado antes de usarlo'
      ];
    } else {
      analysis.location = 'Ejecución general';
      analysis.cause = errorMessage;
      analysis.suggestions = [
        'Revisa el código PSeInt en busca de errores lógicos',
        'Verifica que todas las estructuras de control estén correctamente cerradas',
        'Prueba ejecutar el código paso a paso para identificar el problema'
      ];
    }

    return analysis;
  };

  const errorAnalysis = analyzeError();

  const getErrorIcon = () => {
    switch (errorAnalysis.type) {
      case 'syntax': return <Code2 className="w-5 h-5 text-red-600" />;
      case 'conversion': return <FileCode2 className="w-5 h-5 text-orange-600" />;
      case 'runtime': return <Bug className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getErrorTypeLabel = () => {
    switch (errorAnalysis.type) {
      case 'syntax': return 'Error de Sintaxis';
      case 'conversion': return 'Error de Conversión';
      case 'runtime': return 'Error de Ejecución';
      default: return 'Error';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            {getErrorIcon()}
            Análisis Detallado del Error
          </DialogTitle>
          <DialogDescription>
            Información detallada sobre el error encontrado y cómo resolverlo
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tipo de error */}
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              <div className="space-y-1">
                <p className="font-semibold">{getErrorTypeLabel()}</p>
                <p className="text-sm">{errorAnalysis.cause}</p>
              </div>
            </AlertDescription>
          </Alert>

          {/* Ubicación del error */}
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
            <h4 className="flex items-center gap-2 mb-2">
              <Bug className="w-4 h-4 text-orange-600" />
              Ubicación del Error
            </h4>
            <p className="text-sm text-muted-foreground">{errorAnalysis.location}</p>
          </div>

          {/* Código afectado */}
          {errorAnalysis.affectedCode && (
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-red-600" />
                Código Afectado
              </h4>
              <pre className="text-sm font-mono bg-white dark:bg-slate-900 p-2 rounded border">
                {errorAnalysis.affectedCode}
              </pre>
            </div>
          )}

          {/* Mensaje completo */}
          <div className="bg-slate-900 text-slate-50 p-4 rounded-lg">
            <h4 className="flex items-center gap-2 mb-2 text-white">
              <AlertCircle className="w-4 h-4 text-red-400" />
              Mensaje de Error Completo
            </h4>
            <pre className="text-xs overflow-x-auto text-red-300">
              {getErrorMessage(error)}
            </pre>
            {getErrorStack(error) && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                  Ver stack trace completo
                </summary>
                <pre className="text-xs mt-2 text-slate-400 overflow-x-auto">
                  {getErrorStack(error)}
                </pre>
              </details>
            )}
          </div>

          {/* Sugerencias */}
          {errorAnalysis.suggestions.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                Sugerencias para Resolver
              </h4>
              <ul className="space-y-2">
                {errorAnalysis.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Código PSeInt */}
          {context === 'conversion' && pseudocode && (
            <div>
              <h4 className="flex items-center gap-2 mb-2">
                <FileCode2 className="w-4 h-4 text-indigo-600" />
                Tu Código PSeInt
              </h4>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-xs overflow-x-auto max-h-60">
                {pseudocode}
              </pre>
            </div>
          )}

          {/* Código JS generado */}
          {jsCode && context === 'execution' && (
            <details>
              <summary className="cursor-pointer text-sm font-medium flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-indigo-600" />
                Ver Código JavaScript Generado
              </summary>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-xs overflow-x-auto max-h-60 mt-2">
                {jsCode}
              </pre>
            </details>
          )}

          <Alert>
            <Lightbulb className="w-4 h-4 text-yellow-600" />
            <AlertDescription className="text-sm">
              <p className="font-semibold mb-1">Consejos Generales:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Revisa la sintaxis de PSeInt en la sección de Conceptos</li>
                <li>Verifica que todas las variables estén declaradas antes de usarlas</li>
                <li>Asegúrate de cerrar todas las estructuras de control</li>
                <li>Prueba con casos de prueba simples primero</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
