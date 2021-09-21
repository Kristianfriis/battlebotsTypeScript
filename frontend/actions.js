export default {
    props: ['actions'],
    template: `
    <div v-bind:style="actionbarStyle">
        <div>
            <button v-bind:style="action">{{actions[0].Name}}</button>
            <button v-bind:style="action">{{actions[1].Name}}</button>
        </div>
      
        <div>
            <button v-bind:style="action">{{actions[2].Name}}</button>
            <button v-bind:style="action">Back</button>
        </div>
    </div>
  `,
  components: {
  },
    data() {
      return {
        actionbarStyle: {
            backgroundColor: "hsl(200deg 25% 95%)",
            borderRadius: "5px",
            border: "2px solid rgb(213 219 222)",
            width: "340px",
            padding: "5px",
            height: "45px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly"
        },
        action: {
            width: "160px",
            background: "none",
            color: "inherit",
            border: "1px solid rgb(213 219 222)",
            borderRadius: "5px",
            padding: "0",
            font: "inherit",
            cursor: "pointer",
            outline: "inherit"
        }
      }
    }
  };