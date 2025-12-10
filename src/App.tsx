import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { NumberInput } from "./components/NumberInput";
import { VectorDisplay } from "./components/VectorDisplay";
import { ResultCardWithExplanation } from "./components/ResultCardWithExplanation";
import {
  VectorProcessor,
  VectorResults,
} from "./utils/vectorProcessor";
import { CodePlayground } from "./components/CodePlayground";
import { ConceptViewer } from "./components/ConceptViewer";
import { ExerciseList } from "./components/ExerciseList";
import {
  Calculator,
  TrendingUp,
  ArrowUpCircle,
  ArrowDownCircle,
  PlusCircle,
  MinusCircle,
  Sparkles,
  Edit3,
  Code2,
  BookOpen,
  Target,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./components/ui/alert";
import {
  getSumaExplanation,
  getPromedioExplanation,
  getMaximoExplanation,
  getMinimoExplanation,
  getPositivosExplanation,
  getNegativosExplanation,
  getParesExplanation,
  getImparesExplanation,
  getCerosExplanation,
  getGenericExplanation,
} from "./utils/dynamicExplanations";

export default function App() {
  const [cantidad, setCantidad] = useState<number>(10);
  const [vector, setVector] = useState<number[]>([]);
  const [manualVector, setManualVector] = useState<number[]>(
    [],
  );
  const [resultados, setResultados] =
    useState<VectorResults | null>(null);
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [showAllHints, setShowAllHints] = useState<boolean>(false);

  const handleGenerarAleatorio = () => {
    if (cantidad < 1 || cantidad > 100) {
      alert("Por favor ingresa una cantidad entre 1 y 100");
      return;
    }

    const nuevoVector = VectorProcessor.generarVectorAleatorio(
      cantidad,
      -50,
      50,
    );
    setVector(nuevoVector);
    setResultados(null);
  };

  const handleProcesar = () => {
    const vectorAProcesar =
      mode === "auto" ? vector : manualVector;

    if (vectorAProcesar.length === 0) {
      alert("Por favor genera o ingresa números primero");
      return;
    }

    const resultado =
      VectorProcessor.procesarVector(vectorAProcesar);

    if (resultado) {
      setResultados(resultado);
    } else {
      alert("Error al procesar el vector");
    }
  };

  const handleAgregarNumeroManual = (numero: number) => {
    if (manualVector.length < 100) {
      setManualVector([...manualVector, numero]);
    }
  };

  const handleLimpiarManual = () => {
    setManualVector([]);
    setResultados(null);
  };

  const handleLimpiarTodo = () => {
    setVector([]);
    setManualVector([]);
    setResultados(null);
    setCantidad(10);
  };

  const vectorActual = mode === "auto" ? vector : manualVector;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#3980c4] to-[#3980c4] dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Header */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center w-full text-center">
          {/* Logo Vector Lab */}
          <div className="flex justify-center items-center order-1 md:order-1">
            <img
              src="/LogoVL.png"
              alt="LOGO VECTOR LAB"
              className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-[0_0_8px_white]"
            />
          </div>

          {/* Texto descriptivo */}
          <div className="flex flex-col items-center px-2 sm:px-4 order-3 md:order-2 col-span-2 md:col-span-1">
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg">
              Plataforma completa de aprendizaje algorítmico
            </p>
            <p className="text-white text-xs sm:text-sm mt-1 max-w-md">
              Procesador de vectores, conceptos teóricos, ejercicios prácticos y playground de código
            </p>
          </div>

          {/* Logo TUI */}
          <div className="flex justify-center items-center order-2 md:order-3">
            <img
              src="/LogoTUI.png"
              alt="LOGO TUI"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain drop-shadow-[0_0_8px_white]"
            />
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="procesador" className="space-y-4 sm:space-y-6">
          <TabsList
            className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto gap-1 sm:gap-0"
            style={{ backgroundColor: "rgba(104,104,104,0.6)" }}
          >
            <TabsTrigger
              value="procesador"
              className="
                flex flex-col items-center gap-1 py-2 sm:py-3 px-2
                text-white text-xs sm:text-sm
                hover:bg-[#260b17]
                data-[state=active]:bg-[#1e5b96]
                data-[state=active]:text-white
                transition-colors duration-200
              "
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-xs">Procesador</span>
            </TabsTrigger>
        
            <TabsTrigger
              value="conceptos"
              className="
                flex flex-col items-center gap-1 py-2 sm:py-3 px-2
                text-white text-xs sm:text-sm
                hover:bg-[#260b17]
                data-[state=active]:bg-[#1e5b96]
                data-[state=active]:text-white
                transition-colors duration-200
              "
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-xs">Conceptos</span>
            </TabsTrigger>
        
            <TabsTrigger
              value="ejercicios"
              className="
                flex flex-col items-center gap-1 py-2 sm:py-3 px-2
                text-white text-xs sm:text-sm
                hover:bg-[#260b17]
                data-[state=active]:bg-[#1e5b96]
                data-[state=active]:text-white
                transition-colors duration-200
              "
            >
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-xs">Ejercicios</span>
            </TabsTrigger>
        
            <TabsTrigger
              value="playground"
              className="
                flex flex-col items-center gap-1 py-2 sm:py-3 px-2
                text-white text-xs sm:text-sm
                hover:bg-[#260b17]
                data-[state=active]:bg-[#1e5b96]
                data-[state=active]:text-white
                transition-colors duration-200
              "
            >
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-xs">Playground</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Pestaña: Procesador de Vectores */}
          <TabsContent value="procesador" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl">Configuración del Vector</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Elige cómo deseas crear tu vector de números
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs
                  value={mode}
                  onValueChange={(v) =>
                    setMode(v as "auto" | "manual")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="auto"
                      className="hover:bg-[#260b17] hover:text-white data-[state=active]:bg-[#1e5b96] data-[state=active]:text-white text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Generación Automática</span>
                      <span className="sm:hidden">Automático</span>
                    </TabsTrigger>
                  
                    <TabsTrigger
                      value="manual"
                      className="hover:bg-[#260b17] hover:text-white data-[state=active]:bg-[#1e5b96] data-[state=active]:text-white text-xs sm:text-sm"
                    >
                      <span className="hidden sm:inline">Entrada Manual</span>
                      <span className="sm:hidden">Manual</span>
                    </TabsTrigger>
                  </TabsList>


                  {/* -------------------- MODO AUTOMÁTICO -------------------- */}
                  <TabsContent
                    value="auto"
                    className="space-y-4"
                  >
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 placeholder:text-neutral-600 text-black font-semibold">
                      <NumberInput
                        label="Cantidad de elementos"
                        value={cantidad}
                        onChange={setCantidad}
                        placeholder="Ingresa un número"
                        min={1}
                        max={100}
                      />

                      <div className="flex items-end">
                        <Button
                          onClick={handleGenerarAleatorio}
                          className="w-full bg-[#343434] hover:bg-[#2a2a2a] text-white text-xs sm:text-sm"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generar Aleatorio
                        </Button>
                      </div>
                    </div>

                    <Alert>
                      <AlertTitle className="text-sm sm:text-base">
                        Generación Automática
                      </AlertTitle>
                      <AlertDescription className="text-xs sm:text-sm">
                        Se generarán números aleatorios entre
                        -50 y 50
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  {/* -------------------- MODO MANUAL -------------------- */}
                  <TabsContent
                    value="manual"
                    className="space-y-4"
                  >
                    <ManualInput
                      onAdd={handleAgregarNumeroManual}
                      onClear={handleLimpiarManual}
                      count={manualVector.length}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* -------------------- VECTOR DISPLAY -------------------- */}
            {vectorActual.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl">Vector Actual</CardTitle>
                </CardHeader>

                <CardContent>
                  <VectorDisplay
                    vector={vectorActual}
                    title=""
                  />

                  <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center">
                    <Button
                      onClick={handleProcesar}
                      size="lg"
                      className="bg-[#343434] hover:bg-[#2a2a2a] text-white w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Procesar Vector
                    </Button>

                    <Button
                      onClick={handleLimpiarTodo}
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      Limpiar Todo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* -------------------- RESULTADOS -------------------- */}
            {resultados && (
              <div className="space-y-4">
                <h2 className="text-center text-white text-xl sm:text-2xl md:text-3xl mt-6 sm:mt-10 mb-4 sm:mb-10">
                  Resultados del Procesamiento
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                  <p className="text-center sm:text-left text-white text-xs sm:text-sm flex-1">
                    💡 Haz click en cualquier tarjeta para ver cómo se calculó
                  </p>
                  <label className="flex items-center gap-2 text-white text-xs sm:text-sm cursor-pointer bg-white/10 px-3 sm:px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={showAllHints}
                      onChange={(e) => setShowAllHints(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span>Mostrar todo</span>
                  </label>
                </div>

                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <ResultCardWithExplanation
                    title="Suma Total"
                    value={resultados.suma}
                    description="Suma de todos los elementos"
                    icon={Calculator}
                    variant="default"
                    explanation={getSumaExplanation(vectorActual, resultados.suma)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Promedio"
                    value={Number.isFinite(resultados.promedio) ? resultados.promedio.toFixed(2) : '—'}
                    description="Media aritmética"
                    icon={TrendingUp}
                    variant="default"
                    explanation={getPromedioExplanation(vectorActual, resultados.suma, resultados.promedio)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Máximo"
                    value={resultados.maximo}
                    description="Valor más alto"
                    icon={ArrowUpCircle}
                    variant="success"
                    explanation={getMaximoExplanation(vectorActual, resultados.maximo)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Mínimo"
                    value={resultados.minimo}
                    description="Valor más bajo"
                    icon={ArrowDownCircle}
                    variant="destructive"
                    explanation={getMinimoExplanation(vectorActual, resultados.minimo)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Positivos"
                    value={resultados.positivos}
                    description="Números ≥ 0"
                    icon={PlusCircle}
                    variant="success"
                    explanation={getPositivosExplanation(vectorActual, resultados.positivos)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Negativos"
                    value={resultados.negativos}
                    description="Números < 0"
                    icon={MinusCircle}
                    variant="destructive"
                    explanation={getNegativosExplanation(vectorActual, resultados.negativos)}
                    showAllHints={showAllHints}
                  />
                
                  {/* ----- Nuevos: pares / impares / ceros ----- */}
                  <ResultCardWithExplanation
                    title="Pares"
                    value={resultados.pares}
                    description="Cantidad de números pares"
                    icon={PlusCircle}
                    variant="default"
                    explanation={getParesExplanation(vectorActual, resultados.pares)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Impares"
                    value={resultados.impares}
                    description="Cantidad de números impares"
                    icon={MinusCircle}
                    variant="default"
                    explanation={getImparesExplanation(vectorActual, resultados.impares)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Ceros"
                    value={resultados.ceros}
                    description="Valores iguales a 0"
                    icon={MinusCircle}
                    variant="warning"
                    explanation={getCerosExplanation(vectorActual, resultados.ceros)}
                    showAllHints={showAllHints}
                  />
                
                  {/* ----- Posiciones ----- */}
                  <ResultCardWithExplanation
                    title="Posición del Máximo"
                    value={resultados.posMax}
                    description="Índice donde aparece el máximo (0-based)"
                    icon={ArrowUpCircle}
                    variant="default"
                    explanation={getGenericExplanation("Posición del Máximo", vectorActual, resultados.posMax)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Posición del Mínimo"
                    value={resultados.posMin}
                    description="Índice donde aparece el mínimo (0-based)"
                    icon={ArrowDownCircle}
                    variant="default"
                    explanation={getGenericExplanation("Posicin del Mínimo", vectorActual, resultados.posMin)}
                    showAllHints={showAllHints}
                  />
                
                  {/* ----- Sumas y promedios por signo ----- */}
                  <ResultCardWithExplanation
                    title="Suma de Positivos"
                    value={resultados.sumaPositivos}
                    description="Total de números ≥ 0"
                    icon={TrendingUp}
                    variant="success"
                    explanation={getGenericExplanation("Suma de Positivos", vectorActual, resultados.sumaPositivos)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Suma de Negativos"
                    value={resultados.sumaNegativos}
                    description="Total de números < 0"
                    icon={TrendingUp}
                    variant="destructive"
                    explanation={getGenericExplanation("Suma de Negativos", vectorActual, resultados.sumaNegativos)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Promedio Positivos"
                    value={Number.isFinite(resultados.promedioPositivos) ? resultados.promedioPositivos.toFixed(2) : '—'}
                    description="Media de valores positivos"
                    icon={Calculator}
                    variant="success"
                    explanation={getGenericExplanation("Promedio Positivos", vectorActual, resultados.promedioPositivos.toFixed(2))}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Promedio Negativos"
                    value={Number.isFinite(resultados.promedioNegativos) ? resultados.promedioNegativos.toFixed(2) : '—'}
                    description="Media de valores negativos"
                    icon={Calculator}
                    variant="destructive"
                    explanation={getGenericExplanation("Promedio Negativos", vectorActual, resultados.promedioNegativos.toFixed(2))}
                    showAllHints={showAllHints}
                  />
                
                  {/* ----- Rango y moda ----- */}
                  <ResultCardWithExplanation
                    title="Entre 10 y 50"
                    value={resultados.entre10y50}
                    description="Valores dentro del rango 10–50"
                    icon={Target}
                    variant="default"
                    explanation={getGenericExplanation("Entre 10 y 50", vectorActual, resultados.entre10y50)}
                    showAllHints={showAllHints}
                  />
                
                  <ResultCardWithExplanation
                    title="Moda"
                    value={resultados.moda ?? "—"}
                    description="Número que más se repite"
                    icon={Calculator}
                    variant="default"
                    explanation={getGenericExplanation("Moda", vectorActual, resultados.moda ?? "—")}
                    showAllHints={showAllHints}
                  />
                </div>
              </div>
            )}
          </TabsContent>

          {/* Pestaña: Conceptos Teóricos */}
          <TabsContent value="conceptos">
            <ConceptViewer />
          </TabsContent>


        {/* Pestaña: Ejercicios Prácticos */}
          <TabsContent value="ejercicios">
            <ExerciseList />
          </TabsContent>

          {/* Pestaña: Playground de Código */}
          <TabsContent value="playground">
            <CodePlayground />
          </TabsContent>
        </Tabs>

      {/* Footer */}
      <div className="text-center text-white">
        <div className="flex justify-center mb-2">
          <img
            src="/LogoUni.png"
            alt="Universidad Nacional de La Rioja"
            className="h-24 drop-shadow-[1px_1px_12px_white]"
          />
        </div>
      
        <p className="font-medium mt-4">
          VectorLab © 2025 - Plataforma educativa de
          Algoritmos y Estructuras de Datos
        </p>
        
        <p className="text-xs mt-1 font-medium">
          Versión 2.0 - Ahora con Playground, Conceptos y
          Ejercicios
        </p>
      </div>
      </div>
    </div>
  );
}

// Componente para entrada manual
function ManualInput({
  onAdd,
  onClear,
  count,
}: {
  onAdd: (num: number) => void;
  onClear: () => void;
  count: number;
}) {
  const [inputValue, setInputValue] = useState<number>(0);

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue(0);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <NumberInput
            label="Número a agregar"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Ingresa un número"
          />
        </div>
        <div className="flex items-end gap-2">
          <Button
            onClick={handleAdd}
            className="flex-1 bg-[#343434] hover:bg-[#2a2a2a] text-white text-xs sm:text-sm"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs sm:text-sm">
          Elementos agregados: {count}
        </p>
        {count > 0 && (
          <Button onClick={onClear} variant="outline" size="sm" className="text-xs sm:text-sm">
            Limpiar
          </Button>
        )}
      </div>
    </div>
  );
}

