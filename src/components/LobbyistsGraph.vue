<template>
  <force-graph :nodes="nodes" :links="links" />
</template>

<script>
  import { pipe, pluck, uniq, map, objOf, findIndex, equals } from 'ramda';
  import { mapState, mapGetters } from 'vuex';

  import ForceGraph from '@/components/ForceDirectedCanvasGraph';

  export default {
    name: 'LobbyistsGraph',

    components: {
      ForceGraph,
    },

    computed: {
      ...mapState([
        'lobbyists',
      ]),

      ...mapGetters([
        'firmNames',
        'firms',
      ]),

      links(){
        return this.lobbyists.map( (l, i) => {
          const firm = l['lobbying_firm'];
          const firmId = findIndex(equals(firm), this.firmNames);

          return {
            source: firmId,
            target: i + this.firms.length
          };
        });
      },

      nodes(){
        return [
          ...this.firms,
          ...this.lobbyists,
        ];
      }
    },
  };
</script>
