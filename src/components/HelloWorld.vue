<template>
  <div class="hello">
  </div>
</template>

<script>
import { pipe, pluck, uniq, map, objOf, findIndex, equals } from 'ramda';
import * as d3 from 'd3';

import lobbyists from '@/assets/lobbyists.json';

const firmNames = pipe(
  pluck('lobbying_firm'),
  uniq
)(lobbyists);

const firms = map(
  objOf('name'),
  firmNames
);

const links = lobbyists.map( (l, i) => {
  const firm = l['lobbying_firm'];
  const firmId = findIndex(equals(firm), firmNames);

  return {
    source: firmId,
    target: i + firms.length
  };
});

export default {
  name: 'Lobbyists',
  data () {
    return {
      width: 0,
      height: 0,
      nodes: [...firms, ...lobbyists],
      links,
      svg: null,
      node: null,
      simulation: d3.forceSimulation(),
    };
  },

  mounted(){
    const dimensions = this.$el.getBoundingClientRect();
    this.width = dimensions.width;
    this.height = dimensions.height;

    const linkForce = d3.forceLink(this.links);

    const manyBodyForce = d3.forceManyBody();


    this.simulation.nodes(this.nodes)
      .force('linkForce', linkForce)
      .force('charge', manyBodyForce);

    this.simulation.force('xAxis', d3.forceX(this.width/2));
    this.simulation.force('yAxis', d3.forceY(this.height/2));

    this.svg = d3.select(this.$el)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.node = this.svg.selectAll('.node')
      .data(this.nodes)
      .enter().append('circle')
      .attr('r', 5)
      .attr('cx', this.width/2)
      .attr('cy', this.height/2)
      .attr('fill', 'red')
      .attr('class', 'node');

    this.drawLinks();

    this.simulation.on('tick', this.ticked);
  },

  methods: {
    drawLinks(){
      this.link = this.svg.selectAll('.link')
        .data(this.links)
        .enter().append('line')
        .attr('class', 'link')
        .attr('x1', d => this.nodes[d.source.index].x )
        .attr('y1', d => this.nodes[d.source.index].y )
        .attr('x2', d => this.nodes[d.target.index].x )
        .attr('y2', d => this.nodes[d.target.index].y )
        .attr('stroke', 'black');
    },

    drawNodes(){
    },

    ticked(){
      this.node.attr('cx', d => d.x)
        .attr('cy', d => d.y);

      this.link.attr('x1', d => d.source.x )
        .attr('y1', d => d.source.y )
        .attr('x2', d => d.target.x )
        .attr('y2', d => d.target.y )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 100vw;
  height: 100vh;
}

circle.node {
  fill: red;
}

line.link {
  stroke: black;
}
</style>
