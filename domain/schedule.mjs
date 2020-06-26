import Entity from "./entity.mjs";

class Schedule extends Entity {
  constructor(startingTime, endingTime, allDay) {
    super();
    this.startingTime = startingTime;
    this.endingTime = endingTime;
    this.allDay = allDay;
  }
}
export default Schedule;