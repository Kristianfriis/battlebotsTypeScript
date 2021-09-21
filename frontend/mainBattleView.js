import Statusbar from "./statusbar.js";
import Actions from "./actions.js"
import battleBar from "./battleBar.js";
const Type = {
	Attack: 0,
	Defense: 1,
	Heal: 2,
	Message:3,
	Status:4
}

export default {
    template: `
    <div id="main-view">
    <battleBar v-if="!battleIsOn" @battle="getBattleData"></battleBar>

    <div v-if="battleIsOn">
        <div id="opponent">
            opponent
            <Statusbar v-bind:robo="enemy"></Statusbar>
        </div>
        <div id="player">
            player
            <div id="action-status-bar">
              <div id="actions-placeholder" v-show="!showActions"></div>
              <Actions id="actions" v-show="showActions" v-bind:actions="actions"></Actions>
              <Statusbar v-bind:robo="player" id="player-status-bar"></Statusbar>
            </div>
        </div>
        <button @click="healthCheck(enemy, 56)">klik</button>
        <button @click="displayMessages(enemy, 56)">messages</button>
        <div id="messages">{{message}}</div>
    </div>
    </div>
  `,
  components: {
    Statusbar,
    Actions,
    battleBar
  },
    data() {
      return {
          enemy: {
              name: "enemy robot",
              currentHealth: 356,
              healthTotal: 356,
              healthPercent: "100%"
          },
          player: {
            name: "awesome robot",
            currentHealth: 356,
            healthTotal: 356,
            healthPercent: "100%"
        },
        actions: [{Name: "Power Hammer"},{Name: "Photon Shield"},{Name: "Hand Cannon"}],
        message: "",
        showActions: false,
        battleIsOn: false,
        facts: []
      }
    },
    methods: {
        healthCheck: function(robo, dam){
            let newHealth = robo.currentHealth + dam
            robo.currentHealth = newHealth
            let hpInPct = ((newHealth/robo.healthTotal)*100) + "%"
            robo.healthPercent = hpInPct
            this.enemy = robo;
        },
        displayMessages: async function(){
          var test = [
            new Message("You use Power Hammer", Type.Message, 0),
            new Message("Power Hammer hits for 56 dmg", Type.Attack, -56),
            new Message(this.enemy.name + " suffers from concussion", Type.Status, 0)
          ]

          var messages = this.facts;

            this.message = messages[0].Message
            for (const item of messages) {
                await sleep(1500)
                this.message = item.Message  
                if(item.Type == Type.Attack){
                    this.healthCheck(this.enemy, item.Effect)
                }
            }
            await sleep(1500)
            this.message = ""
          this.showActions = true
        },
        getBattleData(){
          this.battleIsOn = true
          const events = new EventSource('http://localhost:8080/events/'+1000);
          events.onmessage = (event) => {
              const parsedData = JSON.parse(event.data);

              this.facts = parsedData

              var obj = Object.assign(new Message(), parsedData)
              this.facts.push(obj)

              this.displayMessages()
          }
        }
    }
  };

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  class Message {
    constructor(message, type, effect){
      this.Message = message;
      this.Type = type;
      this.Effect = effect;
    }
  }