import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Code2, ChevronDown, ChevronRight } from "lucide-react";

interface Command {
  name: string;
  syntax: string;
  description: string;
  example: string;
}

interface CommandCategory {
  name: string;
  icon: string;
  commands: Command[];
}

interface CommandPaletteProps {
  onInsertCommand: (syntax: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const commandCategories: CommandCategory[] = [
  {
    name: "Entrada/Salida",
    icon: "📝",
    commands: [
      {
        name: "Escribir",
        syntax: "Escribir ",
        description: "Muestra texto o valores en pantalla",
        example: 'Escribir "Hola Mundo"'
      },
      {
        name: "Leer",
        syntax: "Leer ",
        description: "Lee un valor ingresado por el usuario",
        example: "Leer numero"
      }
    ]
  },
  {
    name: "Básico",
    icon: "⚙️",
    commands: [
      {
        name: "Asignar",
        syntax: " <- ",
        description: "Asigna un valor a una variable",
        example: "edad <- 25"
      }
    ]
  },
  {
    name: "Condicionales",
    icon: "🔀",
    commands: [
      {
        name: "Si-Entonces",
        syntax: "Si  Entonces\n\t\nFinSi",
        description: "Ejecuta código si una condición es verdadera",
        example: "Si edad >= 18 Entonces\n\tEscribir 'Mayor de edad'\nFinSi"
      },
      {
        name: "Según",
        syntax: "Segun  Hacer\n\t:\n\t\t\nDe Otro Modo:\n\t\t\nFinSegun",
        description: "Evalúa múltiples casos",
        example: "Segun opcion Hacer\n\t1: Escribir 'Uno'\n\t2: Escribir 'Dos'\nFinSegun"
      }
    ]
  },
  {
    name: "Bucles",
    icon: "🔁",
    commands: [
      {
        name: "Mientras",
        syntax: "Mientras  Hacer\n\t\nFinMientras",
        description: "Repite mientras la condición sea verdadera",
        example: "Mientras i < 10 Hacer\n\ti <- i + 1\nFinMientras"
      },
      {
        name: "Repetir",
        syntax: "Repetir\n\t\nHasta Que ",
        description: "Repite hasta que la condición sea verdadera",
        example: "Repetir\n\tLeer numero\nHasta Que numero > 0"
      },
      {
        name: "Para",
        syntax: "Para  <-  Hasta  Hacer\n\t\nFinPara",
        description: "Repite un número específico de veces",
        example: "Para i <- 1 Hasta 10 Hacer\n\tEscribir i\nFinPara"
      }
    ]
  },
  {
    name: "Funciones",
    icon: "🔧",
    commands: [
      {
        name: "Función",
        syntax: "Funcion retorno <- NombreFuncion(parametros)\n\t\nFinFuncion",
        description: "Define una función reutilizable",
        example: "Funcion resultado <- Sumar(a, b)\n\tresultado <- a + b\nFinFuncion"
      }
    ]
  }
];

export function CommandPalette({ onInsertCommand, isOpen, onToggle }: CommandPaletteProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Entrada/Salida"]));

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <div className="relative">
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="mb-4"
      >
        <Code2 className="w-4 h-4 mr-2" />
        {isOpen ? "Ocultar" : "Mostrar"} Comandos PSeInt
      </Button>

      {isOpen && (
        <Card className="mb-4 border-indigo-200 dark:border-indigo-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-600" />
              Comandos PSeInt
            </CardTitle>
            <CardDescription className="text-xs">
              Click en un comando para insertarlo en el editor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 max-h-96 overflow-y-auto">
            {commandCategories.map(category => (
              <div key={category.name} className="border rounded-lg">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full px-3 py-2 flex items-center justify-between hover:bg-muted transition-colors rounded-t-lg"
                >
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                  {expandedCategories.has(category.name) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {expandedCategories.has(category.name) && (
                  <div className="px-2 pb-2 space-y-1">
                    {category.commands.map(command => (
                      <button
                        key={command.name}
                        onClick={() => onInsertCommand(command.syntax)}
                        className="w-full text-left px-3 py-2 rounded bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm group-hover:text-indigo-600">
                            {command.name}
                          </span>
                          <Code2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {command.description}
                        </p>
                        <code className="text-xs bg-background px-2 py-1 rounded mt-1 block font-mono">
                          {command.example}
                        </code>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
