import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'End' } }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' }
];

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
