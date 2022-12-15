const { Graph, Node } = require("./graph");

describe("addVertex", function () {
  it("should add a key in the adjacency", function () {
    // build (unconnected) graph
    //
    //            A
    //
    //      B
    //                  C
    //

    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    expect(graph.nodes.has(a)).toBe(false);
    expect(graph.nodes.has(b)).toBe(false);
    expect(graph.nodes.has(c)).toBe(false);
    graph.addVertex(a);
    graph.addVertex(b);
    graph.addVertex(c);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(true);
  });
});

describe("addVertices", function () {
  it("should add multiple keys in the adjacency", function () {
    // build (unconnected) graph
    //
    //            A
    //
    //      B
    //                  C
    //

    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    expect(graph.nodes.has(a)).toBe(false);
    expect(graph.nodes.has(b)).toBe(false);
    expect(graph.nodes.has(c)).toBe(false);
    graph.addVertices([a, b, c]);
    expect(graph.nodes.has(a)).toBe(true);
    expect(graph.nodes.has(b)).toBe(true);
    expect(graph.nodes.has(c)).toBe(true);
  });
});

describe("addEdge", function () {
  it("should add the appropriate edges to the adjacency list", function () {
    // build graph
    //
    //              A
    //            /   \
    //          B       C
    //            \   /
    //              D
    //
    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);
    expect(a.adjacent).toContain(b, c);
    expect(b.adjacent).toContain(a, d);
    expect(c.adjacent).toContain(a, d);
    expect(d.adjacent).toContain(b, c);
  });
});

describe("removeEdge", function () {
  it("should remove the vertices from the adjacency list", function () {
    // build graph
    //
    //              A
    //            /   \
    //          B       C
    //            \   /
    //              D
    //

    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);

    graph.removeEdge(b, a);
    graph.removeEdge(c, d);

    expect(a.adjacent).not.toContain(b);
    expect(c.adjacent).not.toContain(d);
  });
});

describe("removeVertex", function () {
  it("should remove the vertex as well as any edges", function () {
    // build graph
    //
    //              A
    //            /   \
    //          B       C
    //            \   /
    //              D
    //

    let graph = new Graph();
    let a = new Node("A");
    let b = new Node("B");
    let c = new Node("C");
    let d = new Node("D");
    graph.addVertices([a, b, c, d]);
    graph.addEdge(a, b);
    graph.addEdge(a, c);
    graph.addEdge(b, d);
    graph.addEdge(c, d);

    graph.removeVertex(c);
    graph.removeVertex(d);

    expect(graph.nodes.has(a)).toBeTruthy();
    expect(graph.nodes.has(b)).toBeTruthy();
    expect(graph.nodes.has(c)).toBeFalsy();
    expect(graph.nodes.has(d)).toBeFalsy();
  });
});

describe("DFS", function () {
  it("return an array of the nodes searched using DFS", function () {
    // build complex graph
    //
    //                       Q --P -- S
    //                      /  \ |      \
    //                     R     X   --  U
    //                     | \   |  \   /
    //                     |  \  |    V
    //                      \    Y    |
    //                       \     \  /
    //                         T --- W
    //

    let graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");

    graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

    graph.addEdge(S, P);
    graph.addEdge(S, U);

    graph.addEdge(P, X);
    graph.addEdge(U, X);

    graph.addEdge(P, Q);
    graph.addEdge(U, V);

    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);

    graph.addEdge(Q, R);
    graph.addEdge(Y, R);

    graph.addEdge(Y, W);
    graph.addEdge(V, W);

    graph.addEdge(R, T);
    graph.addEdge(W, T);

    let result = graph.depthFirstSearch(T);

    expect.assertions(2);

    if (result[1] === "R") {
      expect(result[2] === "Q" || result[2] === "Y").toBe(true);
      if (result[2] === "Q") {
        expect(result[3] === "P" || result[3] === "X").toBe(true);
      } else {
        expect(result[3] === "X" || result[3] === "W").toBe(true);
      }
    } else if (result[1] === "W") {
      expect(result[2] === "Y" || result[2] === "V").toBe(true);
      if (result[2] === "Y") {
        expect(result[3] === "X" || result[3] === "R").toBe(true);
      } else {
        expect(result[3] === "X" || result[3] === "U").toBe(true);
      }
    }
  });
});

describe("BFS", function () {
  it("should return an array of the nodes searched using BFS", function () {
    // build complex graph
    //
    //                       Q --P -- S
    //                      /  \ |      \
    //                     R     X  ---  U
    //                     | \   |  \   /
    //                     |  \  |    V
    //                      \    Y    |
    //                       \     \  /
    //                         T --- W
    //

    let graph = new Graph();
    let S = new Node("S");
    let P = new Node("P");
    let U = new Node("U");
    let X = new Node("X");
    let Q = new Node("Q");
    let Y = new Node("Y");
    let V = new Node("V");
    let R = new Node("R");
    let W = new Node("W");
    let T = new Node("T");

    graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

    graph.addEdge(S, P);
    graph.addEdge(S, U);

    graph.addEdge(P, X);
    graph.addEdge(U, X);

    graph.addEdge(P, Q);
    graph.addEdge(U, V);

    graph.addEdge(X, Q);
    graph.addEdge(X, Y);
    graph.addEdge(X, V);

    graph.addEdge(Q, R);
    graph.addEdge(Y, R);

    graph.addEdge(Y, W);
    graph.addEdge(V, W);

    graph.addEdge(R, T);
    graph.addEdge(W, T);

    let results = graph.breadthFirstSearch(S);

    expect(results.indexOf("P") < results.indexOf("Y"));
    expect(results.indexOf("P") < results.indexOf("V"));
    expect(results.indexOf("P") < results.indexOf("Q"));
    expect(results.indexOf("U") < results.indexOf("Y"));
    expect(results.indexOf("U") < results.indexOf("V"));
    expect(results.indexOf("U") < results.indexOf("Q"));
    expect(results.indexOf("X") < results.indexOf("Y"));
    expect(results.indexOf("X") < results.indexOf("V"));
    expect(results.indexOf("X") < results.indexOf("Q"));
  });
});

describe("distanceOfShortestPath", function () {
  it("should return distance of shortest path from start to end vertices", function () {
    // build graph
    //
    //            R
    //         /  |  \
    //        I - T - H
    //                |
    //                M
    //

    let graph = new Graph();

    let r = new Node("R");
    let i = new Node("I");
    let t = new Node("T");
    let h = new Node("H");
    let m = new Node("M");

    graph.addVertices([r, i, t, h, m]);

    graph.addEdge(r, i);
    graph.addEdge(r, t);
    graph.addEdge(r, h);
    graph.addEdge(i, t);
    graph.addEdge(t, h);
    graph.addEdge(h, m);

    expect(graph.distanceOfShortestPath(r, m)).toBe(2);
    expect(graph.distanceOfShortestPath(t, r)).toBe(1);
    expect(graph.distanceOfShortestPath(t, m)).toBe(2);
    expect(graph.distanceOfShortestPath(t, "rogue node")).toBe(undefined);
  });
});
