import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-regular-svg-icons';
import * as fas from '@fortawesome/free-solid-svg-icons';

import { faCheckSquare as fasCheckSquare} from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare as farCheckSquare } from '@fortawesome/free-regular-svg-icons'

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
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
    };
 
    render() {
        return (
            <>
            <CheckboxTree
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
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
            <FontAwesomeIcon icon={['fas', 'check-box']} />
            <FontAwesomeIcon icon={['far', 'check-box']} />

            </span>
            </>
        );
    }
}