interface VectorDisplayProps {
  vector: number[];
  title?: string;
}

// Paleta de colores tipo ábaco - 12 colores vibrantes (SOLO PARA POSITIVOS)
const ABACUS_COLORS = [
  { bg: 'bg-red-500', text: 'text-white', border: 'border-red-600', shadow: 'shadow-lg' },
  { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-600', shadow: 'shadow-lg' },
  { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-600', shadow: 'shadow-lg' },
  { bg: 'bg-yellow-500', text: 'text-gray-900', border: 'border-yellow-600', shadow: 'shadow-lg' },
  { bg: 'bg-lime-500', text: 'text-gray-900', border: 'border-lime-600', shadow: 'shadow-lg' },
  { bg: 'bg-green-500', text: 'text-white', border: 'border-green-600', shadow: 'shadow-lg' },
  { bg: 'bg-teal-500', text: 'text-white', border: 'border-teal-600', shadow: 'shadow-lg' },
  { bg: 'bg-cyan-500', text: 'text-white', border: 'border-cyan-600', shadow: 'shadow-lg' },
  { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600', shadow: 'shadow-lg' },
  { bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-600', shadow: 'shadow-lg' },
  { bg: 'bg-pink-500', text: 'text-white', border: 'border-pink-600', shadow: 'shadow-lg' },
  { bg: 'bg-rose-500', text: 'text-white', border: 'border-rose-600', shadow: 'shadow-lg' },
];

export function VectorDisplay({ vector, title = "Vector Generado" }: VectorDisplayProps) {
  if (vector.length === 0) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-center text-sm sm:text-base">{title}</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
        {vector.map((num, index) => {
          // Si es negativo, usar negro. Si es positivo, usar color del ábaco
          const isNegative = num < 0;
          const color = isNegative 
            ? { bg: 'bg-gray-900', text: 'text-white', border: 'border-gray-950', shadow: 'shadow-lg' }
            : ABACUS_COLORS[index % ABACUS_COLORS.length];
          
          return (
            <div
              key={index}
              className={`px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-3 rounded-xl transition-all hover:scale-110 border-2 ${color.bg} ${color.text} ${color.border} ${color.shadow}`}
            >
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <span className="opacity-70 text-[0.65rem] sm:text-xs">[{index}]</span>
                <span className="text-base sm:text-lg md:text-xl" style={{ fontWeight: '700' }}>{num}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-muted-foreground text-xs sm:text-sm">
        Total de elementos: {vector.length}
      </p>
    </div>
  );
}