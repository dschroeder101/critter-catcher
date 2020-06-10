import Entity from "./entity";

class Schedule extends Entity {
  constructor(startingTime, endingTime, allDay) {
    super();
    this.startingTime = startingTime;
    this.endingTime = endingTime;
    this.allDay = allDay;
  }
}
