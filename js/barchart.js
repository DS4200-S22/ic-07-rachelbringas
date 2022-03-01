/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// selects the hard-coded-bar div, adds an svg with a width and height, and a viewbox
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg") 
  .attr("width", width-margin.left-margin.right)  
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// finds the maximum Y value from the data
let maxY1 = d3.max(data1, function(d) { return d.score; });

// sets the y-scale with a linear scale, with a domain from 0 to the maximum y-value,
// the range sets the location of the axis  
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// sets the x-scale where the domain is each of the data points in data1 and the range is the location
// mapping data to pixels
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// appends the y-axis to the svg with a font size of 20, transform aligns the axis
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// appends the x-axis to the svg with a font size of 20, sets the ticks as each point in the data
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// Add div for tooltip to webpage
const tooltip1 = d3.select("body") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Add values to tooltip on mouseover, make tooltip div opaque  
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Position tooltip to follow mouse 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset)+"px"); 
}

// Return tooltip to transparant when mouse leaves
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// creates bars in svg1 from the data in data1, 
// for each bar, creates a rectangle with the class bar, and sets the x and y values from the data
// sets the width and height from the data
// appends the three event handlers to the bar data
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// Add div for tooltip to webpage
const tooltip2 = d3.select("body") 
                .append("div") 
                .attr('id', "tooltip2") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Add values to tooltip on mouseover, make tooltip div opaque  
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Position tooltip to follow mouse 
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset)+"px"); 
}

// Return tooltip to transparant when mouse leaves
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}



// ALL CODE FOR the SECOND BARCHART IN THE CSV-BAR DIV

  // data for plot
  d3.csv("data/barchart.csv").then(function(data) {

    // add svg to csv-bar div
    let svg2 = d3
      .select("#csv-bar")
      .append("svg")
      .attr("width", width-margin.left-margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("viewBox", [0, 0, width, height]);

    console.log(data);

    // setting the axes
    let maxY2 = d3.max(data, function(d) { return d.score; });

    let yscale2 = d3.scaleLinear()
                  .domain([0,maxY2])
                  .range([height-margin.bottom, margin.top]); 


    let xscale2 = d3.scaleBand()
                    .domain(d3.range(data.length))
                    .range([margin.left, width - margin.right])
                    .padding(0.1);

    svg2.append("g")
          .attr("transform", `translate(${margin.left}, 0)`) 
          .call(d3.axisLeft(yscale2)) 
          .attr("font-size", '20px');

    svg2.append("g")
          .attr("transform", `translate(0,${height - margin.bottom})`) 
          .call(d3.axisBottom(xscale2) 
                    .tickFormat(i => data[i].name))  
          .attr("font-size", '20px'); 

  // adding the bars
  svg2.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
        .attr("class", "bar") 
        .attr("x", (d,i) => xscale2(i)) 
        .attr("y", (d) => yscale2(d.score)) 
        .attr("height", (d) => (height - margin.bottom) - yscale2(d.score)) 
        .attr("width", xscale2.bandwidth())
        .on("mouseover", mouseover2) 
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2);
})



