import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { exercises, getFilteredExercises, type Exercise } from "../data/exercises";
import { CheckCircle2, Circle, Code2, Lightbulb, Target, Copy, Check } from "lucide-react";
import { copyToClipboard } from "../utils/clipboard";

export function ExerciseList() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Exercise["difficulty"] | "">("");
  const [selectedCategory, setSelectedCategory] = useState<Exercise["category"] | "">("");
  const [copied, setCopied] = useState(false);

  const filteredExercises = getFilteredExercises(
    selectedDifficulty || undefined,
    selectedCategory || undefined
  );

  const getDifficultyColor = (difficulty: Exercise["difficulty"]) => {
    switch (difficulty) {
      case "facil": return "bg-green-500";
      case "medio": return "bg-yellow-500";
      case "dificil": return "bg-red-500";
    }
  };

  const getDifficultyLabel = (difficulty: Exercise["difficulty"]) => {
    switch (difficulty) {
      case "facil": return "Fácil";
      case "medio": return "Medio";
      case "dificil": return "Difícil";
    }
  };

  const getCategoryLabel = (category: Exercise["category"]) => {
    switch (category) {
      case "basico": return "Básico";
      case "condicionales": return "Condicionales";
      case "bucles": return "Bucles";
      case "arrays": return "Arrays";
      case "funciones": return "Funciones";
    }
  };

  const handleCopySolution = async () => {
    if (selectedExercise?.solution) {
      const success = await copyToClipboard(selectedExercise.solution);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm mb-2 block">Dificultad:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Exercise["difficulty"] | "")}
              className="w-full px-3 py-2 rounded-md border bg-background"
            >
              <option value="">Todas</option>
              <option value="facil">Fácil</option>
              <option value="medio">Medio</option>
              <option value="dificil">Difícil</option>
            </select>
          </div>

          <div>
            <label className="text-sm mb-2 block">Categoría:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Exercise["category"] | "")}
              className="w-full px-3 py-2 rounded-md border bg-background"
            >
              <option value="">Todas</option>
              <option value="basico">Básico</option>
              <option value="condicionales">Condicionales</option>
              <option value="bucles">Bucles</option>
              <option value="arrays">Arrays</option>
              <option value="funciones">Funciones</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de ejercicios */}
      <div className="grid gap-4">
        {filteredExercises.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No hay ejercicios que coincidan con los filtros seleccionados
            </CardContent>
          </Card>
        ) : (
          filteredExercises.map(exercise => (
            <Card 
              key={exercise.id} 
              className="hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedExercise(exercise);
                setShowSolution(false);
              }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Circle className="w-5 h-5 text-muted-foreground" />
                      {exercise.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {exercise.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white`}>
                      {getDifficultyLabel(exercise.difficulty)}
                    </Badge>
                    <Badge variant="outline">
                      {getCategoryLabel(exercise.category)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>

      {/* Modal de detalle del ejercicio */}
      <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedExercise && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={`${getDifficultyColor(selectedExercise.difficulty)} text-white`}>
                    {getDifficultyLabel(selectedExercise.difficulty)}
                  </Badge>
                  <Badge variant="outline">
                    {getCategoryLabel(selectedExercise.category)}
                  </Badge>
                </div>
                <DialogTitle>{selectedExercise.title}</DialogTitle>
                <DialogDescription>{selectedExercise.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Instrucciones */}
                <div>
                  <h4 className="text-sm mb-2 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    Instrucciones:
                  </h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {selectedExercise.instructions.map((instruction, i) => (
                      <li key={i}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {/* Pistas */}
                <div>
                  <h4 className="text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                    Pistas:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedExercise.hints.map((hint, i) => (
                      <li key={i}>{hint}</li>
                    ))}
                  </ul>
                </div>

                {/* Salida esperada */}
                <div>
                  <h4 className="text-sm mb-2">Salida Esperada:</h4>
                  <pre className="bg-muted p-3 rounded-lg text-sm">
                    {selectedExercise.expectedOutput}
                  </pre>
                </div>

                {/* Casos de prueba */}
                <div>
                  <h4 className="text-sm mb-2">Casos de Prueba:</h4>
                  <div className="space-y-2">
                    {selectedExercise.testCases.map((testCase, i) => (
                      <div key={i} className="bg-muted p-3 rounded-lg text-sm">
                        <div><strong>Entrada:</strong> {testCase.input}</div>
                        <div><strong>Salida esperada:</strong> {testCase.expectedOutput}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón para mostrar solución */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button
                    onClick={() => setShowSolution(!showSolution)}
                    variant={showSolution ? "destructive" : "default"}
                  >
                    {showSolution ? "Ocultar Solución" : "Ver Solución"}
                  </Button>
                  {!showSolution && (
                    <p className="text-xs text-muted-foreground">
                      Intenta resolverlo primero antes de ver la solución
                    </p>
                  )}
                </div>

                {/* Solución */}
                {showSolution && (
                  <div className="border-t pt-4">
                    <h4 className="text-sm mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Solución:
                    </h4>
                    <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{selectedExercise.solution}</code>
                    </pre>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        Esta es una posible solución. Puede haber otras formas de resolver el ejercicio.
                      </p>
                      <Button
                        onClick={handleCopySolution}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-indigo-600" />
                        )}
                        {copied ? "Copiado" : "Copiar"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}