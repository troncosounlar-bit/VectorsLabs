// Generador de diagramas de flujo desde pseudocódigo

export interface FlowchartNode {
  id: string;
  type: 'start' | 'end' | 'process' | 'decision' | 'input' | 'output' | 'loop';
  label: string;
  x: number;
  y: number;
  connections: string[]; // IDs de nodos conectados
  yesLabel?: string;
  noLabel?: string;
}

export interface FlowchartData {
  nodes: FlowchartNode[];
  width: number;
  height: number;
}

export function generateFlowchart(pseudocode: string): FlowchartData {
  const nodes: FlowchartNode[] = [];
  const lines = pseudocode.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  let nodeId = 0;
  let yPosition = 50;
  const xCenter = 400;
  const ySpacing = 120;
  
  const getNextId = () => `node-${nodeId++}`;
  
  // Nodo de inicio
  const startNode: FlowchartNode = {
    id: getNextId(),
    type: 'start',
    label: 'Inicio',
    x: xCenter,
    y: yPosition,
    connections: []
  };
  nodes.push(startNode);
  yPosition += ySpacing;
  
  let previousNodeId = startNode.id;
  const decisionStack: string[] = []; // Para manejar estructuras anidadas
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLower = line.toLowerCase();
    
    // Ignorar declaraciones de algoritmo y fin
    if (lineLower.startsWith('algoritmo') || lineLower === 'finalgoritmo') continue;
    
    // Ignorar declaraciones de variables (Definir, Dimension)
    if (lineLower.startsWith('definir') || lineLower.startsWith('dimension')) continue;
    
    // Leer (Input)
    if (lineLower.startsWith('leer')) {
      const vars = line.replace(/leer/i, '').trim();
      const inputNode: FlowchartNode = {
        id: getNextId(),
        type: 'input',
        label: `Leer ${vars}`,
        x: xCenter,
        y: yPosition,
        connections: []
      };
      nodes.push(inputNode);
      
      const prevNode = nodes.find(n => n.id === previousNodeId);
      if (prevNode) prevNode.connections.push(inputNode.id);
      
      previousNodeId = inputNode.id;
      yPosition += ySpacing;
      continue;
    }
    
    // Escribir (Output)
    if (lineLower.startsWith('escribir')) {
      const content = line.replace(/escribir/i, '').trim();
      const outputNode: FlowchartNode = {
        id: getNextId(),
        type: 'output',
        label: `Escribir ${content}`,
        x: xCenter,
        y: yPosition,
        connections: []
      };
      nodes.push(outputNode);
      
      const prevNode = nodes.find(n => n.id === previousNodeId);
      if (prevNode) prevNode.connections.push(outputNode.id);
      
      previousNodeId = outputNode.id;
      yPosition += ySpacing;
      continue;
    }
    
    // Asignación (Process)
    if (line.includes('<-')) {
      const processNode: FlowchartNode = {
        id: getNextId(),
        type: 'process',
        label: line.replace('<-', '='),
        x: xCenter,
        y: yPosition,
        connections: []
      };
      nodes.push(processNode);
      
      const prevNode = nodes.find(n => n.id === previousNodeId);
      if (prevNode) prevNode.connections.push(processNode.id);
      
      previousNodeId = processNode.id;
      yPosition += ySpacing;
      continue;
    }
    
    // Si-Entonces (Decision)
    if (lineLower.startsWith('si ')) {
      const condition = line.replace(/si/i, '').replace(/entonces/i, '').trim();
      const decisionNode: FlowchartNode = {
        id: getNextId(),
        type: 'decision',
        label: condition,
        x: xCenter,
        y: yPosition,
        connections: [],
        yesLabel: 'Sí',
        noLabel: 'No'
      };
      nodes.push(decisionNode);
      
      const prevNode = nodes.find(n => n.id === previousNodeId);
      if (prevNode) prevNode.connections.push(decisionNode.id);
      
      decisionStack.push(decisionNode.id);
      previousNodeId = decisionNode.id;
      yPosition += ySpacing;
      continue;
    }
    
    // Sino / FinSi
    if (lineLower === 'sino' || lineLower === 'finsi') {
      if (decisionStack.length > 0) decisionStack.pop();
      continue;
    }
    
    // Mientras (Loop)
    if (lineLower.startsWith('mientras')) {
      const condition = line.replace(/mientras/i, '').replace(/hacer/i, '').trim();
      const loopNode: FlowchartNode = {
        id: getNextId(),
        type: 'loop',
        label: `Mientras ${condition}`,
        x: xCenter,
        y: yPosition,
        connections: []
      };
      nodes.push(loopNode);
      
      const prevNode = nodes.find(n => n.id === previousNodeId);
      if (prevNode) prevNode.connections.push(loopNode.id);
      
      previousNodeId = loopNode.id;
      yPosition += ySpacing;
      continue;
    }
    
    // Para (Loop)
    if (lineLower.startsWith('para ')) {
      const loopDef = line.replace(/hacer/i, '').trim();
      const loopNode: FlowchartNode = {
        id: getNextId(),
        type: 'loop',
        label: loopDef,
        x: xCenter,
        y: yPosition,
        connections: []
      };
      nodes.push(loopNode);
      
      const prevNode = nodes.find(n => n.id === previousNodeId);
      if (prevNode) prevNode.connections.push(loopNode.id);
      
      previousNodeId = loopNode.id;
      yPosition += ySpacing;
      continue;
    }
    
    // Repetir (Loop)
    if (lineLower === 'repetir') {
      const loopNode: FlowchartNode = {
        id: getNextId(),
        type: 'loop',
        label: 'Repetir',
        x: xCenter,
        y: yPosition,
        connections: []
      };
      nodes.push(loopNode);
      
      const prevNode = nodes.find(n => n.id === previousNodeId);
      if (prevNode) prevNode.connections.push(loopNode.id);
      
      previousNodeId = loopNode.id;
      yPosition += ySpacing;
      continue;
    }
  }
  
  // Nodo de fin
  const endNode: FlowchartNode = {
    id: getNextId(),
    type: 'end',
    label: 'Fin',
    x: xCenter,
    y: yPosition,
    connections: []
  };
  nodes.push(endNode);
  
  const lastNode = nodes.find(n => n.id === previousNodeId);
  if (lastNode) lastNode.connections.push(endNode.id);
  
  return {
    nodes,
    width: 800,
    height: yPosition + 100
  };
}

// Función para dibujar el diagrama en un canvas
export function drawFlowchart(
  canvas: HTMLCanvasElement, 
  flowchartData: FlowchartData,
  scale: number = 1
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  canvas.width = flowchartData.width * scale;
  canvas.height = flowchartData.height * scale;
  
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.scale(scale, scale);
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 2;
  
  flowchartData.nodes.forEach(node => {
    node.connections.forEach(targetId => {
      const targetNode = flowchartData.nodes.find(n => n.id === targetId);
      if (targetNode) drawConnection(ctx, node, targetNode);
    });
  });
  
  flowchartData.nodes.forEach(node => drawNode(ctx, node));
}

function drawConnection(
  ctx: CanvasRenderingContext2D, 
  from: FlowchartNode, 
  to: FlowchartNode
): void {
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2;
  
  const fromY = from.y + getNodeHeight(from.type) / 2;
  const toY = to.y - getNodeHeight(to.type) / 2;
  
  ctx.beginPath();
  ctx.moveTo(from.x, fromY);
  ctx.lineTo(to.x, toY);
  ctx.stroke();
  
  drawArrow(ctx, from.x, fromY, to.x, toY);
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): void {
  const headLength = 10;
  const angle = Math.atan2(toY - fromY, toX - fromX);
  
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

function drawNode(ctx: CanvasRenderingContext2D, node: FlowchartNode): void {
  const width = 160;
  const height = getNodeHeight(node.type);
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  switch (node.type) {
    case 'start':
    case 'end':
      drawOval(ctx, node.x, node.y, width, height, '#9333EA');
      break;
    case 'process':
      drawRectangle(ctx, node.x, node.y, width, height, '#EAB308');
      break;
    case 'decision':
      drawDiamond(ctx, node.x, node.y, width, height, '#06B6D4');
      break;
    case 'input':
      drawParallelogram(ctx, node.x, node.y, width, height, '#EF4444');
      break;
    case 'output':
      drawParallelogram(ctx, node.x, node.y, width, height, '#10B981');
      break;
    case 'loop':
      drawHexagon(ctx, node.x, node.y, width, height, '#EC4899');
      break;
  }
  
  ctx.fillStyle = node.type === 'process' || node.type === 'decision' ? '#000000' : '#FFFFFF';
  wrapText(ctx, node.label, node.x, node.y, width - 20, 16);
}

// Dibujar formas sin el textColor no usado
function drawOval(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillColor: string): void {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = '#000000';
  
  ctx.beginPath();
  ctx.ellipse(x, y, width / 2, height / 2, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function drawRectangle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillColor: string): void {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = '#000000';
  
  ctx.fillRect(x - width / 2, y - height / 2, width, height);
  ctx.strokeRect(x - width / 2, y - height / 2, width, height);
}

function drawDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillColor: string): void {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = '#000000';
  
  ctx.beginPath();
  ctx.moveTo(x, y - height / 2);
  ctx.lineTo(x + width / 2, y);
  ctx.lineTo(x, y + height / 2);
  ctx.lineTo(x - width / 2, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawParallelogram(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillColor: string): void {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = '#000000';
  
  const offset = 20;
  ctx.beginPath();
  ctx.moveTo(x - width / 2 + offset, y - height / 2);
  ctx.lineTo(x + width / 2, y - height / 2);
  ctx.lineTo(x + width / 2 - offset, y + height / 2);
  ctx.lineTo(x - width / 2, y + height / 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawHexagon(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, fillColor: string): void {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = '#000000';
  
  const offset = width / 4;
  ctx.beginPath();
  ctx.moveTo(x - width / 2 + offset, y - height / 2);
  ctx.lineTo(x + width / 2 - offset, y - height / 2);
  ctx.lineTo(x + width / 2, y);
  ctx.lineTo(x + width / 2 - offset, y + height / 2);
  ctx.lineTo(x - width / 2 + offset, y + height / 2);
  ctx.lineTo(x - width / 2, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function getNodeHeight(type: FlowchartNode['type']): number {
  switch (type) {
    case 'start':
    case 'end':
      return 60;
    case 'decision':
      return 80;
    default:
      return 60;
  }
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): void {
  const words = text.split(' ');
  let line = '';
  const lines: string[] = [];
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * lineHeight);
  });
}
