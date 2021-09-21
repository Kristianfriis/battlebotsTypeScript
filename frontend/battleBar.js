export default {
    template: `
    <div v-bind:style="battleBarStyle">
        <div>
            <h4>Go To Battle?!</h4>
            <button id="battleBtn"  @click="goBattle">BATTLE</button>
        </div> 
    </div>
  `,
  components: {
  },
    data() {
      return {
        battleBarStyle: {
            margin: "auto",
            textAlign: "center"
        }
      }
    },
    methods: {
        goBattle: function(){
            this.$emit('battle', "true")
        }
    }
  };