import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDB() {
  await prisma.user.deleteMany({});
}

export default resetDB;
