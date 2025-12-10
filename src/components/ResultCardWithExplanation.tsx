import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { Explanation } from "../utils/dynamicExplanations";

interface ResultCardWithExplanationProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  explanation?: Explanation;
  showAllHints?: boolean;
}

export function ResultCardWithExplanation({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  variant = "default",
  explanation,
  showAllHints = false
}: ResultCardWithExplanationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<"pseint" | "javascript">("pseint");
  const [isHovered, setIsHovered] = useState(false);

  const variantClasses = {
    default: "border-border hover:border-blue-400",
    success: "border-green-500 bg-green-50 dark:bg-green-950 hover:border-green-600",
    warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950 hover:border-yellow-600",
    destructive: "border-red-500 bg-red-50 dark:bg-red-950 hover:border-red-600"
  };

  return (
    <>
      <Card 
        className={`${variantClasses[variant]} transition-all hover:shadow-lg cursor-pointer transform hover:scale-105 relative overflow-hidden`}
        onClick={() => explanation && setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm sm:text-base md:text-lg">{title}</CardTitle>
            {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground shrink-0" />}
          </div>
          {description && <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>}
        </CardHeader>
        <CardContent className="pb-4">
          {/* Resultado con efecto de despliegue */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${ isHovered || showAllHints ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="text-2xl sm:text-3xl mb-2 wrap-break-word">{value}</div>
          </div>
          
          {/* Hint con efecto de despliegue */}
          {explanation && (
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isHovered || showAllHints ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-xs text-muted-foreground">
                👆 Click para ver explicación
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {explanation && (
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setCodeLanguage("pseint");
        }}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />}
                <span className="wrap-break-word">{explanation.title}</span>
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">
                Valor calculado: <strong>{value}</strong>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Pasos */}
              <div>
                <h3 className="text-sm sm:text-base mb-2">📋 Pasos del Algoritmo:</h3>
                <div className="space-y-1 bg-muted p-3 rounded-lg max-h-60 overflow-y-auto">
                  {explanation.steps.map((step, index) => (
                    <p key={index} className="text-xs sm:text-sm font-mono wrap-break-word">
                      {step}
                    </p>
                  ))}
                </div>
              </div>

              {/* Código con botón de cambio */}
              <div>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h3 className="text-sm sm:text-base">💻 Código Utilizado:</h3>
                  <Button
                    variant={codeLanguage === "pseint" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCodeLanguage(codeLanguage === "pseint" ? "javascript" : "pseint")}
                    className="text-xs sm:text-sm"
                  >
                    {codeLanguage === "pseint" ? "📘 PSeInt" : "🟨 JavaScript"}
                  </Button>
                </div>
                <pre className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm max-h-80">
                  <code className="wrap-break-word whitespace-pre-wrap">{codeLanguage === "pseint" ? explanation.codePseint : explanation.codeJavaScript}</code>
                </pre>
              </div>

              {/* Estructuras aplicadas */}
              <div>
                <h3 className="text-sm sm:text-base mb-2">🔧 Estructuras Algorítmicas Aplicadas:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded text-xs sm:text-sm">
                    <strong>FOR:</strong> Recorrido del vector
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded text-xs sm:text-sm">
                    <strong>IF:</strong> Condiciones y comparaciones
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded text-xs sm:text-sm">
                    <strong>WHILE:</strong> Validación de datos
                  </div>
                  <div className="bg-pink-100 dark:bg-pink-900 p-2 rounded text-xs sm:text-sm">
                    <strong>Arrays:</strong> Estructura de datos
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
