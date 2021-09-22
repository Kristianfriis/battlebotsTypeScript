import { RobotDetails } from "../models/RobotDetails";
import { Attack } from "../models/Attack";

export class CombatService {
    Robot1 : BattleRobot
    Robot2 : BattleRobot

    constructor(robo1 : BattleRobot, robo2: BattleRobot){
        this.Robot1 = robo1;
        this.Robot2 = robo2;
    }

}

export class BattleRobot {
    RobotDetails : RobotDetails;
    Attack : Attack

    constructor(robo : RobotDetails, attack : Attack){
        this.RobotDetails = robo;
        this.Attack = attack;
    }
}