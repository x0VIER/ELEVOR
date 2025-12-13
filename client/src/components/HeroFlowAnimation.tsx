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

// Clean linear workflow: Customer Request → AI Agent → Processing → Delivery
const initialNodes: Node[] = [
  {
    id: 'customer',
    type: 'input',
    data: { label: '👤 Customer Request' },
    position: { x: 50, y: 150 },
    style: { 
      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '18px 24px', 
      fontSize: '15px',
      fontWeight: '600',
      boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)',
    },
  },
  {
    id: 'agent',
    type: 'default',
    data: { label: '🤖 AI Agent' },
    position: { x: 280, y: 150 },
    style: { 
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '18px 24px', 
      fontSize: '15px',
      fontWeight: '600',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
    },
  },
  {
    id: 'processing',
    type: 'default',
    data: { label: '⚙️ Processing' },
    position: { x: 480, y: 150 },
    style: { 
      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '18px 24px', 
      fontSize: '15px',
      fontWeight: '600',
      boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
    },
  },
  {
    id: 'delivery',
    type: 'output',
    data: { label: '✅ Delivered' },
    position: { x: 680, y: 150 },
    style: { 
      background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '18px 24px', 
      fontSize: '15px',
      fontWeight: '600',
      boxShadow: '0 4px 16px rgba(20, 184, 166, 0.4)',
    },
  },
];

const initialEdges: Edge[] = [
  { 
    id: 'e1', 
    source: 'customer', 
    target: 'agent', 
    animated: true, 
    style: { stroke: '#3B82F6', strokeWidth: 3 }, 
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' },
    label: 'Submit',
    labelStyle: { fill: '#6B7280', fontWeight: 600, fontSize: 12 },
  },
  { 
    id: 'e2', 
    source: 'agent', 
    target: 'processing', 
    animated: true, 
    style: { stroke: '#10B981', strokeWidth: 3 }, 
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' },
    label: 'Analyze',
    labelStyle: { fill: '#6B7280', fontWeight: 600, fontSize: 12 },
  },
  { 
    id: 'e3', 
    source: 'processing', 
    target: 'delivery', 
    animated: true, 
    style: { stroke: '#8B5CF6', strokeWidth: 3 }, 
    markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' },
    label: 'Complete',
    labelStyle: { fill: '#6B7280', fontWeight: 600, fontSize: 12 },
  },
];

export default function HeroFlowAnimation() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState(0);

  // Cycle through nodes for pulsing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [nodes.length]);

  // Update node styles based on active state
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node, index) => ({
        ...node,
        style: {
          ...node.style,
          transform: index === activeNode ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: index === activeNode ? 'brightness(1.2)' : 'brightness(1)',
        },
      }))
    );
  }, [activeNode, setNodes]);

  return (
    <div className="w-full h-[400px] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1.1, minZoom: 1.1 }}
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
          gap={20} 
          size={1}
          style={{ opacity: 0.25 }}
        />
      </ReactFlow>
    </div>
  );
}
