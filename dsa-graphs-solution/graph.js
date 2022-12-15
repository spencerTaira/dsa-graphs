class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    // Add an array of verticies to our graph

    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  addEdge(v1, v2) {
    // Connect two verticies
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(vertex) {
      // base case
      if (!vertex) {
        return null;
      }
      // visit node
      visited.add(vertex);
      result.push(vertex.value);

      // visit neighbors
      for (let neighbor of vertex.adjacent) {
        if (!visited.has(neighbor)) traverse(neighbor);
      }
    }

    traverse(start);

    return result;
  }

  // Alternative solution without helper method recursion
  depthFirstSearch(start, result = [], visited = new Set([start])) {
    result.push(start.value);
    // visit neighbors
    for (let neighbor of start.adjacent) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        this.depthFirstSearch(neighbor, result, visited);
      }
    }

    return result;
  }

  depthFirstSearchIterative(start) {
    // Create an empty stack
    const stack = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    // visit node
    visited.add(start);

    // while there are still neighbors to visit
    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex.value);

      // visit neighbors and push onto stack
      for (let neighbor of currentVertex.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
    return result;
  }

  breadthFirstSearch(start) {
    // Create an empty queue
    const queue = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    // visit node
    visited.add(start);

    // While there is still remaining vertices in queue
    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex.value);

      // visit neighbors
      for (let neighbor of currentVertex.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }

  distanceOfShortestPath(start, end) {
    if (start === end) return 0;

    let visited = new Set();

    // enqueued: [vertex, distance]
    // distance from start vertex to this vertex
    let queue = [[start, 0]];

    while (queue.length) {
      let [currentVertex, distance] = queue.shift();

      if (currentVertex === end) return distance;

      for (let neighbor of currentVertex.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, distance + 1]);
        }
      }
    }
  }

  /**shortestPath
   *
   * Finds the shortest path from start vertex to end vertex and returns
   * path or null if no path.
   *
   * start/end: { value: "", adjacent: [ {}, {} ] }
   */
  shortestPath(start, end) {
    if (start === end) {
      return [start.value];
    }

    // { vertex: previousVertex }
    // record FIRST time we see a vertex and
    // the vertex that lead us here (previous)
    // in unweighted BFS, the first path to a vertext is the shortest
    let vertexToPrevious = {};
    let toVisitQueue = [start];
    let visited = new Set();

    let vertex = toVisitQueue.shift();

    while (vertex && vertex !== end) {
      visited.add(vertex);

      for (let adj of vertex.adjacent) {
        // has vertex already been visited
        // don't get caught in a cycle
        if (!visited.has(adj)) {
          toVisitQueue.push(adj);
        }

        // only add vertex one time, the first time (never update)
        // exclude start vertex (it's our start & won't have a previous)
        if (vertexToPrevious[adj.value] === undefined && adj !== start) {
          vertexToPrevious[adj.value] = vertex.value;
        }
      }

      vertex = toVisitQueue.shift();
    }

    // nothing left to visit or we've reached the end vertex
    return _generatePath(end, vertexToPrevious);

    /**
     * Takes the end vertex and vertexToPrevious as input
     * - end: { value: "", adjacent: [ {}, {} ] }
     * - vertexToPrevious: { vertex: previousVertex }
     *
     * Works backward through the vertex-to-previous-vertex
     * chain and generates path
     *
     * Returns path or null if no path
     */
    function _generatePath(end, vertexToPrevious) {
      // no path to end vertex
      if (vertexToPrevious[end.value] === undefined) return null;

      let path = [];
      let nextInPath = vertexToPrevious[end.value];

      // go ahead and add our end value first
      path.push(end.value);

      while (nextInPath) {
        path.push(nextInPath);
        nextInPath = vertexToPrevious[nextInPath];
      }

      path.reverse();
      return path;
    }
  }
}

module.exports = { Graph, Node };
