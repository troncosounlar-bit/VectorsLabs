import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

export function NumberInput({ label, value, onChange, placeholder, min, max }: NumberInputProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full"
      />
    </div>
  );
}
