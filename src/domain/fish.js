import Critter from "./critter";

class Fish extends Critter {
  constructor(shadowSize, isFin) {
    super();
    this.shadowSize = shadowSize;
    this.isFin = isFin;
  }
}

export default Fish;