
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Palette, 
  Eraser, 
  Save, 
  Trash2, 
  Download,
  Paintbrush,
  SlidersHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useTheme } from "@/providers/ThemeProvider";

export function CalligraphyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [showControls, setShowControls] = useState(true);
  const { theme } = useTheme();

  // Colors based on the current theme
  const colorOptions = {
    light: ["#000000", "#8c7851", "#d4b483", "#800000", "#0d47a1"],
    dark: ["#ffffff", "#d4b483", "#8c7851", "#bc8f8f", "#90caf9"],
    ink: ["#ffffff", "#3b82f6", "#60a5fa", "#e2e8f0", "#93c5fd"],
    parchment: ["#4b3621", "#8b4513", "#cd853f", "#800000", "#006400"],
    cherry: ["#4b0000", "#800000", "#bc8f8f", "#000000", "#8b0000"],
  };

  const currentColors = colorOptions[theme as keyof typeof colorOptions] || colorOptions.light;

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    if (!context) return;
    
    // Set canvas size to match container size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // Restore the drawn content
      if (localStorage.getItem("calligraphy-canvas")) {
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0);
        };
        img.src = localStorage.getItem("calligraphy-canvas") || "";
      }
    };
    
    // Set initial canvas size
    resizeCanvas();
    
    // Update canvas size on window resize
    window.addEventListener("resize", resizeCanvas);
    
    // Initialize context settings
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    
    setCtx(context);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Update context when color or brush size changes
  useEffect(() => {
    if (!ctx) return;
    
    if (tool === "brush") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    } else if (tool === "eraser") {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = brushSize * 2;
    }
  }, [color, brushSize, tool, ctx]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx) return;
    
    setIsDrawing(true);
    
    // Get the position
    const { x, y } = getPointerPosition(e);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return;
    
    // Prevent scrolling on touch devices
    if ("touches" in e) {
      e.preventDefault();
    }
    
    // Get the position
    const { x, y } = getPointerPosition(e);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx || !isDrawing) return;
    
    setIsDrawing(false);
    ctx.closePath();
    
    // Save the canvas state to localStorage
    if (canvasRef.current) {
      localStorage.setItem("calligraphy-canvas", canvasRef.current.toDataURL());
    }
  };

  const getPointerPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if ("touches" in e) {
      // Touch event
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    localStorage.removeItem("calligraphy-canvas");
    toast.success("Canvas cleared");
  };

  const saveCanvas = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement("a");
    link.download = "calligraphy-artwork.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast.success("Artwork saved");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="canvas-container relative bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[350px] md:h-[500px] touch-none"
        />
        
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
          onClick={() => setShowControls(!showControls)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      {showControls && (
        <div className="flex flex-wrap gap-2 justify-between items-center bg-card p-3 rounded-lg">
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="flex gap-2 items-center">
                  <Palette className="h-4 w-4" />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="flex gap-2 p-2">
                  {currentColors.map((c) => (
                    <div
                      key={c}
                      className={`w-6 h-6 rounded-full cursor-pointer ${
                        color === c ? "ring-2 ring-primary" : ""
                      }`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full p-2"
                />
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              variant={tool === "brush" ? "default" : "outline"}
              onClick={() => setTool("brush")}
              className="flex gap-2 items-center"
            >
              <Paintbrush className="h-4 w-4" />
              <span className="hidden md:inline">Brush</span>
            </Button>
            
            <Button
              size="sm"
              variant={tool === "eraser" ? "default" : "outline"}
              onClick={() => setTool("eraser")}
              className="flex gap-2 items-center"
            >
              <Eraser className="h-4 w-4" />
              <span className="hidden md:inline">Eraser</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs">Size:</span>
            <Slider
              value={[brushSize]}
              min={1}
              max={30}
              step={1}
              onValueChange={(value) => setBrushSize(value[0])}
              className="w-20 md:w-32"
            />
            <span className="text-xs w-4">{brushSize}</span>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={clearCanvas} className="flex gap-1 items-center">
              <Trash2 className="h-4 w-4" />
              <span className="hidden md:inline">Clear</span>
            </Button>
            
            <Button size="sm" variant="outline" onClick={saveCanvas} className="flex gap-1 items-center">
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Save</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
