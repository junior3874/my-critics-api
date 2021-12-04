import PrismaAdapter from "@/infra/repositories/prisma/prisma-adapter";
import express from "express";

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("my app init in port", port);
});
