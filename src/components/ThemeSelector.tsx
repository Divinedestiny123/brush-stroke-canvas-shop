
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/ThemeProvider";
import { Palette, Moon, Sun, Feather, Scroll } from "lucide-react";

export function ThemeSelector() {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      name: "Light",
      value: "light",
      icon: Sun,
    },
    {
      name: "Dark",
      value: "dark",
      icon: Moon,
    },
    {
      name: "Ink",
      value: "ink",
      icon: Feather,
    },
    {
      name: "Parchment",
      value: "parchment",
      icon: Scroll,
    },
    {
      name: "Cherry",
      value: "cherry",
      icon: Palette,
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <Feather className="absolute h-5 w-5 rotate-90 scale-0 transition-all ink:rotate-0 ink:scale-100" />
          <Scroll className="absolute h-5 w-5 rotate-90 scale-0 transition-all parchment:rotate-0 parchment:scale-100" />
          <Palette className="absolute h-5 w-5 rotate-90 scale-0 transition-all cherry:rotate-0 cherry:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => {
          const { name, value, icon: Icon } = theme;
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => {
                setTheme(value as any);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Icon className="h-4 w-4" />
              <span>{name}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
