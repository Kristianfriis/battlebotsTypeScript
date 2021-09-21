import { RobotDetails } from "./RobotDetails";

export class Battle {
    BattleId : number;
    Robots : RobotDetails[] = []

    constructor(battleId : number, robot1 : RobotDetails, robot2 : RobotDetails){
        this.BattleId = battleId;
        this.Robots.push(robot1, robot2)
    }
}

