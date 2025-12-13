import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Detailed workflow with clear descriptions
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { 
      label: (
        <div className="text-center">
          <div className="text-lg font-bold mb-1">📥 Request Received</div>
          <div className="text-xs opacity-90">Customer submits task</div>
        </div>
      )
    },
    position: { x: 50, y: 120 },
    style: { 
      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '16px', 
      padding: '20px 28px', 
      minWidth: '180px',
      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.5)',
    },
  },
  {
    id: '2',
    type: 'default',
    data: { 
      label: (
        <div className="text-center">
          <div className="text-lg font-bold mb-1">🤖 AI Analysis</div>
          <div className="text-xs opacity-90">Agent processes request</div>
        </div>
      )
    },
    position: { x: 280, y: 120 },
    style: { 
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '16px', 
      padding: '20px 28px', 
      minWidth: '180px',
      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.5)',
    },
  },
  {
    id: '3',
    type: 'default',
    data: { 
      label: (
        <div className="text-center">
          <div className="text-lg font-bold mb-1">⚡ Automation</div>
          <div className="text-xs opacity-90">Execute workflow</div>
        </div>
      )
    },
    position: { x: 510, y: 120 },
    style: { 
      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '16px', 
      padding: '20px 28px', 
      minWidth: '180px',
      boxShadow: '0 8px 24px rgba(139, 92, 246, 0.5)',
    },
  },
  {
    id: '4',
    type: 'output',
    data: { 
      label: (
        <div className="text-center">
          <div className="text-lg font-bold mb-1">✅ Delivered</div>
          <div className="text-xs opacity-90">Results sent to customer</div>
        </div>
      )
    },
    position: { x: 740, y: 120 },
    style: { 
      background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '16px', 
      padding: '20px 28px', 
      minWidth: '180px',
      boxShadow: '0 8px 24px rgba(20, 184, 166, 0.5)',
    },
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true, 
    style: { stroke: '#3B82F6', strokeWidth: 4 }, 
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6', width: 25, height: 25 },
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: true, 
    style: { stroke: '#10B981', strokeWidth: 4 }, 
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981', width: 25, height: 25 },
  },
  { 
    id: 'e3-4', 
    source: '3', 
    target: '4', 
    animated: true, 
    style: { stroke: '#8B5CF6', strokeWidth: 4 }, 
    markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6', width: 25, height: 25 },
  },
];

export default function HeroFlowAnimation() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState(0);

  // Cycle through nodes for bouncy effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [nodes.length]);

  // Bouncy animation for active node
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node, index) => ({
        ...node,
        style: {
          ...node.style,
          transform: index === activeNode 
            ? 'scale(1.15) translateY(-8px)' 
            : 'scale(1) translateY(0)',
          transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Bouncy easing
          filter: index === activeNode ? 'brightness(1.25) drop-shadow(0 12px 32px rgba(0,0,0,0.3))' : 'brightness(1)',
        },
      }))
    );
  }, [activeNode, setNodes]);

  return (
    <div className="w-full h-[380px] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.1, maxZoom: 1, minZoom: 1 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnDoubleClick={false}
        style={{ background: 'transparent' }}
      >
        <Background 
          color="#E0E7FF" 
          gap={24} 
          size={1.5}
          style={{ opacity: 0.2 }}
        />
      </ReactFlow>
    </div>
  );
}
