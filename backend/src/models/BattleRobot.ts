import { RobotDetails } from "./RobotDetails";
import { Attack } from "./Attack";


export class BattleRobot {
    RobotDetails: RobotDetails;
    Attack: Attack;

    constructor(robo: RobotDetails, attack: Attack) {
        this.RobotDetails = robo;
        this.Attack = attack;
    }

    //combat logic goes here, will either return robotdetails or update battleDB with it,
    //but it will return a list of Messages that describe what have transpired
}
