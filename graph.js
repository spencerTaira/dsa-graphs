/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    if (!this.nodes.has(vertex)) this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      if (!this.nodes.has(vertex)) this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (const relation of vertex.adjacent) {
      relation.adjacent.delete(vertex);
    }

    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch0(start) {
    let toVisitStack = [start];
    let seen = new Set();
    let result = [];

    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      seen.add(current);
      result.push(current.value);

      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
        }
      }
    }
    return result;
  }

  depthFirstSearch(start, seen = new Set([start]), result = [start.value]) {

    for (const neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        seen.add(neighbor);
        result.push(neighbor.value);
        result.push(...this.depthFirstSearch(neighbor, seen, result));
      }
    }
    return result;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return [...seen];
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    // bfs
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    let distance = {};
    distance[start.value] = 0;

    if (start === end) return 0;
    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      if (current === end) {
        return distance[current.value]
      }

      for (let neighbor of current.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
          distance[neighbor.value] = distance[current.value] + 1;
          console.log(distance)
        }
      }
    }
    return undefined
  }

}

module.exports = { Graph, Node };
