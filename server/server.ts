import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const server = express();

import registerRoutes from "./routes/register.routes";
import loginRoutes from "./routes/login.routes";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import checkoutRoutes from "./routes/checkout.routes";
import mediaRoutes from "./routes/media.routes";

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());

server.use("/api/v1/register", registerRoutes);
server.use("/api/v1/login", loginRoutes);
server.use("/api/v1/user", userRoutes);
server.use("/api/v1/product", productRoutes);
server.use("/api/v1/order", orderRoutes);
server.use("/api/v1/checkout", checkoutRoutes);
server.use("/api/v1/media", mediaRoutes);

server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
