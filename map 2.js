/**
 * Created by zhangtianye on 15/9/2.
 */

    var width = 960,
        height = 750;

    var svg = d3.select("body").append("svg")
        .attr("width",width)
        .attr("height",height);

    var g = svg.append("g")
        .style('stroke-width', '1.5px');

    var projection = d3.geo.mercator()
        .center([105,38])
        .scale(850)
        .translate([width/2,height/2]);

    var path = d3.geo.path()
        .projection(projection);


    d3.json("china.json",function(error,root){
        if(error)
            return console.error(error);

        g.selectAll("path")
            .data(root.features)
            .enter()
            .append("path")
            .attr("stroke","#000000")
            .attr("stroke-width",1)
            .attr('class','feature')
            .attr("d",path)
//            .on("mouseover", function(d){
//                d3.select(this)
//                    .attr("fill","#f00")
//                    .append("title")
//                    .text(d.properties.name);
//            })
//            .on("mouseout",function(){
//                d3.select(this).attr("fill","#d8d8d8")
//            })
            .on("click",clicked);


    });

    function clicked(d){
        if(typeof(active) != 'undefined'){
            if(active.node() === this) return reset();
            active.classed("active",false);
        }
        active = d3.select(this).classed("active",true);

        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[1][0] + bounds[0][0]) / 2,
            y = (bounds[1][1] + bounds[0][1]) / 2,
            scale = 0.7 / Math.max(dx / width, dy / height),
            translate = [width / 2 -  scale * x, height / 2 -  scale * y];

        g.transition()
            .duration(750)
            .style('stroke-width', 1.5 / scale + 'px')
            .attr("transform","translate(" + translate +")scale(" + scale + ")");


    }

    function reset(){
        active.classed("active",false);
        active = d3.select(null);

        g.transition()
            .duration(750)
            .style('stroke-width','1.5px')
            .attr('transform','');
    }