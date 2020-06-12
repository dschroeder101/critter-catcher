import mongoose from "mongoose";
require("dotenv").config();

// class ManageDB {
//   cosntructor({ logger }) {
//     this.logger = logger;
//   }

//   async connect() {
//     const connection = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@critter-catcher1-is7lo.azure.mongodb.net/critter-catcher1?retryWrites=true&w=majority`;

//     this.logger.debug("Connecting to database...");

//     mongoose.set("useCreateIndex", true);
//     mongoose.set("useFindAndModify", false);

//     await mongoose
//       .connect(connection, { useNewUrlParser: true })
//       .then(console.log("connected from ManageDB"))
//       .catch((error) => {
//         this.logger.error("Error while connecting to the databse", error);
//         process.exit(1);
//       });

//     this.logger.debug("Connected to the database");
//   }

//   async close() {
//     this.logger.debug("Closing database...");

//     await mongoose.connection.close().catch((error) => {
//       this.logger.error("Error while closing the database", error);
//       process.exit(1);
//     });

//     this.logger.debug("Database closed");
//   }
// }
// export default ManageDB;
