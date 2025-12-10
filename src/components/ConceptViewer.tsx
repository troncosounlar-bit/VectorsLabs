import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { getCategories, getConceptsByCategory, type Concept } from "../data/concepts";
import { BookOpen, Code2, FileText, Lightbulb } from "lucide-react";

// Paleta de colores tipo ábaco para las tarjetas de conceptos individuales
const CONCEPT_COLORS = [
  { bg: 'bg-red-500', hover: 'hover:bg-red-600', text: 'text-white', border: 'border-red-600', active: 'bg-red-100 dark:bg-red-950 border-red-500' },
  { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', text: 'text-white', border: 'border-orange-600', active: 'bg-orange-100 dark:bg-orange-950 border-orange-500' },
  { bg: 'bg-amber-500', hover: 'hover:bg-amber-600', text: 'text-white', border: 'border-amber-600', active: 'bg-amber-100 dark:bg-amber-950 border-amber-500' },
  { bg: 'bg-green-500', hover: 'hover:bg-green-600', text: 'text-white', border: 'border-green-600', active: 'bg-green-100 dark:bg-green-950 border-green-500' },
  { bg: 'bg-teal-500', hover: 'hover:bg-teal-600', text: 'text-white', border: 'border-teal-600', active: 'bg-teal-100 dark:bg-teal-950 border-teal-500' },
  { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-white', border: 'border-blue-600', active: 'bg-blue-100 dark:bg-blue-950 border-blue-500' },
  { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', text: 'text-white', border: 'border-purple-600', active: 'bg-purple-100 dark:bg-purple-950 border-purple-500' },
  { bg: 'bg-pink-500', hover: 'hover:bg-pink-600', text: 'text-white', border: 'border-pink-600', active: 'bg-pink-100 dark:bg-pink-950 border-pink-500' },
];

// Helper para formatear texto con **texto** a negrita
function formatTextWithBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return (
        <span key={index}>
          <br />
          <strong>{boldText}</strong>
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function ConceptViewer() {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("basico");
  
  const categories = getCategories();
  const conceptsInCategory = getConceptsByCategory(selectedCategory as Concept["category"]);

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-[300px_1fr]">
      {/* Lista de conceptos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            Conceptos
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">Explora los fundamentos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selector de categoría */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm">Categoría:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedConcept(null);
              }}
              className="w-full px-3 py-2 rounded-md border bg-background text-xs sm:text-sm"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de conceptos con colores tipo ábaco */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {conceptsInCategory.map((concept, index) => {
              const color = CONCEPT_COLORS[index % CONCEPT_COLORS.length];
              const isActive = selectedConcept?.id === concept.id;
              
              return (
                <button
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all border-2 ${
                    isActive
                      ? `${color.active} border`
                      : `${color.bg} ${color.text} ${color.border} ${color.hover} shadow-md hover:shadow-lg`
                  }`}
                >
                  <div className="text-xs sm:text-sm">{concept.title}</div>
                  <p className={`text-xs mt-1 ${isActive ? 'text-muted-foreground' : 'opacity-90'}`}>
                    {concept.description}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detalle del concepto */}
      <div>
        {selectedConcept ? (
          <Card>
            <CardHeader>
              <div className="flex items-start sm:items-center justify-between gap-2 flex-col sm:flex-row">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base sm:text-lg md:text-xl wrap-break-word">{selectedConcept.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{selectedConcept.description}</CardDescription>
                </div>
                <Badge variant="outline" className="capitalize text-xs sm:text-sm shrink-0">
                  {selectedConcept.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="explanation">
                <TabsList className="grid w-full grid-cols-3 h-auto">
                  <TabsTrigger value="explanation" className="hover:bg-[#260b17] hover:text-white data-[state=active]:bg-[#1e5b96] data-[state=active]:text-white text-xs sm:text-sm py-2">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Explicación</span>
                    <span className="sm:hidden">Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="pseudocode" className="hover:bg-[#260b17] hover:text-white data-[state=active]:bg-[#1e5b96] data-[state=active]:text-white text-xs sm:text-sm py-2">
                    <Code2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">PSeInt</span>
                    <span className="sm:hidden">PSeInt</span>
                  </TabsTrigger>
                  <TabsTrigger value="javascript" className="hover:bg-[#260b17] hover:text-white data-[state=active]:bg-[#1e5b96] data-[state=active]:text-white text-xs sm:text-sm py-2">
                    <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">JavaScript</span>
                    <span className="sm:hidden">JS</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="explanation" className="space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm">
                    {selectedConcept.explanation.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="whitespace-pre-line wrap-break-word">
                        {formatTextWithBold(paragraph)}
                      </p>
                    ))}
                  </div>

                  {selectedConcept.example && (
                    <div className="mt-4">
                      <h4 className="text-xs sm:text-sm mb-2">
                        <strong>Ejemplo básico:</strong>
                      </h4>
                      <pre className="
                        relative
                        bg-black
                        text-green-400
                        p-3 sm:p-4
                        rounded-lg
                        overflow-x-auto
                        text-xs sm:text-sm
                        font-mono
                        border border-green-500/30
                      ">
                        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[100%_3px]"></div>
                        <code className="wrap-break-word whitespace-pre-wrap">{selectedConcept.example}</code>
                      </pre>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="pseudocode">
                  {selectedConcept.pseudocode ? (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                        <h4 className="text-xs sm:text-sm">Código PSeInt:</h4>
                      </div>
                      <pre className="bg-slate-900 text-slate-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto max-h-96">
                        <code className="wrap-break-word whitespace-pre-wrap">{selectedConcept.pseudocode}</code>
                      </pre>
                      <p className="text-xs text-muted-foreground mt-2">
                        Este código puede ser ejecutado en PSeInt
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
                      No hay pseudocódigo disponible para este concepto
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="javascript">
                  {selectedConcept.realCode ? (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                        <h4 className="text-xs sm:text-sm">Código JavaScript equivalente:</h4>
                      </div>
                      <pre className="bg-slate-900 text-slate-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm overflow-x-auto max-h-96">
                        <code className="wrap-break-word whitespace-pre-wrap">{selectedConcept.realCode}</code>
                      </pre>
                      <p className="text-xs text-muted-foreground mt-2">
                        Así se implementaría en JavaScript
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
                      No hay código JavaScript disponible para este concepto
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 opacity-50" />
                <p className="text-xs sm:text-sm">Selecciona un concepto de la lista para ver su explicación detallada</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
