let nodes = [];
let edges = [];
let selectedNode = null;
let path = [];

const nodePositions = [
  { x: 100, y: 100 },
  { x: 200, y: 100 },
  { x: 300, y: 100 },
  { x: 150, y: 200 },
  { x: 250, y: 200 },
];

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.id = nodes.length;
  }

  display() {
    stroke(0);
    if (selectedNode === this) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.id, this.x, this.y);
  }

  isClicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    return d < this.radius;
  }
}

function setup() {
  let canvas = createCanvas(710, 400);
  canvas.parent('sketch-holder');
  for (const pos of nodePositions) {
    nodes.push(new Node(pos.x, pos.y));
  }
}

function draw() {
  background(200);

  // Draw all edges first
  for (let edge of edges) {
    let startNode = nodes[edge.from];
    let endNode = nodes[edge.to];
    stroke(0);
    strokeWeight(1);
    line(startNode.x, startNode.y, endNode.x, endNode.y);

    // Display edge cost
    let midX = (startNode.x + endNode.x) / 2;
    let midY = (startNode.y + endNode.y) / 2;
    fill(0);
    noStroke();
    stroke(255,0,0);
    text(edge.cost.toFixed(2), midX, midY - 10);
  }
  
  // Highlight the path in red
  for (let i = 0; i < path.length - 1; i++) {
    let startNode = nodes[path[i]];
    let endNode = nodes[path[i+1]];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(startNode.x, startNode.y, endNode.x, endNode.y);
  }

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].display();
  }

  route();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let clickedNode = null;
    for (let node of nodes) {
      if (node.isClicked(mouseX, mouseY)) {
        clickedNode = node;
        break;
      }
    }

    if (clickedNode) {
      if (selectedNode) {
        if (selectedNode.id !== clickedNode.id) {
          // Create an edge
          let cost = dist(selectedNode.x, selectedNode.y, clickedNode.x, clickedNode.y);
          edges.push({ from: selectedNode.id, to: clickedNode.id, cost: cost });
        }
        selectedNode = null;
      } else {
        // Select a node
        selectedNode = clickedNode;
      }
    } else {
      // Deselect node
      selectedNode = null;
    }
  }
}

function isAdjecent(node_id, other_node_id) {
  for (let edge of edges) {
    if ((edge.from === node_id && edge.to === other_node_id) || (edge.from === other_node_id && edge.to === node_id)) {
      return true;
    }
  }
  return false;
}

function getEdge(from_id, to_id) {
  for (let edge of edges) {
    if (edge.from == from_id && edge.to == to_id) {
      return edge;
    }
  }
  return null;
}

function getNeighbors(node_id) {
  let neighbors = [];
  for (let edge of edges) {
    if (edge.from === node_id) {
      neighbors.push(nodes[edge.to]);
    } else if (edge.to === node_id) {
      neighbors.push(nodes[edge.from]);
    }
  }
  return neighbors;
}

function getMinDistanceNode(distances, visited) {
    let minDistance = Infinity;
    let minNode = null;

    for (let i = 0; i < distances.length; i++) {
        if (!visited[i] && distances[i] < minDistance) {
            minDistance = distances[i];
            minNode = nodes[i];
        }
    }
    return minNode;
}


function route() {
  if (nodes.length === 0) {
    return;
  }

  let distances = [];
  let visited = [];
  let predecessors = [];
  let startNode = nodes[0];

  for (let i = 0; i < nodes.length; i++) {
    distances[i] = Infinity;
    visited[i] = false;
    predecessors[i] = null;
  }

  distances[startNode.id] = 0;

  for (let i = 0; i < nodes.length; i++) {
    let u = getMinDistanceNode(distances, visited);

    if (u === null) {
      break;
    }

    visited[u.id] = true;

    let neighbors = getNeighbors(u.id);
    for (let v of neighbors) {
      let edge = getEdge(u.id, v.id) || getEdge(v.id, u.id);
      if (edge) {
        let newDist = distances[u.id] + edge.cost;
        if (newDist < distances[v.id]) {
          distances[v.id] = newDist;
          predecessors[v.id] = u.id;
        }
      }
    }
  }

  // Reconstruct the path to the last node for visualization
  let targetNode = nodes[nodes.length - 1];
  path = [];
  let current = targetNode.id;
  while(current !== null) {
    path.unshift(current);
    current = predecessors[current];
  }

  print(predecessors)
}