import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    data: { label: '📥 Input Data' },
    position: { x: 50, y: 150 },
    style: { background: '#EFF6FF', border: '2px solid #2563EB', borderRadius: '8px', padding: '10px', fontSize: '12px' },
  },
  {
    id: '2',
    type: 'default',
    data: { label: '🤖 AI Agent 1' },
    position: { x: 250, y: 50 },
    style: { background: '#DBEAFE', border: '2px solid #3B82F6', borderRadius: '8px', padding: '10px', fontSize: '12px' },
  },
  {
    id: '3',
    type: 'default',
    data: { label: '🤖 AI Agent 2' },
    position: { x: 250, y: 150 },
    style: { background: '#DBEAFE', border: '2px solid #3B82F6', borderRadius: '8px', padding: '10px', fontSize: '12px' },
  },
  {
    id: '4',
    type: 'default',
    data: { label: '🤖 AI Agent 3' },
    position: { x: 250, y: 250 },
    style: { background: '#DBEAFE', border: '2px solid #3B82F6', borderRadius: '8px', padding: '10px', fontSize: '12px' },
  },
  {
    id: '5',
    type: 'default',
    data: { label: '⚙️ Processing' },
    position: { x: 450, y: 150 },
    style: { background: '#FEF3C7', border: '2px solid #F59E0B', borderRadius: '8px', padding: '10px', fontSize: '12px' },
  },
  {
    id: '6',
    type: 'default',
    data: { label: '✅ Output' },
    position: { x: 650, y: 150 },
    style: { background: '#D1FAE5', border: '2px solid #10B981', borderRadius: '8px', padding: '10px', fontSize: '12px' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#2563EB', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#2563EB' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#2563EB', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#2563EB' } },
  { id: 'e1-4', source: '1', target: '4', animated: true, style: { stroke: '#2563EB', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#2563EB' } },
  { id: 'e2-5', source: '2', target: '5', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#F59E0B', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#F59E0B' } },
];

export default function HeroFlowAnimation() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeNode, setActiveNode] = useState(0);

  // Animate nodes pulsing effect
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
          transition: 'transform 0.3s ease-in-out',
          boxShadow: index === activeNode ? '0 0 20px rgba(37, 99, 235, 0.5)' : 'none',
        },
      }))
    );
  }, [activeNode, setNodes]);

  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnDoubleClick={false}
      >
        <Background color="#93C5FD" gap={16} />
      </ReactFlow>
    </div>
  );
}
