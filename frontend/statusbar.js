export default {
    props: ['robo'],
    template: `
    <div v-bind:style="statusbarStyle">
        <div>{{robo.name}}</div> <div>{{health}}</div> 
        <div v-bind:style="healthBarStyle">
            <div v-bind:style="barStyle"></div>
        </div>
    </div>
  `,
  components: {
  },
    data() {
      return {
        statusbarStyle: {
            backgroundColor: "hsl(200deg 25% 95%)",
            borderRadius: "5px",
            border: "2px solid rgb(213 219 222)",
            width: "340px",
            padding: "10px"
        },
        healthBarStyle: {
            borderRadius: "5px",
            padding: "5px",
            width: "300px",
            backgroundColor: "lightgrey"
        },
        barStyle: {
            borderRadius: "5px",
            width: null,
            height: "5px",
            backgroundColor: "red",
            transition: "width .75s ease"
        },
      }
    },
    computed: {
        health: function(){
            console.log(this.robo.healthPercent)
            this.barStyle.width = this.robo.healthPercent;
        }
    }
  };