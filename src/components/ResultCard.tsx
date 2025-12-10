// ResultCard component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface ResultCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
}

export function ResultCard({ title, value, description, icon: Icon, variant = "default" }: ResultCardProps) {
  const variantClasses = {
    default: "border-border",
    success: "border-green-500 bg-green-50 dark:bg-green-950",
    warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
    destructive: "border-red-500 bg-red-50 dark:bg-red-950"
  };

  return (
    <Card className={`${variantClasses[variant]} transition-all hover:shadow-md`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl">{value}</div>
      </CardContent>
    </Card>
  );
}
