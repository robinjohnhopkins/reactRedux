import React from 'react';
import CheckboxTreeExt from './CheckboxTreeExt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-regular-svg-icons';
import * as fas from '@fortawesome/free-solid-svg-icons';

//import { faCheckSquare as fasCheckSquare} from '@fortawesome/free-solid-svg-icons'
//import { faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons'

import InputModal from './InputModal';

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos',
            children: [
                {  value: 'pink', label: 'Pink' }
            ]
        },
    ],
},
{
    value: 'earth',
    label: 'Earth',
    children: [
    ],
}
];
 
export default class MyCheckboxTree extends React.Component {
    state = {
        checked: [],
        expanded: [],
        clicked: {},
        isModalOpen: false,
        labelSelected: null,
        dataSelected:null,
        inputValue:'',
        inputValueCanBeAddedToNodes:false,
        nodes: nodes
    };

    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
        this.handleRMClick = this.handleRMClick.bind(this);
        this.onModalOk = this.onModalOk.bind(this);
        this.onModalCancel = this.onModalCancel.bind(this);
        this.onChangeModalInput = this.onChangeModalInput.bind(this);
    }
    onClick(me, clicked){
        me.setState({ clicked });
    }
    onChangeModalInput(event){
        var node = this.findLabel(event.target.value, this.state.nodes);
        var inputValueCanBeAddedToNodes = node === null && event.target.value.length > 0;
        console.log('inputValueCanBeAddedToNodes', inputValueCanBeAddedToNodes);
        this.setState({
            inputValue: event.target.value,
            inputValueCanBeAddedToNodes
        });
    }
    // const test = {a: 1, b: 2, c: 3};
    // for (const [key, value] of Object.entries(test)) {
    // console.log(key, value);
    // }

    deleteLabel(label, nodes){
        for (const [key, value] of Object.entries(nodes)) {
            console.log(key, value);
            if (value && value.children && value.children.length > 0){
                var found = this.deleteLabel(label, value.children);
                value.children = found || value.children;
            }
            if (value.label.toUpperCase() === label.toUpperCase()){
                nodes = nodes.filter( (entry) => {return entry.value.toUpperCase() !== label.toUpperCase()});
                return nodes;
            }
        }
        return null;
    }
    findLabel(label, nodes){
        var found = null;
        for (const [key, value] of Object.entries(nodes)) {
            console.log(key, value);
            if (value && value.children){
                found = this.findLabel(label, value.children) || found;
            }
            if (value && value.label.toUpperCase() === label.toUpperCase()){
                if (nodes[key].children === undefined){
                    nodes[key].children=[];
                }
                return nodes[key];
            }
        }
        return found;
    }
    onModalOk(){
        this.setState({
            isModalOpen: false
          });
        if (this.state.inputValue.length > 0){
          var nodes = JSON.parse(JSON.stringify(this.state.nodes));
          var nodeToAdd={
              value: this.state.inputValue,
              label: this.state.inputValue,
          };
          var node = this.findLabel(this.state.dataSelected.me.props.label, nodes);
          if (node !== null){
            node.children.push(nodeToAdd);
          }
          this.setState({nodes, inputValueCanBeAddedToNodes:false});
        }
    }
    onModalCancel(){
        this.setState({
            isModalOpen: false
          });
    }
    handleRMClick(e, data, element) {
        if (data.action === 'delete'){
            var nodes = JSON.parse(JSON.stringify(this.state.nodes));
            var newNodesIfDeleted = this.deleteLabel(data.me.props.label, nodes) || nodes;
            if (newNodesIfDeleted){
                this.setState({
                    isModalOpen: false,
                    labelSelected: '',
                    dataSelected:'',
                    nodes: newNodesIfDeleted
                  });
            }
        } else {
        this.setState({
            isModalOpen: true,
            labelSelected: data.me.props.label,
            dataSelected:data
          });
        }
    }
 
    render() {
        const { clicked } = this.state;
        const notClickedText = '(none)';
        const me = this;
        return (
            <>
            <InputModal isOpen={this.state.isModalOpen}
                onOk={this.onModalOk}
                onCancel={this.onModalCancel}
                inputValue={this.state.inputValue}
                onChangeInput={this.onChangeModalInput}
                inputValueCanBeAddedToNodes={this.state.inputValueCanBeAddedToNodes}
            />
            <CheckboxTreeExt
                nodes={this.state.nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                onClick={data => me.onClick(me,data)}
                onRMClick={this.handleRMClick}
                showExpandAll={true}
                icons={{
                    check: <FontAwesomeIcon icon={fa.faCheckSquare} />,
                    uncheck: <FontAwesomeIcon icon={fa.faSquare} />,
                    halfCheck: <FontAwesomeIcon icon={fa.faMinusSquare} />,
                    expandClose: <FontAwesomeIcon icon={fas.faChevronRight} />,
                    expandOpen: <FontAwesomeIcon icon={fas.faChevronDown} />,
                    expandAll: <FontAwesomeIcon icon={fa.faPlusSquare} />,
                    collapseAll: <FontAwesomeIcon icon={fa.faMinusSquare} />,
                    parentClose: <FontAwesomeIcon icon={fa.faFolder} />,
                    parentOpen: <FontAwesomeIcon icon={fas.faFolderPlus} />,
                    leaf: <FontAwesomeIcon icon={fa.faFile} />
                }}
            />
            <div style={{height:'50px'}}></div>
            <span></span>
            <span></span>
            <div>These are some icons</div>
            <span>
            <FontAwesomeIcon icon={fa.faCheckSquare} />
            <FontAwesomeIcon icon={fa.faSquare} />
            <FontAwesomeIcon icon={fas.faVectorSquare} />
            <FontAwesomeIcon icon={fa.faMinusSquare} />
            <FontAwesomeIcon icon={fas.faChevronRight} />
            <FontAwesomeIcon icon={fas.faChevronDown} />
            <FontAwesomeIcon icon={fa.faFolder} />
            <FontAwesomeIcon icon={fas.faFolderMinus} />
            <FontAwesomeIcon icon={fas.faFolderPlus} />
            <FontAwesomeIcon icon={fa.faFile} />

            </span>
            <div className="clickable-labels-info">
                <strong>Clicked Node</strong>: {clicked.value || notClickedText}
            </div>

            </>
        );
    }
}