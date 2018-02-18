const { Vertex } = require('./Vertex.js');

class Tree {

    constructor() {
        this.edgeList = [];
        this.maxChildren = 3;
        // this.maxDepth = 4;
        this.maxNodes = 20;
        this.graphJSON = {};
    }

    create(children, nodes) {

        // this.maxDepth = depth ? depth : this.maxDepth;
        // this.maxChildren = children ? children : this.maxChildren;
        // this.maxNodes = nodes ? nodes : this.maxNodes;
        // console.log(this.maxChildren, this.maxNodes)
        let links = {};
        let linksJSON = [];
        let nodesJSON = [];
        let id = 0;
        let count = 1;
        // this.numberOfVertices = numOfVertices;
        
        while(count < this.maxNodes) {
        // for (var i = 0; i < 20; i++) {
            links[id] = {};
            nodesJSON.push({ 'id': id });
            // if (i + 1 == numOfVertices) break;
            let numOfEdges = this._getRandomInt(1, this.maxChildren);
            // console.log(id, numOfEdges);
            // console.log(linksJSON.length + 1, linksJSON.length + numOfEdges)
            for (var j = 1; j <= numOfEdges; j++) {
                // let edge = this._getRandomInt(i + 1, numOfVertices - 1);

                // if (!links[i][j]) {
                    // links[i][j] = j;
                    this.edgeList.push([id, count]);
                    // console.log([id, j]);
                    linksJSON.push({ "source": id, "target": count });
                    // console.log('j ',j,'count ', count);
                    count ++;
                    
                    if (count >= this.maxNodes){ break };
                // }
            }
            id ++
        }
        console.log(linksJSON)
        // console.log(nodesJSON)
        this.graphJSON.nodes = nodesJSON;
        this.graphJSON.links = linksJSON;

        return this.data = this._createVertices();
    }
    
    build(vertices, edges) {
        this.edgeList = edges;
        this.numberOfVertices = vertices;
        return this.data = this._createVertices();
    }

    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    _createAdjList() {
        //ceates an array of the adjacent nodes for each nodes
        //this creates a undirected data set 
        //create empty array list for storing adjacent nodes

        let adjList = Array.apply(null, Array(this.maxNodes)).map(() => new Array());

        this.edgeList.forEach(function(node, index) {

            let node1 = node[0];
            let node2 = node[1];
            adjList[node1].push(node2);
            adjList[node2].push(node1);
        });

        return adjList;
    }

    _createVertices() {
        this.adjList = this._createAdjList();

        let vertices = this.adjList.map(function(adjacent, index) {
            let vertex = new Vertex;
            vertex.adjacent = adjacent;
            vertex.value = index;
            return vertex;
        });
        
        return vertices;
    }

    clear() {
        this.data.forEach(function(vertex, index) {
            vertex.predecessor = null;
            vertex.visited = false;
        });
    }

    print() {
        //TO DO update to use console.table
        this.data.forEach(function(node, index){
            console.log(index, node.adjacent);
        });
    }
}

let tree = new Tree();
tree.create();
console.log(tree.data);
// tree.print();
module.exports.Tree = Tree;