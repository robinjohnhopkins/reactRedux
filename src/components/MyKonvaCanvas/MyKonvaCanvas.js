import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle, Line, Group} from 'react-konva';
import Konva from 'konva';
import {   Circ, TweenMax, TweenLite } from "gsap";
import ColoredRect from './ColoredRect';

//import { useStrictMode } from 'react-konva';
//useStrictMode(true);
var width, height, offsetWidth, largeHeader, canvas, ctx, target, animateHeader = true;

class MyColoredRect extends React.Component {
    state = {
      color: '#aa22ff33',
      num:1,
      redLine: new Konva.Line({
        points: [5, 70, 140, 23, 250, 60, 300, 20],
        stroke: 'red',
        strokeWidth: 15,
        lineCap: 'round',
        lineJoin: 'round'
      })
    };
    constructor(props){
        super();
        // Main
        //this.initHeader();
        //this.initAnimation();
        //this.addListeners();
        this.mouseMove=this.mouseMove.bind(this);

        console.log('init', width, 'canvas', canvas);
        if (window.points == undefined || window.points.length <= 0){
            this.initHeader();
            this.initAnimation();
            this.addListeners();
            //this.setState({num : this.state.num +1});
        }
    }
    componentDidMount() {
        if (window.points == undefined || window.points.length <= 0){
            this.addListeners();
        }
    }
    handleClick = () => {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    };

    drawLinesx(p) {
        //if(!p.active) return null;
        // var stroke= rgba(156,217,249, p.active);
        return <>
            {p.closest.map((_, i) => { 
                    if (p.active> 0.0){
                        return (
                            <Line
                            key={window.points[i].key+ i*100 + 10000}
                            points={[p.x, p.y, p.closest[i].x, p.closest[i].y]}
                            stroke={'rgba(255,255,255,'+p.active + ')'}
                            strokeWidth= '1'
                            lineCap= 'round'
                            lineJoin= 'round'
                            />
                        );
                    } else {
                        return null; 
                    }
                })}
        </>;
    }

      render() {
        return (
            < >
                  {window.points.map((p, i) => {
                      if (p.circle_active >= 0.0){
                        return (
                                <Group key={p.key}>
                                    <ColoredRect index={i} />
                                {/* <Circle
                                    key={window.points[i].key}
                                    x={window.points[i].x}
                                    y={window.points[i].y}
                                    radius={5} fill={'rgba(255,255,255,'+p.circle_active + ')'}
                                /> */}
                                { this.drawLinesx(p) }
                                </Group>
                            );
                        } else {
                            return null;
                        }
                      })}
                  <Rect someVal={this.state.num }
                      x={20}
                      y={20}
                      width={50}
                      height={50}
                      fill={this.state.color}
                      shadowBlur={5}
                      onClick={this.handleClick}
                  />
                  <Circle x={100} y={100} radius={3} fill="white" />
                  <Line
                      points={[10, 20, 100, 100]}
                      stroke= 'white'
                      strokeWidth= '1'
                      lineCap= 'round'
                      lineJoin= 'round'
                  />
          </>
        );
      }
        Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }


    // Util
    getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    /**
     * Returns distance between two points
     *
     * @param {Array} point1 first point coordinates
     * @param {Array} point2 second point coordinates
     * @return {Number} distance
     */

    // getDistance(point1, point2) {
    //     return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
    // }
    initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        var app = document.getElementById('app');
        offsetWidth = (width - app.clientWidth)/2;
        if (offsetWidth < 0){
            offsetWidth = 0;
        }
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        //largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        console.log('canvas', canvas, 'width', width,'height',height);
        if (canvas === null){
            //return;
        }
        //canvas.width = width;
        //canvas.height = height;
        //ctx = canvas.getContext('2d');

        // create points
        window.points = [];
        var key = 100;
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, toX:px, originX: px, y: py, toY:py, originY: py, key: key++};
                window.points.push(p);
            }
        }
        var i = 0;
        // for each point find the 5 closest points
        for(i = 0; i < window.points.length; i++) {
            var closest = [];
            var p1 = window.points[i];
            var k = 0;
            for(var j = 0; j < window.points.length; j++) {
                var p2 = window.points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(k = 0; k < 5; k++) {
                        if(!placed) {
                            if(this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        //for(i in points) {
            //var c = new this.Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            //points[i].circle = c;
        //}
    }

    // Event handling
    addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', this.mouseMove);
        }
        window.addEventListener('scroll', this.scrollCheck);
        window.addEventListener('resize', this.resize);
    }

    mouseMove(e) {
        var posx = 0;
        var posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        var x = posx - offsetWidth;
        if (x > 0) target.x = x;
        target.y = posy;
        this.animate();
        //console.log(target);
        this.setState({num : this.state.num +1});
    }

    scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        //largeHeader.style.height = height+'px';
        //canvas.width = width;
        //canvas.height = height;
    }

    // animation
    initAnimation() {
        this.animate();
        // for(var i in points) {
        //     this.shiftPoint(points[i]);
        // }
    }

    animate() {
        if(animateHeader) {
            // ctx.clearRect(0,0,width,height);
            for(var i in window.points) {
                // detect points in range
                if(Math.abs(this.getDistance(target, window.points[i])) < 4000) {
                    window.points[i].active = 0.3;
                    window.points[i].circle_active = 0.6;
                    // points[i].circle.active = 0.6;
                } else if(Math.abs(this.getDistance(target, window.points[i])) < 20000) {
                    window.points[i].active = 0.1;
                    window.points[i].circle_active = 0.3;
                } else if(Math.abs(this.getDistance(target, window.points[i])) < 40000) {
                    window.points[i].active = 0.02;
                    window.points[i].circle_active = 0.1;
                } else {
                    window.points[i].active = 0;
                    window.points[i].circle_active = 0;
                }

                //this.drawLines(points[i]);
                //points[i].circle.draw();
            }
        }
        // requestAnimationFrame(this.animate);
    }

    shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                this.shiftPoint(p);
            }});
    }

    // Canvas manipulation
    drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

  }
 
 
  

class MyKonvaCanvas extends Component {
   
    constructor(){
        super();
        window.points = [];
    }

    render() {

      // Stage is a div container
      // Layer is actual canvas element (so you may have several canvases in the stage)
      // And then we have canvas shapes inside the Layer
      return (
        <Stage width={window.innerWidth} height={window.innerHeight} className={'rocky large-header'}
        id="large-header" >
          <Layer id="demo-canvas">
            <Text text="Try click on rect" />
            <MyColoredRect />
            {/* <ColoredRect index={1} /> */}
                {/* <h1 className="main-title"><span className="thin">Explore</span> Space</h1> */}
            </Layer>
        </Stage>
      );
    }


  }

export default MyKonvaCanvas;