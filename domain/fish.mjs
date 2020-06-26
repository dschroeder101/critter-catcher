import Critter from "./critter.mjs";

class Fish extends Critter {
  constructor(shadowSize, hasFin) {
    super();
    this.shadowSize = shadowSize;
    this.hasFin = hasFin;
  }
}

export default Fish;