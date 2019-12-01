import React, { Component } from 'react';
import VizBubbles from './VizBubbles';
import { sampleEdgesData, sampleNodesData } from "./VisComplexData";

export default class D3Page extends Component {
  state = {
    vizSel: 'vizPlay',
    exponent: 1,
    selectednode:[],
    screenWidth:  800,
  }
  constructor(){
    super();
    // run java spring REST app ~/workspace/vertex/ to provide edges and vertexes json
    this.doUpdate = this.doUpdate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.mapNodeToVisNode = this.mapNodeToVisNode.bind(this);
    this.doUpdate(sampleNodesData, sampleEdgesData);
    // axios.get('http://localhost:8080/edges')
    // .then(edgesResponse => {
    //   // console.log('edges', edgesResponse);
    //   axios.get('http://localhost:8080/vertexes')
    //   .then(vertexesResponse => {
    //     // console.log('vertexes', vertexesResponse, edgesResponse);
    //     this.doUpdate(vertexesResponse, edgesResponse);
    //   });
  
    // });
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(this.state.screenWidth !== w) {
      this.setState({ screenWidth: w });
    } 
  }

  /**
   * Add event listener - we want a redraw on browser window redraw!
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  GroupToShape(group){
    if (group === 'group1') return 'dot';
    return 'square';
  }
  mapNodeToVisNode(node) {
    var value = node.label.length / 10.0; 
    var shape = this.GroupToShape(node.group);
    var newnode = {
      category: node.category,
      id: node.id,
      name: node.label,
      label:node.label,
      title:node.label,
      value: value,
      group: node.group,
      shape: shape
    };
    return newnode;
  }

  mapEdgeToVisEdge(edge) {
    var newedge = {
      source: edge.source,
      target: edge.target,
      label:edge.label,
      type:edge.type,
      from: edge.source,
      to: edge.target
    };
    return newedge;
  }
  // vis node format
  //    {id: 1, label: 'l1', title: 'tit1', value: 0.005618, group: 47, shape: 'dot'},
  // vis edge format 
  //  {from: 1, to: 23},
  // example node in nodes
  // node={
  //   category: "Fish",
  //   id: "kb",
  //   index: 10,   -> not in original
  //   name: "kb"  
  // }
  // example edge in edges
  // {"source":"ab","target":"mb","label":"Cat","type":"arrow"}
  doUpdate(vertexesResponse, edgesResponse){
    //console.log('doUpdate vertexes', vertexesResponse.data, edgesResponse.data);
    this.setState({
          data: {
            nodes: vertexesResponse.map(this.mapNodeToVisNode),
            edges: edgesResponse.map(this.mapEdgeToVisEdge)
          }
        });
  }

  onChange = (evt) => {
	console.log('viz selection change ', evt.target.name, evt.target.value);
	this.setState({[evt.target.name]: evt.target.value})
  }
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('componentDidCatch', error, info);
  }
  render() {
    return (
      <div
        className="D3Page"
        title="D3s"
        breadcrumbs={[{ name: 'D3s', active: true }]}
      >
      <div className="controller" id="d3page" >
        <VizBubbles data={this.state.data} screenWidth={this.state.screenWidth} />    
      </div>
      </div>
    );
  }
}
