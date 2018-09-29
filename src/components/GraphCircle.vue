<template>
  <circle
    :r="r"
    :cx="node.x"
    :cy="node.y"
  />
</template>

<script>
  export default {
    name: 'GraphCircle',

    props: {
      r: Number,
      node: Object,
    },
  }
</script>
