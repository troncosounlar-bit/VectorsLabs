import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";
import { Play, AlertCircle, CheckCircle2, Terminal } from "lucide-react";

interface ExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  jsCode: string;
  algorithmName: string;
}

interface LogEntry {
  type: "output" | "input" | "error";
  message: string;
  timestamp: number;
}

export function ExecutionModal({ isOpen, onClose, jsCode, algorithmName }: ExecutionModalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [inputResolver, setInputResolver] = useState<((value: string) => void) | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [hasError, setHasError] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const hasExecutedRef = useRef(false); // Evita doble ejecución

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const addLog = useCallback((type: LogEntry["type"], message: string) => {
    setLogs((prev) => [...prev, { type, message, timestamp: Date.now() }]);
  }, []);

  const customPrompt = useCallback((message: string): Promise<string> => {
    return new Promise((resolve) => {
      setCurrentPrompt(message);
      setIsWaitingForInput(true);
      setInputResolver(() => resolve);
    });
  }, []);

  const handleInputSubmit = useCallback(() => {
    if (inputResolver) {
      addLog("input", `Usuario ingresó: ${inputValue}`);
      inputResolver(inputValue);
      setInputResolver(null);
      setCurrentPrompt("");
      setInputValue("");
      setIsWaitingForInput(false);
    }
  }, [inputResolver, inputValue, addLog]);

  const executeCode = useCallback(async () => {
    setLogs([]);
    setIsRunning(true);
    setHasError(false);

    try {
      addLog("output", `🚀 Iniciando ejecución: ${algorithmName}`);
      addLog("output", "─".repeat(50));

      const customLog = (...args: unknown[]) => {
        const message = args
          .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
          .join(" ");
        addLog("output", message);
      };

      let finalCode = jsCode;

      // Reemplazo de prompt/console.log
      finalCode = finalCode.replace(
        /parseFloat\s*\(\s*prompt\s*\(([^)]*)\)\s*\)/g,
        "parseFloat(await customPrompt($1))"
      );
      finalCode = finalCode.replace(
        /Number\s*\(\s*prompt\s*\(([^)]*)\)\s*\)/g,
        "Number(await customPrompt($1))"
      );
      finalCode = finalCode.replace(/\bprompt\s*\(([\s\S]*?)\)/g, "await customPrompt($1)");
      finalCode = finalCode.replace(/console\.log\((.*?)\);/g, "customLog($1);");
      finalCode = finalCode.replace(
        new RegExp(`\\b${algorithmName}\\s*\\([^)]*\\)\\s*;`, "g"),
        "// [Llamada eliminada para prevenir doble ejecución]"
      );
      finalCode = finalCode.replace(
        new RegExp(`(function\\s+${algorithmName}\\s*\\()`, "g"),
        "async function " + algorithmName + "("
      );

      const asyncFunction = new Function(
        "customPrompt",
        "customLog",
        `
        return (async () => {
          ${finalCode}

          if (typeof ${algorithmName} === "function") {
            await ${algorithmName}();
          }
        })();
      `
      );

      await asyncFunction(customPrompt, customLog);

      addLog("output", "─".repeat(50));
      addLog("output", "✅ Ejecución completada exitosamente");
      setIsRunning(false);
    } catch (error: unknown) {
      // ✅ Eliminamos 'any' y usamos tipo seguro
      const errorMessage = error instanceof Error ? error.message : String(error);
      addLog("error", `❌ Error: ${errorMessage}`);
      setHasError(true);
      setIsRunning(false);
    }
  }, [jsCode, algorithmName, addLog, customPrompt]);

  // Control de ejecución única y reseteo al cerrar
  useEffect(() => {
    if (isOpen && jsCode && !hasExecutedRef.current) {
      hasExecutedRef.current = true;
      const timer = setTimeout(() => executeCode(), 0);
      return () => clearTimeout(timer);
    }

    if (!isOpen) {
      hasExecutedRef.current = false;
      queueMicrotask(() => {
        setLogs([]);
        setIsWaitingForInput(false);
        setInputValue("");
        setCurrentPrompt("");
        setIsRunning(false);
        setHasError(false);
      });
    }
  }, [isOpen, jsCode, executeCode]);

  const handleClose = useCallback(() => {
    setLogs([]);
    setIsWaitingForInput(false);
    setInputValue("");
    setCurrentPrompt("");
    setIsRunning(false);
    setHasError(false);
    hasExecutedRef.current = false;
    onClose();
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-2 text-sm sm:text-base wrap-break-word pr-8">
            <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
            <span className="truncate">Ejecución: {algorithmName}</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Salida del programa en tiempo real
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 flex-1 overflow-hidden flex flex-col min-h-0">
          {/* Área de logs */}
          <div className="shrink-0 w-full">
            <ScrollArea className="h-[300px] rounded-lg border bg-slate-900 p-2 sm:p-3 w-full overflow-x-auto">
              <div className="space-y-1 sm:space-y-2 font-mono text-xs sm:text-sm w-full">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-1 sm:gap-2 w-full ${
                      log.type === "error"
                        ? "text-red-400"
                        : log.type === "input"
                        ? "text-cyan-400"
                        : "text-green-400"
                    }`}
                  >
                    <span
                      className="text-slate-500 text-xs shrink-0"
                      style={{ minWidth: "36px", textAlign: "right" }}
                    >
                      {index + 1}.
                    </span>
                    <span className="flex-1 whitespace-pre-wrap wrap-break-word min-w-0">{log.message}</span>
                  </div>
                ))}

                {isRunning && !isWaitingForInput && (
                  <div className="flex items-center gap-2 text-yellow-400 animate-pulse">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                    <span className="text-xs sm:text-sm">Ejecutando...</span>
                  </div>
                )}
              </div>
              <div ref={logsEndRef} className="h-0"></div>
            </ScrollArea>
          </div>

          {/* Entrada de usuario */}
          {isWaitingForInput && (
            <Alert className="border-indigo-500 bg-indigo-50 dark:bg-indigo-950 w-full shrink-0">
              <AlertCircle className="w-4 h-4 text-indigo-600 shrink-0" />
              <AlertDescription className="w-full">
                <div className="space-y-2 sm:space-y-3 mt-2 w-full">
                  <Label htmlFor="runtime-input" className="text-xs sm:text-sm md:text-base wrap-break-word">
                    {currentPrompt}
                  </Label>
                  <div className="flex gap-2 w-full">
                    <Input
                      id="runtime-input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleInputSubmit()}
                      placeholder="Ingresa el valor..."
                      autoFocus
                      className="flex-1 min-w-0 text-xs sm:text-sm"
                    />
                    <Button onClick={handleInputSubmit} size="sm" className="shrink-0 text-xs sm:text-sm">
                      Enviar
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Resumen */}
          {!isRunning && logs.length > 0 && (
            <Alert
              className={`${
                hasError
                  ? "border-red-500 bg-red-50 dark:bg-red-950"
                  : "border-green-500 bg-green-50 dark:bg-green-950"
              } w-full shrink-0`}
            >
              {hasError ? (
                <>
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <AlertDescription className="text-xs sm:text-sm">
                    El programa terminó con errores. Revisa la salida anterior.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <AlertDescription className="text-xs sm:text-sm">
                    Programa ejecutado exitosamente.
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 w-full shrink-0">
            {!isRunning && logs.length > 0 && (
              <Button onClick={executeCode} variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Ejecutar de nuevo
              </Button>
            )}
            <Button onClick={handleClose} variant="secondary" className="w-full sm:w-auto text-xs sm:text-sm">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
