import mongoose from "mongoose";
require("dotenv").config();

class ManageDB {
  cosntructor({ logger }) {
    this.logger = logger;
  }

  async connect() {
    const connection = process.env.MONGO_URI;

    this.logger.debug("Connecting to database...");

    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);

    await mongoose
      .connect(connection, { useNewUrlParser: true })
      .catch((error) => {
        this.logger.error("Error while connecting to the databse", error);
        process.exit(1);
      });

    this.logger.debug("Connected to the database");
  }

  async close() {
    this.logger.debug("Closing database...");

    await mongoose.connection.close().catch((error) => {
      this.logger.error("Error while closing the databse", error);
      process.exit(1);
    });

    this.logger.debug("Database closed");
  }
}
