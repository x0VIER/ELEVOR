import React, { useCallback, useEffect, useState } from 'react';
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

const initialNodes: Node[] = [
  {
    id: 'input',
    type: 'default',
    data: { label: '📊 Data' },
    position: { x: 20, y: 180 },
    style: { 
      background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '16px 20px', 
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    },
  },
  {
    id: 'lead',
    type: 'default',
    data: { label: '🎯 Leads' },
    position: { x: 200, y: 30 },
    style: { 
      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '16px 20px', 
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },
  },
  {
    id: 'support',
    type: 'default',
    data: { label: '💬 Support' },
    position: { x: 200, y: 120 },
    style: { 
      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '16px 20px', 
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
  },
  {
    id: 'data',
    type: 'default',
    data: { label: '📈 Analytics' },
    position: { x: 200, y: 210 },
    style: { 
      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '16px 20px', 
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
    },
  },
  {
    id: 'content',
    type: 'default',
    data: { label: '✍️ Content' },
    position: { x: 200, y: 300 },
    style: { 
      background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '16px 20px', 
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
    },
  },
  {
    id: 'ai',
    type: 'default',
    data: { label: '🤖 AI Engine' },
    position: { x: 420, y: 165 },
    style: { 
      background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '16px 20px', 
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
    },
  },
  {
    id: 'output',
    type: 'default',
    data: { label: '✅ Results' },
    position: { x: 620, y: 165 },
    style: { 
      background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)', 
      color: 'white',
      border: 'none',
      borderRadius: '12px', 
      padding: '16px 20px', 
      fontSize: '14px',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e-input-lead', source: 'input', target: 'lead', animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
  { id: 'e-input-support', source: 'input', target: 'support', animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
  { id: 'e-input-data', source: 'input', target: 'data', animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
  { id: 'e-input-content', source: 'input', target: 'content', animated: true, style: { stroke: '#3B82F6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
  { id: 'e-lead-ai', source: 'lead', target: 'ai', animated: true, style: { stroke: '#10B981', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981' } },
  { id: 'e-support-ai', source: 'support', target: 'ai', animated: true, style: { stroke: '#8B5CF6', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8B5CF6' } },
  { id: 'e-data-ai', source: 'data', target: 'ai', animated: true, style: { stroke: '#F59E0B', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' } },
  { id: 'e-content-ai', source: 'content', target: 'ai', animated: true, style: { stroke: '#EC4899', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#EC4899' } },
  { id: 'e-ai-output', source: 'ai', target: 'output', animated: true, style: { stroke: '#06B6D4', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#06B6D4' } },
];

export default function HeroFlowAnimation() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState(0);

  // Cycle through nodes for pulsing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [nodes.length]);

  // Update node styles based on active state
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node, index) => ({
        ...node,
        style: {
          ...node.style,
          transform: index === activeNode ? 'scale(1.15)' : 'scale(1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: index === activeNode ? 'brightness(1.2)' : 'brightness(1)',
        },
      }))
    );
  }, [activeNode, setNodes]);

  return (
    <div className="w-full h-[450px] relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.15, maxZoom: 0.95, minZoom: 0.95 }}
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
          style={{ opacity: 0.3 }}
        />
      </ReactFlow>
    </div>
  );
}
