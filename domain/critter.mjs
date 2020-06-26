import Entity from "./entity.mjs";

const NORTHERN_HEMISPHERE = "North";
const SOUTHERN_HEMISPHERE = "South";

class Critter extends Entity {
  constructor(
    name,
    price,
    location,
    schedule,
    northernHemisphere,
    southernHemisphere
  ) {
    super();
    this.name = name;
    this.price = price;
    this.location = location;
    this.schedule = schedule;
    this.northernHemisphere = northernHemisphere;
    this.southernHemisphere = southernHemisphere;
  }

  isCurrentlyAvailable(currentMonth, currentHour, hemisphere) {
    let availableThisMonth = false;

    if (hemisphere === NORTHERN_HEMISPHERE) {
      availableThisMonth = this.northernHemisphere.months[currentMonth]
        .available;
    } else if (hemisphere === SOUTHERN_HEMISPHERE) {
      availableThisMonth = this.southernHemisphere.monts[currentMonth]
        .available;
    } else {
      return false;
    }

    if (availableThisMonth) {
      if (this.schedule.allDay) {
        return true;
      } else {
        return (
          currentHour >= this.schedule.startingTime &&
          currentHour <= this.schedule.endingTime
        );
      }
    } else {
      return false;
    }
  }
}

export default Critter;