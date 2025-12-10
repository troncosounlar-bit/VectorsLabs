import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { CodeEditor } from "./CodeEditor";
import { CommandPalette } from "./CommandPalette";
import { FlowchartViewer } from "./FlowchartViewer";
import { ExecutionModal } from "./ExecutionModal";
import { convertPseintToJS } from "../utils/pseintToJS";
import { copyToClipboard } from "../utils/clipboard";
import { Code2, Play, FileCode2, Eye, AlertCircle, CheckCircle2 } from "lucide-react";

const INITIAL_CODE = `Algoritmo sin_titulo
\t
FinAlgoritmo`;

export function CodePlayground() {
  const [pseudocode, setPseudocode] = useState(INITIAL_CODE);
  const [jsCode, setJsCode] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [conversionSuccess, setConversionSuccess] = useState(false);
  const [showConversionMessage, setShowConversionMessage] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showExecutionModal, setShowExecutionModal] = useState(false);
  const [executionCode, setExecutionCode] = useState("");
  const [copied, setCopied] = useState(false);

  const getAlgorithmName = () => {
    const match = pseudocode.match(/Algoritmo\s+(\w+)/i);
    return match ? match[1] : 'sin_titulo';
  };

  const handleConvert = () => {
    const result = convertPseintToJS(pseudocode);
    setJsCode(result.javascript);
    setErrors(result.errors);
    setWarnings(result.warnings);
    setConversionSuccess(result.success);
    setShowConversionMessage(true);
  };

  const handleInsertCommand = (syntax: string) => {
    const lines = pseudocode.split('\n');
    const finAlgoritmoIndex = lines.findIndex(line => line.toLowerCase().trim() === 'finalgoritmo');
    if (finAlgoritmoIndex !== -1) {
      lines.splice(finAlgoritmoIndex, 0, '\t' + syntax);
    } else {
      lines.push(syntax);
    }
    setPseudocode(lines.join('\n'));
  };

  const handleRunCode = () => {
    const result = convertPseintToJS(pseudocode);
    setJsCode(result.javascript);
    setErrors(result.errors);
    setWarnings([]);
    setConversionSuccess(result.success);
    setShowConversionMessage(false);
    if (result.success && result.javascript) {
      setExecutionCode(result.javascript);
      setShowExecutionModal(true);
    }
  };

  const handleCloseExecutionModal = () => {
    setShowExecutionModal(false);
    setExecutionCode("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600" />
            Playground Interactivo
          </CardTitle>
          <CardDescription>
            Escribe código PSeInt, conviértelo a JavaScript y visualiza el diagrama de flujo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="editor" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="editor" 
                className="hover:bg-[#260b17] hover:text-white data-[state=active]:bg-[#1e5b96] data-[state=active]:text-white"
              >
                <FileCode2 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Editor PSeInt</span>
                <span className="sm:hidden">PSeInt</span>
              </TabsTrigger>
            
              <TabsTrigger 
                value="javascript" 
                className="hover:bg-[#260b17] hover:text-white data-[state=active]:bg-[#1e5b96] data-[state=active]:text-white"
              >
                <Code2 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">JavaScript</span>
                <span className="sm:hidden">JS</span>
              </TabsTrigger>
            
              <TabsTrigger 
                value="flowchart" 
                className="hover:bg-[#260b17] hover:text-white data-[state=active]:bg-[#1e5b96] data-[state=active]:text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Diagramas</span>
                <span className="sm:hidden">DF</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-4">
              <CommandPalette
                onInsertCommand={handleInsertCommand}
                isOpen={showCommandPalette}
                onToggle={() => setShowCommandPalette(!showCommandPalette)}
              />

              <CodeEditor
                value={pseudocode}
                onChange={setPseudocode}
                label="Pseudocódigo PSeInt"
                placeholder="Escribe tu algoritmo en PSeInt..."
                rows={20}
              />

              <div className="flex gap-2">
                <Button onClick={handleConvert}>
                  <Play className="w-4 h-4 mr-2" />
                  Convertir a JavaScript
                </Button>
                <Button onClick={handleRunCode} variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Ejecutar
                </Button>
              </div>

              {showConversionMessage && conversionSuccess && (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <AlertDescription>
                    ¡Conversión exitosa! Revisa la pestaña "JavaScript" para ver el código convertido.
                  </AlertDescription>
                </Alert>
              )}

              {errors.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    <strong>Errores encontrados:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {warnings.length > 0 && (
                <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <AlertDescription>
                    <strong>Advertencias:</strong>
                    <ul className="list-disc list-inside mt-2 text-sm">
                      {warnings.map((warning, i) => (
                        <li key={i}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="javascript" className="space-y-4">
              {jsCode ? (
                <>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{jsCode}</code>
                    </pre>
                  </div>
                  
                  <Alert>
                    <AlertDescription>
                      Este código JavaScript es una traducción del pseudocódigo PSeInt. 
                      Puedes copiarlo y ejecutarlo en la consola del navegador o en Node.js.
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        copyToClipboard(jsCode);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      variant="outline"
                    >
                      {copied ? 'Copiado!' : 'Copiar Código'}
                    </Button>
                    <Button onClick={handleRunCode}>
                      <Play className="w-4 h-4 mr-2" />
                      Ejecutar
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileCode2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Escribe código PSeInt y haz click en "Convertir a JavaScript"</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="flowchart">
              <FlowchartViewer pseudocode={pseudocode} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ExecutionModal
        isOpen={showExecutionModal}
        onClose={handleCloseExecutionModal}
        jsCode={executionCode}
        algorithmName={getAlgorithmName()}
      />

      <Card className="bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="text-base">Guía Rápida</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p><strong>Paso 1:</strong> Escribe tu algoritmo en la pestaña "Editor PSeInt"</p>
          <p><strong>Paso 2:</strong> Usa el panel de "Comandos PSeInt" para insertar estructuras rápidamente</p>
          <p><strong>Paso 3:</strong> Click en "Convertir a JavaScript" para ver la traducción</p>
          <p><strong>Paso 4:</strong> Revisa el diagrama de flujo en la pestaña "Diagrama"</p>
          <p><strong>Paso 5:</strong> Ejecuta el código con el botón "Ejecutar"</p>
        </CardContent>
      </Card>
    </div>
  );
}
