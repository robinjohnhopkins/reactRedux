import React from "react";
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import { bounce,fadeInRight } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

//var CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup') // ES5 with npm
// doesn't seem good for carousel
// react-animations seems better?

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: ['hello', 'world', 'click', 'me'],
                    idx:0,
                    images:["https://unsplash.it/475/205",
                            "https://unsplash.it/476/205",
                            "https://unsplash.it/477/205",
                            "https://unsplash.it/478/205",
                            "https://unsplash.it/479/205"]
                };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRight = this.handleRight.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  }
  handleRight(){
      var idx = this.state.idx + 1;
      if (idx >= this.state.images.length){
          idx = 0;
      }
      this.setState({idx});
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)}>
        {item}
      </div>
    ));
    const styles = {
        bounce: {
          animation: 'x 1s',
          animationName: Radium.keyframes(bounce, 'bounce')
        },
        fadeInRight:{
            animation: 'x 1s',
            animationName: Radium.keyframes(fadeInRight, 'fadeInRight')
        }
      };

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </CSSTransitionGroup>
        <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            <h1>Fading at Initial Mount</h1>
            {items}
        </CSSTransitionGroup>
        {/* <CSSTransitionGroup
            transitionName="carousel"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}>
            <img src={this.state.images[this.state.idx]} 
                    key={this.state.images[this.state.idx]} />
            <button onClick={this.handleRight}>{'>>'}</button>
            <span>
                {this.state.idx}
            </span>
        </CSSTransitionGroup> */}
        <StyleRoot>
            <div className="test" style={styles.fadeInRight}>
                example animates in but to use on new item?
            </div>
        </StyleRoot>

      </div>
    );
  }
}

export default TodoList;