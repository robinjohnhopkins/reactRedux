import React from 'react';
import { Spring, animated } from 'react-spring/renderprops-konva';

export default class ColoredRect extends React.Component {
  state = { 
      flag: false 
    };

  // point = {x: px, toX:px, originX: px, y: py, toY:py, originY: py, key: key++};
  constructor(props){
      super();
      var pt = window.points[props.index];
      var x2 = pt.originX-50+Math.random()*100;
      var y2 = pt.originY-50+Math.random()*100;
      pt.toX = x2;
      pt.toY = y2;
      this.onFrame = this.onFrame.bind(this);
  }

  handleClick = () => {
        var pt = window.points[this.props.index];
        var x2 = pt.originX-50+Math.random()*100;
        var y2 = pt.originY-50+Math.random()*100;
        pt.toX = x2;
        pt.toY = y2;
        this.setState(state => ({ flag: !state.flag }))
    };
    onFrame = (p1, p2, p3) => {
        var pt = window.points[this.props.index];
        pt.x = p1.x;
        pt.y = p1.y;
        //console.log(p1, pt);
    };
  render() {
    var me = this;
    const { flag } = this.state;
    var pt = window.points[this.props.index];
    if (pt.active <= 0.0) {return null;}
    return (
      <Spring
        onFrame={this.onFrame}
        native
        from={{ x: pt.originX, y: pt.originY, shadowBlur: 0, 
            fill: 'rgba(255,255,255,'+pt.circle_active + ')' }}
        to={{
            x: flag ? pt.toX : pt.originX,
            y: flag ? pt.toY : pt.originY,
          width: flag ? 20 : 20,
          height: flag ? 20 : 20
        }}
        onRest={me.handleClick}
      >
        {props => (
          <animated.Circle {...props} radius={1} onClick={this.handleClick} />
        )}
      </Spring>
    );
  }
}

