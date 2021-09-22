import { BattleRobot } from "../models/BattleRobot";

export class CombatService {
    Robot1 : BattleRobot
    Robot2 : BattleRobot

    constructor(robo1 : BattleRobot, robo2: BattleRobot){
        this.Robot1 = robo1;
        this.Robot2 = robo2;
    }

}

