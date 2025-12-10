// FlowchartViewer component
import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { generateFlowchart, drawFlowchart, FlowchartData } from "../utils/flowchartGenerator";
import { FileCode2 } from "lucide-react";

interface FlowchartViewerProps {
  pseudocode: string;
}

export function FlowchartViewer({ pseudocode }: FlowchartViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !pseudocode.trim()) return;

    try {
      const flowchartData: FlowchartData = generateFlowchart(pseudocode);
      drawFlowchart(canvasRef.current, flowchartData, 1);
    } catch (error) {
      console.error("Error generando diagrama:", error);
    }
  }, [pseudocode]);

  if (!pseudocode.trim()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5" />
            Diagrama de Flujo
          </CardTitle>
          <CardDescription>
            Escribe código PSeInt para ver el diagrama
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
            <p className="text-muted-foreground">No hay código para visualizar</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode2 className="w-5 h-5 text-indigo-600" />
          Diagrama de Flujo
        </CardTitle>
        <CardDescription>
          Representación visual del algoritmo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg p-4 border overflow-auto">
          <canvas
            ref={canvasRef}
            className="mx-auto"
            style={{ maxWidth: '100%' }}
          />
        </div>
        
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="text-sm mb-2">Leyenda:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600"></div>
              <span>Inicio/Fin</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500"></div>
              <span>Proceso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-500 transform rotate-45"></div>
              <span>Decisión</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 transform skew-x-12"></div>
              <span>Entrada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 transform skew-x-12"></div>
              <span>Salida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-pink-500"></div>
              <span>Bucle</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
