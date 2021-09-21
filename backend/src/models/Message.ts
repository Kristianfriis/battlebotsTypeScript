export class Message {
    Message : string;
    Effect : number;
    Type : MessageType

    constructor(message : string, type : MessageType, effect : number){
      this.Message = message;
      this.Type = type;
      this.Effect = effect;
    }
  }

export enum MessageType {
    Attack = "ATTACK",
    Status = "STATUS",
    Message = "MESSAGE"
}