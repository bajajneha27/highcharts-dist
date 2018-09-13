/*
  Highcharts JS v6.1.3 (2018-09-12)

 Indicator series type for Highstock

 (c) 2010-2017 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(r){"object"===typeof module&&module.exports?module.exports=r:"function"===typeof define&&define.amd?define(function(){return r}):r(Highcharts)})(function(r){(function(g){var t=Math.abs,r=g.each,w=g.noop,x=g.addEvent,z=g.correctFloat,B=g.seriesType,y=g.seriesTypes.column.prototype;B("vbp","sma",{params:{ranges:12,volumeSeriesID:"volume"},zoneLines:{enabled:!0,styles:{color:"#0A9AC9",dashStyle:"LongDash",lineWidth:1}},volumeDivision:{enabled:!0,styles:{positiveColor:"rgba(144, 237, 125, 0.8)",
negativeColor:"rgba(244, 91, 91, 0.8)"}},animationLimit:1E3,enableMouseTracking:!1,pointPadding:0,zIndex:-1,crisp:!0,dataGrouping:{enabled:!1},dataLabels:{enabled:!0,allowOverlap:!0,verticalAlign:"top",format:"P: {point.volumePos:.2f} | N: {point.volumeNeg:.2f}",padding:0,style:{fontSize:"7px"}}},{nameBase:"Volume by Price",bindTo:{series:!1,eventName:"afterSetExtremes"},calculateOn:"render",markerAttribs:w,drawGraph:w,getColumnMetrics:y.getColumnMetrics,crispCol:y.crispCol,init:function(b){var a,
c;g.seriesTypes.sma.prototype.init.apply(this,arguments);a=this.options.params;c=this.linkedParent;a=b.get(a.volumeSeriesID);this.addCustomEvents(c,a);return this},addCustomEvents:function(b,a){function c(){e.chart.redraw();e.setData([]);e.zoneStarts=[];e.zoneLinesSVG&&(e.zoneLinesSVG.destroy(),delete e.zoneLinesSVG)}var e=this;e.dataEventsToUnbind.push(x(b,"remove",function(){c()}));a&&e.dataEventsToUnbind.push(x(a,"remove",function(){c()}));return e},animate:function(b){var a=this,c={};g.svg&&!b&&
(c.translateX=a.yAxis.pos,a.group.animate(c,g.extend(g.animObject(a.options.animation),{step:function(b,c){a.group.attr({scaleX:Math.max(.001,c.pos)})}})),a.animate=null)},drawPoints:function(){this.options.volumeDivision.enabled&&(this.posNegVolume(!0,!0),y.drawPoints.apply(this,arguments),this.posNegVolume(!1,!1));y.drawPoints.apply(this,arguments)},posNegVolume:function(b,a){var c=a?["positive","negative"]:["negative","positive"],e=this.options.volumeDivision,n=this.points.length,h=[],d=[],f=0,
m,k,g,l;b?(this.posWidths=h,this.negWidths=d):(h=this.posWidths,d=this.negWidths);for(;f<n;f++)l=this.points[f],l[c[0]+"Graphic"]=l.graphic,l.graphic=l[c[1]+"Graphic"],b&&(m=l.shapeArgs.width,k=this.priceZones[f],(g=k.wholeVolumeData)?(h.push(m/g*k.positiveVolumeData),d.push(m/g*k.negativeVolumeData)):(h.push(0),d.push(0))),l.color=a?e.styles.positiveColor:e.styles.negativeColor,l.shapeArgs.width=a?this.posWidths[f]:this.negWidths[f],l.shapeArgs.x=a?l.shapeArgs.x:this.posWidths[f]},translate:function(){var b=
this,a=b.options,c=b.chart,e=b.yAxis,n=e.min,h=b.options.zoneLines,d=b.priceZones,f=0,m,k,u,l,v,q,p,A,w,x;y.translate.apply(b);m=b.points;m.length&&(p=.5>a.pointPadding?a.pointPadding:.1,a=b.volumeDataArray,k=g.arrayMax(a),u=c.plotWidth/2,A=c.plotTop,l=t(e.toPixels(n)-e.toPixels(n+b.rangeStep)),v=t(e.toPixels(n)-e.toPixels(n+b.rangeStep)),p&&(n=t(l*(1-2*p)),f=t((l-n)/2),l=t(n)),r(m,function(a,c){w=a.barX=a.plotX=0;x=a.plotY=e.toPixels(d[c].start)-A-(e.reversed?l-v:l)-f;q=z(u*d[c].wholeVolumeData/
k);a.pointWidth=q;a.shapeArgs=b.crispCol.apply(b,[w,x,q,l]);a.volumeNeg=d[c].negativeVolumeData;a.volumePos=d[c].positiveVolumeData;a.volumeAll=d[c].wholeVolumeData}),h.enabled&&b.drawZones(c,e,b.zoneStarts,h.styles))},getValues:function(b,a){var c=b.processedXData,e=b.processedYData,n=b.chart,h=a.ranges,d=[],f=[],m=[];if(!n)return g.error("Base series not found! In case it has been removed, add a new one.",!0);if(!(n=n.get(a.volumeSeriesID)))return g.error("Series "+a.volumeSeriesID+" not found! Check `volumeSeriesID`.",
!0);if((a=g.isArray(e[0]))&&4!==e[0].length)return g.error("Type of "+b.name+" series is different than line, OHLC or candlestick.",!0);b=this.priceZones=this.specifyZones(a,c,e,h,n);r(b,function(a,b){d.push([a.x,a.end]);f.push(d[b][0]);m.push(d[b][1])});return{values:d,xData:f,yData:m}},specifyZones:function(b,a,c,e,n){var h;if(b){h=c.length;for(var d=c[0][3],f=d,m=1,k;m<h;m++)k=c[m][3],k<d&&(d=k),k>f&&(f=k);h={min:d,max:f}}else h=!1;h=(d=h)?d.min:g.arrayMin(c);k=d?d.max:g.arrayMax(c);var d=this.zoneStarts=
[],f=[],u=0,m=1,l;if(!h||!k)return this.points.length&&(this.setData([]),this.zoneStarts=[],this.zoneLinesSVG.destroy()),[];l=this.rangeStep=z(k-h)/e;for(d.push(h);u<e-1;u++)d.push(z(d[u]+l));d.push(k);for(e=d.length;m<e;m++)f.push({index:m-1,x:a[0],start:d[m-1],end:d[m]});return this.volumePerZone(b,f,n,a,c)},volumePerZone:function(b,a,c,e,n){var h=this,d=c.processedXData,f=c.processedYData,m=a.length-1,k=n.length;c=f.length;var g,l,v,q,p;t(k-c)&&(e[0]!==d[0]&&f.unshift(0),e[k-1]!==d[c-1]&&f.push(0));
h.volumeDataArray=[];r(a,function(a){a.wholeVolumeData=0;a.positiveVolumeData=0;for(p=a.negativeVolumeData=0;p<k;p++)v=l=!1,q=b?n[p][3]:n[p],g=p?b?n[p-1][3]:n[p-1]:q,q<=a.start&&0===a.index&&(l=!0),q>=a.end&&a.index===m&&(v=!0),(q>a.start||l)&&(q<a.end||v)&&(a.wholeVolumeData+=f[p],g>q?a.negativeVolumeData+=f[p]:a.positiveVolumeData+=f[p]);h.volumeDataArray.push(a.wholeVolumeData)});return a},drawZones:function(b,a,c,e){var g=b.renderer,h=this.zoneLinesSVG,d=[],f=b.plotWidth,m=b.plotTop,k;r(c,function(c){k=
a.toPixels(c)-m;d=d.concat(b.renderer.crispLine(["M",0,k,"L",f,k],e.lineWidth))});h?h.animate({d:d}):h=this.zoneLinesSVG=g.path(d).attr({"stroke-width":e.lineWidth,stroke:e.color,dashstyle:e.dashStyle,zIndex:this.group.zIndex+.1}).add(this.group)}},{destroy:function(){this.negativeGraphic&&(this.negativeGraphic=this.negativeGraphic.destroy());return g.Point.prototype.destroy.apply(this,arguments)}})})(r)});
//# sourceMappingURL=volume-by-price.js.map
