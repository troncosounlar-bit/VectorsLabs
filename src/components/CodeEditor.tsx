// CodeEditor.tsx
import React, { useRef, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
}

const KEYWORDS = [
  "Algoritmo", "FinAlgoritmo",
  "Definir", "Como", "Entero", "Real", "Caracter", "Logico",
  "Dimension",
  "Leer", "Escribir",
  "Si", "Entonces", "Sino", "FinSi",
  "Segun", "Hacer", "De", "Otro", "Modo", "FinSegun",
  "Mientras", "FinMientras",
  "Para", "Hasta", "Con", "Paso", "FinPara",
  "Repetir", "Que",
  "Funcion", "FinFuncion",
  "Verdadero", "Falso",
  "Y", "O", "NO", "MOD"
];

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightSyntax(code: string): string {
  let out = escapeHtml(code);

  // Strings
  out = out.replace(/"(?:[^"\\]|\\.)*"/g, (m) =>
    `<span style="color:#22c55e;">${escapeHtml(m)}</span>`
  );

  // Comentarios
  out = out.replace(/\/\/(.*)$/gm, (m) =>
    `<span style="color:#9ca3af; font-style:italic;">${escapeHtml(m)}</span>`
  );

  // Asignación <-
  out = out.replace(/&lt;-/g, `<span style="color:#a855f7;">&lt;-</span>`);

  // Números
  out = out.replace(/\b(\d+(?:\.\d+)?)\b/g, (m) =>
    `<span style="color:#f59e0b;">${m}</span>`
  );

  // Palabras clave
  KEYWORDS.forEach((kw) => {
    const regex = new RegExp(`\\b(${kw})\\b`, "gi");
    out = out.replace(regex, (m) =>
      `<span style="color:#3b82f6; font-weight:700;">${m}</span>`
    );
  });

  return out;
}

export function CodeEditor({
  value,
  onChange,
  placeholder = "Escribe tu código aquí…",
  label = "Editor de Código",
  rows = 15,
}: CodeEditorProps) {
  const highlighted = highlightSyntax(value || "");
  
  // ✅ Calcular líneas reales (incluyendo líneas vacías dentro del código)
  // Si value está vacío, mostrar al menos 1 línea
  const lines = value ? value.split("\n") : [""];
  const lineCount = lines.length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  
  // ✅ CONSTANTES PARA SINCRONIZACIÓN PERFECTA
  const LINE_HEIGHT = 24; // px - altura exacta de cada línea
  const PADDING_Y = 12; // px - padding vertical (py-3 = 12px)

  // Sincronizar scroll
  useEffect(() => {
    const ta = textAreaRef.current;
    const pre = preRef.current;
    const lineNums = lineNumbersRef.current;
    if (!ta || !pre || !lineNums) return;

    const sync = () => {
      pre.scrollTop = ta.scrollTop;
      pre.scrollLeft = ta.scrollLeft;
      lineNums.scrollTop = ta.scrollTop;
    };
    ta.addEventListener("scroll", sync);
    return () => ta.removeEventListener("scroll", sync);
  }, []);

  return (
    <div className="space-y-2">
      {label && <Label className="text-base">{label}</Label>}

      <div className="flex bg-white dark:bg-[#0f0f0f] rounded-md border">
        {/* NÚMEROS DE LÍNEA */}
        <div
          ref={lineNumbersRef}
          className="
            bg-slate-50 dark:bg-slate-900
            border-r border-slate-200 dark:border-slate-700
            font-mono text-sm
            text-slate-400 dark:text-slate-600
            select-none
            overflow-hidden
          "
          style={{
            minWidth: '48px',
            paddingTop: `${PADDING_Y}px`,
            paddingBottom: `${PADDING_Y}px`,
            paddingLeft: '12px',
            paddingRight: '12px',
            lineHeight: `${LINE_HEIGHT}px`,
          }}
        >
          {lineNumbers.map((num) => (
            <div 
              key={num} 
              className="text-right"
              style={{ 
                height: `${LINE_HEIGHT}px`,
                lineHeight: `${LINE_HEIGHT}px`,
              }}
            >
              {num}
            </div>
          ))}
        </div>

        {/* CONTENEDOR DEL EDITOR */}
        <div className="relative flex-1 overflow-hidden">
          {/* CAPA DE COLOREADO */}
          <pre
            ref={preRef}
            aria-hidden
            className="
              absolute inset-0 
              font-mono text-sm
              whitespace-pre-wrap
              overflow-auto
            "
            style={{
              minHeight: `${rows * LINE_HEIGHT + PADDING_Y * 2}px`,
              padding: `${PADDING_Y}px 12px`,
              lineHeight: `${LINE_HEIGHT}px`,
              color: "#111",
            }}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />

          {/* TEXTAREA REAL */}
          <Textarea
            ref={textAreaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            spellCheck={false}
            className="
              font-mono text-sm resize-none
              relative bg-transparent
              text-transparent caret-black
              selection:bg-blue-600/30
            "
            style={{
              minHeight: `${rows * LINE_HEIGHT + PADDING_Y * 2}px`,
              padding: `${PADDING_Y}px 12px`,
              lineHeight: `${LINE_HEIGHT}px`,
              whiteSpace: "pre-wrap",
            }}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {value.split("\n").length} líneas | {value.length} caracteres
      </p>
    </div>
  );
}