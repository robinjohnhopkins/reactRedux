import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { Circ, TweenLite } from "gsap";

// This converts from a pure js sample to d3 which is fast enough
// as opposed to konva which has the canvas manipulation but I think is not as fast as 
// native js. I have left in some commented out code that was in the original
// so that it is easier to see the differences.
// The effect here is quite good but on the whole I think just using native only for high 
// refresh rate graphics is the way to go.
const Viz = (props) => {
  useEffect(() => {
   d3.select('.viz > *').remove();
   initHeader();
   initAnimation();
   draw(props);
   setInterval(() => draw(props), 3000);
   addListeners();
   return () => {
    console.log('cleaned up');
    props.incRedrawCount();
    };
 }, [props.linesDraw.length, props.redrawCount])
  return <div className="viz" />
}
const initHeader = () => {
  if (window.smeg !== undefined) return;
  var smeg = window.smeg = {};
  smeg.animateHeader = true;
  smeg.width = window.innerWidth;
  smeg.height = window.innerHeight;
  smeg.target = {x: smeg.width/2, y: smeg.height/2};

  // Util
  smeg.getDistance = (p1, p2) => {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  // create points
  smeg.points = [];
  var key = 100;
  for(var x = 0; x < smeg.width; x = x + smeg.width/20) {
      for(var y = 0; y < smeg.height; y = y + smeg.height/20) {
          var px = x + Math.random()*smeg.width/20;
          var py = y + Math.random()*smeg.height/20;
          var p = {x: px, toX:px, originX: px, y: py, toY:py, originY: py, key: key++};
          smeg.points.push(p);
      }
  }
  var i = 0;
  // for each point find the 5 closest points
  for(i = 0; i < smeg.points.length; i++) {
      var closest = [];
      var p1 = smeg.points[i];
      var k = 0;
      for(var j = 0; j < smeg.points.length; j++) {
          var p2 = smeg.points[j]
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
                      if(smeg.getDistance(p1, p2) < smeg.getDistance(p1, closest[k])) {
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
function Circle(pos,rad,color) {
  var _this = this;

  // constructor
  (function() {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
  })();

  this.draw = function() {
      if(!_this.active) return;
      // ctx.beginPath();
      // ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      // ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
      // ctx.fill();
  };
}
const animate = () => {
  var smeg = window.smeg
  if(smeg.animateHeader) {
      // ctx.clearRect(0,0,width,height);
      for(var i in smeg.points) {
          // detect points in range
          if(Math.abs(smeg.getDistance(smeg.target, smeg.points[i])) < 4000) {
            smeg.points[i].active = 0.3;
            smeg.points[i].circle_active = 0.6;
              // points[i].circle.active = 0.6;
          } else if(Math.abs(smeg.getDistance(smeg.target, smeg.points[i])) < 20000) {
            smeg.points[i].active = 0.1;
            smeg.points[i].circle_active = 0.3;
          } else if(Math.abs(smeg.getDistance(smeg.target, smeg.points[i])) < 40000) {
            smeg.points[i].active = 0.02;
            smeg.points[i].circle_active = 0.1;
          } else {
            smeg.points[i].active = 0;
            smeg.points[i].circle_active = 0;
          }
          //this.drawLines(points[i]);
          //points[i].circle.draw();
      }
  }
  // requestAnimationFrame(this.animate);
}
const initAnimation = () => {
  animate();
  var smeg = window.smeg;
  for(var i in smeg.points) {
      shiftPoint(smeg.points[i], i);
  }
}
const shiftPoint = (p, i) => {
  var smeg = window.smeg;
  TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
      y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
      onComplete: function() {
          shiftPoint(p, i);
      }});
}
const draw = (props) => {
    var smeg = window.smeg;
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var viz = d3.select('#svg-viz');
    if (viz.empty()){
    smeg.svg = d3.select('.viz').append('svg')
        .attr('height', h)
        .attr('width', w)
        .attr('id', 'svg-viz');
    }
    viz = d3.select('#svg-viz');
    var app = document.getElementById('app');
    console.log('width, height',w,h,document.documentElement.clientWidth, 
      window.innerWidth,app.clientWidth);
    smeg.offsetWidth = (w - app.clientWidth)/2;
    if (smeg.offsetWidth < 0){
      smeg.offsetWidth = 0;
    }
    if (props){
      const bubbles = props.bubbles
      smeg.max = d3.max(bubbles)
    }
    const radiusScale = d3.scaleSqrt().domain([0, smeg.max]).range([0, smeg.max])

    smeg.simulation = d3.forceSimulation()
      .force('x', d3.forceX(w/3).strength(0.05))
      .force('y', d3.forceY(h/3).strength(0.05))
      .force('charge', d3.forceManyBody().strength(-1300))
      .force('collide', d3.forceCollide(d => radiusScale(d.number)+1))
    
      //var p = {x: px, toX:px, originX: px, y: py, toY:py, originY: py, key: key++};
      const circles = viz.selectAll('circle')
        .remove()
        .data(smeg.points)
        .enter()
        .filter(function(d, i) {
          return d.active;
        })
        .append('svg:circle')
        .attr('r', "3px")  //.attr('r', d => d.width/2+"px")
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .style('fill', (d) => d.color ? d.color : 'rgba(156,217,249,'+ d.active+')')
        // 'rgba(156,217,249,'+ _this.active+')';
      smeg.simulation.nodes(props.bubbles)  //props.bubbles
        .on('tick', ticked)
        
      function ticked() {
        circles
          .attr('cx', d => d.x+Math.random())
          .attr('cy', d => d.y);
          
        drawLines();
  }
}
const drawLines = () => {
  var smeg = window.smeg;
    const viz = d3.select('#svg-viz')
      const d3lines = viz.selectAll('line').remove();
      for (var i=0; i < smeg.points.length;i++){
        drawPointLines(smeg.points[i], viz);
      }
      function drawPointLines(p, viz) {
        if(!p.active) return;
        for(var i in p.closest) {
          viz.append('line')
            .attr("x1", p.x)
            .attr("y1", p.y)
            .attr("x2", p.closest[i].x)
            .attr("y2", p.closest[i].y)
            .style("stroke", 'rgba(156,217,249,'+ p.active+')')  // colour the line
            .attr('stroke-width',1);
        }
      }
      return d3lines;
}
// Event handling
function addListeners() {
    if(!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
}

function mouseMove(e) {
    var smeg = window.smeg
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
    smeg.target.x = posx - smeg.offsetWidth;
    smeg.target.y = posy;
    animate();
}

function scrollCheck() {
    var smeg = window.smeg;
    if(document.body.scrollTop > smeg.height) smeg.animateHeader = false;
    else smeg.animateHeader = true;
}

function resize() {
  var smeg = window.smeg;
  smeg.width = window.innerWidth;
  smeg.height = window.innerHeight;
    // largeHeader.style.height = height+'px';
    // canvas.width = width;
    // canvas.height = height;
}
export default Viz