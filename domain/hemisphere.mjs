import Entity from "./entity.mjs";

class Hemisphere extends Entity {
  constructor(direction, months) {
    super();
    this.direction = direction;
    this.months = months;
  }
}

export default Hemisphere;
