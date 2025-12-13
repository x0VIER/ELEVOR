import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Bot, Database, Zap, CheckCircle, TrendingUp } from 'lucide-react';

const CustomNode = ({ data }: any) => {
  const IconComponent = data.icon;
  
  return (
    <div className={`px-4 py-3 rounded-lg border-2 ${data.color} bg-white shadow-lg transition-all hover:scale-105`}>
      <div className="flex items-center gap-2">
        {IconComponent && <IconComponent className="w-5 h-5" />}
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          {data.status && (
            <div className="text-xs text-gray-600 mt-1">{data.status}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const AnimatedWorkflow: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);

  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'custom',
      position: { x: 50, y: 100 },
      data: { 
        label: 'Data Input', 
        icon: Database,
        color: 'border-blue-400',
        status: 'Processing...'
      },
    },
    {
      id: '2',
      type: 'custom',
      position: { x: 250, y: 50 },
      data: { 
        label: 'AI Agent 1', 
        icon: Bot,
        color: 'border-purple-400',
        status: 'Active'
      },
    },
    {
      id: '3',
      type: 'custom',
      position: { x: 250, y: 150 },
      data: { 
        label: 'AI Agent 2', 
        icon: Bot,
        color: 'border-purple-400',
        status: 'Active'
      },
    },
    {
      id: '4',
      type: 'custom',
      position: { x: 450, y: 100 },
      data: { 
        label: 'Automation', 
        icon: Zap,
        color: 'border-orange-400',
        status: 'Running'
      },
    },
    {
      id: '5',
      type: 'custom',
      position: { x: 650, y: 100 },
      data: { 
        label: 'Output', 
        icon: CheckCircle,
        color: 'border-green-400',
        status: 'Complete'
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' },
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' },
    },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      animated: true,
      style: { stroke: '#f97316', strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#f97316' },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Animate nodes pulsing
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        preventScrolling={false}
      >
        <Background color="#e5e7eb" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default AnimatedWorkflow;
