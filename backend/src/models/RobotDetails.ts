export class RobotDetails {
    RobotDetailsId: number;
    Name: string;
    CurrentHealth: number;
    HealthTotal: number;
    HealthPercent: string;

    constructor(id: number, name: string, healthTotal: number) {
        this.RobotDetailsId = id;
        this.Name = name;
        this.HealthTotal = healthTotal;
    }

    UpdateHealth(dam : number){
        let newHealth : number = this.CurrentHealth + dam;
        this.CurrentHealth = newHealth;
        let hpInPct : string = ((newHealth/this.HealthTotal)*100) + "%";
        this.HealthPercent = hpInPct;
    }
}
