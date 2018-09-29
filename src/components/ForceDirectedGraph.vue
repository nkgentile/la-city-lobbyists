<template>
  <figure/>
</template>

<script>
  import * as d3 from 'd3';
  import CircleNode from '@/components/GraphCircle';

  export default {
    name: 'ForceDirectedGraph',
    
    components: {
      CircleNode,
    },

    props: {
      nodes: Array,
      links: Array,
    },

    computed: {
      width(){
        return window.innerWidth;
      },

      height(){
        return window.innerHeight;
      },

      simulation(){
        return d3.forceSimulation();
      },

      $graph(){
        const root = document.createElement('svg');
        return d3.select(root)
          .attr('width', this.width)
          .attr('height', this.height)

      },

      $nodes(){
        return this.$graph
          .selectAll(`.${this.$style.node}`)
          .data(this._nodes)
          .enter().append('circle')
          .attr('r', 5)
          .attr('cx', this.width/2)
          .attr('cy', this.height/2)
          .attr('class', this.$style.node)
      },

      _nodes(){
        return [
          ...this.nodes
        ];
      },
    },

    methods: {
    },

    mounted(){
      const linkForce = d3.forceLink(this.links);
      const manyBodyForce = d3.forceManyBody();
      const xForce = d3.forceX(this.width/2);
      const yForce = d3.forceY(this.height/2);

      this.simulation.nodes(this._nodes)
        .force('linkForce', linkForce)
        .force('charge', manyBodyForce)
        .force('xAxis', xForce)
        .force('yAxis', yForce)
        .on('tick', () => {
          this.$nodes.attr('cx', ({x}) => x)
              .attr('cy', ({y}) => y)
        });

      this.$el.appendChild(this.$graph.node());
    },
  };
</script>

<style module>
  .node {
    fill: red;
  }

  .line {
    stroke: black;
  }
</style>
