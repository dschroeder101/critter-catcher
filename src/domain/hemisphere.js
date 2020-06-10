import Entity from "./entity";

class Hemisphere extends Entity {
  constructor(direction, months) {
    super();
    this.direction = direction;
    this.months = months;
  }
}
