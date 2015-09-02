/**
 * Created by zhangtianye on 15/9/2.
 */

    var width = 960,
        height = 750;

    var svg = d3.select("body").append("svg")
        .attr("width",width)
        .attr("height",height);

    var projection = d3.geo.mercator()
        .center([105,40])
        .scale(850)
        .translate([width/2,height/2]);

    var path = d3.geo.path()
        .projection(projection);


    d3.json("china.json",function(error,root){
        if(error)
            return console.error(error);

        svg.selectAll("path")
            .data(root.features)
            .enter()
            .append("path")
            .attr("stroke","#000000")
            .attr("stroke-width",1)
            .attr("fill","#d8d8d8")
            .attr("d",path)
            .on("mouseover", function(d){
                d3.select(this)
                    .attr("fill","#f00")
                    .append("title")
                    .text(d.properties.name);
            })
            .on("mouseout",function(){
                d3.select(this).attr("fill","#d8d8d8")
            });


    });



