import Critter from "./critter";

class Fish extends Critter {
  constructor(shadowSize, hasFin) {
    super();
    this.shadowSize = shadowSize;
    this.hasFin = hasFin;
  }
}

export default Fish;