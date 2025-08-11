import React, { useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

function layout(nodes, edges) {
  const nodeMap = new Map(nodes.map((n) => [n.id, { ...n }]));
  const children = {};
  const indegree = {};

  nodes.forEach((n) => {
    children[n.id] = [];
    indegree[n.id] = 0;
  });

  edges.forEach((e) => {
    children[e.source].push(e.target);
    indegree[e.target] += 1;
  });

  const queue = [];
  Object.keys(indegree).forEach((id) => {
    if (indegree[id] === 0) {
      queue.push(id);
    }
  });

  const levels = {};
  queue.forEach((id) => {
    levels[id] = 0;
  });

  while (queue.length) {
    const id = queue.shift();
    children[id].forEach((target) => {
      levels[target] = Math.max((levels[id] || 0) + 1, levels[target] || 0);
      indegree[target] -= 1;
      if (indegree[target] === 0) {
        queue.push(target);
      }
    });
  }

  const grouped = {};
  nodeMap.forEach((_, id) => {
    const level = levels[id] || 0;
    (grouped[level] || (grouped[level] = [])).push(id);
  });

  Object.keys(grouped).forEach((level) => {
    grouped[level].forEach((id, index) => {
      const node = nodeMap.get(id);
      node.position = { x: Number(level) * 200, y: index * 100 };
    });
  });

  return Array.from(nodeMap.values());
}

const initialNodes = [
  { id: '1', data: { label: 'Start' }, position: { x: 0, y: 0 } },
  { id: '2', data: { label: 'Process' }, position: { x: 0, y: 0 } },
  { id: '3', data: { label: 'End' }, position: { x: 0, y: 0 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

export default function App() {
  const { nodes, edges } = useMemo(() => {
    const layouted = layout(initialNodes, initialEdges);
    return { nodes: layouted, edges: initialEdges };
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
