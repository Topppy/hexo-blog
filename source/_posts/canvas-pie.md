---
title: canvas-pie
date: 2018-12-10 15:29:48
tags: 
  - canvas
  - chart
  - pie
---

# 在Canvas上将数据画成饼图

将这个功能封装成为一个pie对象，只需要将参数对象传递给pie.init(config)函数，就能初始化canvas，然后调用pie.render()函数，饼图就画好啦。

<!-- more -->

<canvas id="cas" height="600" width="600"></canvas>

## 使用方法：
- 引入pie.js文件
最开始需要在你的代码前面引入pie.js文件，你可以放在head标签里面，也可以放在body底部其他script标签的前面。
- 获取canvas元素

```js
var canvas = document.getElementById("cas");
```
- 设置参数
  准备好数据、图例和颜色（内置了9个颜色，数据数量小于9的话，不传颜色参数也可以啦~）

```js
var data = [10,20,50,100,30,40,70,22];
var legend=["C++","Ruby","Java","JS","Python","R","C","D"];
var colors=["#CCFFFF",'#99CC66','#CCCCFF','#0099CC',"#FF6600",'#996699','#FFFF00',"#FF6666"]
var config={
    canvas:canvas,
    series:data,
    title:"Coding language",
    legend:legend,
    tip:{enable:true},
    colors:colors
}
```

- 使用pie的初始化函数载入数据, 使用pie.render()画图

```js
//调用pie的初始化函数
pie.init(config);
//绘制饼图
pie.render();
```

## 附录
pie.js源码：
``` javascript
// 绘制饼图的对象
var pie={
  canvas:null,
  series:[],
  legend:[],
  title:"Pie",
  width:0,
  height:0,
  tip:{
      enable:false,
      canvas : null,
      ctx: null,
      index: -1
  },
  radius:0,
  center:{},
  colors:["#FF6666","#CCFFFF",'#99CC66','#CCCCFF','#0099CC',"#FF6600",'#996699','#FFFF00','#FFFF00'],
  //初始化参数的函数
  init:function(config){
      this.canvas=config.canvas;
      this.series=config.series;
      this.legend=config.legend;
      this.title=config.title;
      this.width=this.canvas.width;
      this.height=this.canvas.height;
      if(config.tip){
          this.tip.enable=config.tip.enable;
      };
      this.colors=config.colors||this.colors;
  },
  //获取 鼠标的绝对坐标(即使有滚动的情况下)
  getMousePos:function(event) {
      var e = event || window.event;
      var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
      var x = e.pageX || e.clientX + scrollX;
      var y = e.pageY || e.clientY + scrollY;
      return { 'x': x, 'y': y };
  },
  //函数去抖 即使在指定间隔内调用多次但是只执行一次
  debounce:function (fn, threshhold, scope) {
    threshhold || (threshhold = 32);//250ms是指定执行间隔
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;//过了threshhold才会将该函数插入js进程队列，至少此后才会执行这一句
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  },
  //显示 tooltip的函数
  tipshow:function(position,ctx){
      var canPos=this.getCanActPos(this.canvas);
      var rPos={};
      rPos.x=position.x-canPos.x-this.center.x;
      rPos.y=position.y-canPos.y-this.center.y;
      rPos.dis=Math.floor(Math.sqrt(rPos.x*rPos.x+rPos.y*rPos.y));
      if(rPos.dis<this.radius){
          rPos.arc= Math.atan2(rPos.y,rPos.x);
          if(rPos.arc<=0){
              rPos.arc+=Math.PI*2;
          }
          var sum=this.series.reduce(function(pre,cur){
              return pre+cur;
          });
          var percent=this.series.map(function(item){
              return item/sum;
          });
          var perArc=percent.map(function(item){
              return item*Math.PI*2;
          });
          var curArc=0;var curIndex=0;
          var len=this.series.length;
          for(var i=0;i<len;i++){
              curArc+=perArc[i];
              if(rPos.arc<curArc){
                  curIndex=i;
                  break;
              }

          }
          if(this.tip.canvas===null){
              this.tip.canvas=document.createElement('canvas');
              this.tip.canvas.id="tip";
              document.body.appendChild(this.tip.canvas);

              this.tip.canvas.style.position="absolute";
              this.tip.canvas.style.left=position.x+20+"px";
              this.tip.canvas.style.top=position.y+20+"px";
              this.tip.canvas.style.zIndex=2;
              this.tip.canvas.height=50;
              this.tip.canvas.width=100;
              this.tip.ctx=this.tip.canvas.getContext("2d");
          }
          this.tip.canvas.style.display="block";
          var tctx=this.tip.ctx;
          tctx.clearRect(0,0,this.tip.canvas.width,this.tip.canvas.height);
          this.tip.canvas.style.left=position.x+20+"px";
          this.tip.canvas.style.top=position.y+20+"px";
          tctx.fillStyle="rgba(200,200,200,0.6)";
          tctx.fillRect(0, 0, this.tip.canvas.width,this.tip.canvas.height);
          tctx.fillStyle="#000";
          tctx.font="15px bold Arail";
          // tctx.textBaseLine="top";
          tctx.fillText((percent[curIndex]*100).toFixed(2)+"%", 20, 40);
          tctx.fillText(this.legend[curIndex], 20, 20);
      }else if(this.tip.canvas!=null){
          this.tip.canvas.style.display="none";
      }
  },
  //饼图的绘制函数
  render:function(){
      var center={
          x:Math.floor(this.width/2),
          y:Math.floor(this.height/2)
      };
      this.center=center;
      var edge=50;
      var ctx=this.canvas.getContext("2d");
      var radius=Math.min(center.x,center.y)-edge*2;
      this.radius=radius;
      var sum=this.series.reduce(function(pre,cur){
          return pre+cur;
      });
      var percent=this.series.map(function(item){
          return item/sum;
      });
      var perArc=percent.map(function(item){
          return item*Math.PI*2;
      });
      var curArc=0;
      var len=this.series.length;
      ctx.save();
      ctx.strokeStyle="#000";
      //drawpie
      for (var i=0;i<len;i++){
          ctx.beginPath();
          ctx.arc(center.x,center.y,radius,curArc,curArc+perArc[i]);
          ctx.lineTo(center.x,center.y);
          ctx.closePath();
          ctx.fillStyle=this.colors[i];
          ctx.fill();
          curArc=curArc+perArc[i];
      };
      //legend
      ctx.font="15px bold Arail";
      // ctx.textBaseLine="bottom";
      for(var i=0;i<len;i++){
          ctx.fillStyle=this.colors[i];
          ctx.fillRect(this.width-2*edge+5, 20*i, 15, 15);
          ctx.fillStyle="#000";
          ctx.fillText(this.legend[i], this.width-2*edge+25, 20*i+15);
      }
      //title
      ctx.textAlign="center";
      ctx.fillText(this.title,center.x,edge-20);
      //tooltip
      if(this.tip.enable){
          var mousePos={x:0,y:0};
          this.canvas.addEventListener("mousemove", pie.debounce(function(e){
              // e = e || window.event;
              // mousePos.x = e.clientX;
              // mousePos.y = e.clientY;
              mousePos=pie.getMousePos(e);
              pie.tipshow.apply(pie,[mousePos,ctx]);
          }, false));

      }
  },
  //获取canvas的绝对坐标
  getCanActPos:function(element){
      var actualLeft = element.offsetLeft;
      var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
          actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return {x:actualLeft,y:actualTop};
  }
};
```

<script src="/scripts/pie.js" type="text/javascript"></script>
<script>
    var canvas = document.getElementById("cas");
    // var ctx = canvas.getContext("2d");
    var data = [10,20,50,100,30,40,70,22];
    var legend=["C++","Ruby","Java","JS","Python","R","C","D"];
    var colors=["#CCFFFF",'#99CC66','#CCCCFF','#0099CC',"#FF6600",'#996699','#FFFF00',"#FF6666"]
    var config={
        canvas:canvas,
        series:data,
        title:"Coding language",
        legend:legend,
        tip:{enable:true},
        colors:colors
    }
    //调用pie的初始化函数
    pie.init(config);
    //绘制饼图
    pie.render();
</script>



