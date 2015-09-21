var width = 960,
    height = 540;

var path = d3.geo.path();

var projection = d3.geo.albersUsa()

var scale = d3.scale.sqrt().domain([5500, 9000000]).range([5, 20])

var colorScale = d3.scale.category10()

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom().scaleExtent([1, 5]).on("zoom", zoom))
    .append('g');
    
    
    
function zoom(){
  svg.attr("transform", "translate("
+ d3.event.translate
+")scale(" + d3.event.scale + ")");
}

var map = svg.append("g").attr("class", "path")

d3.json("http://localhost:8000/map/us.json", function(error, topology) {
  if (error) throw error;
  map.selectAll("path")
      .data(topojson.feature(topology, topology.objects.states).features)
    .enter().append("path")
      .attr("d", path);
});


var information = svg.append("g").attr("class", "bubble");

d3.json("http://localhost:8000/national_parks/data.json", function(error, topology) {
  if (error) throw error;
  
         
   var path = information.selectAll("circle")
      .data(topology.data)
      .enter()
      .append('circle')
      .attr("transform", function(d) {return "translate(" + projection([d.longtitude, d.latitude]) + ")"})
      .attr("r", function(d) {return scale(d.area)})
      .style({"opacity": 0.5})
      .attr('fill', function(d) {return colorScale(d.visited)})
   
    var title = path
      .append('title')
      .text(function(d) {return d.name})
   
    path.on("mouseover", mouseover)
    .on("mouseout", mouseout)
        
       function mouseover(){
       return function(){
       d3.select(this)
       .selectAll("text")
       .enter()
      .append("text")
      .attr("transform", function(d) {return "translate(" + projection([d.longtitude, d.latitude]) + ")"})
      .text(function(d) {return d.name})
      .attr('fill', 'steelblue')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Arial')
      .attr('font-size', "10px")
       }
       }
       
       
       function mouseout(){
         
       }
})

