<template>
  <canvas :width="width" :height="height" />
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: 'ForceDirectedGraph',

    props: {
      nodes: Array,
      links: Array,
    },

    data(){
      return {
        context: {},
        simulation: d3.forceSimulation(),
      }
    },

    computed: {
      width(){
        return window.innerWidth;
      },

      height(){
        return window.innerHeight;
      },

      _nodes(){
        return [
          ...this.nodes
        ];
      }
    },

    watch: {
      _nodes: {
        handler(val, oldVal){
          console.log(val);
        },

        deep: true,
        immediate: true,
      }
    },

    methods: {
      draw(){
        this.context.clearRect(0, 0, this.width, this.height);
        this._nodes.forEach(this.drawNode);
      },

      drawNode({ x, y }){
        const context = this.context;

        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fill();
      },
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
        .on('tick', this.draw)

      this.context = this.$el.getContext('2d');
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
