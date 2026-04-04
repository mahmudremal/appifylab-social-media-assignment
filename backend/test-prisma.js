const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query", "info"] });

async function main() {
  try {
    const userCount = await prisma.user.count();
    console.log("Success! User count:", userCount);
  } catch (e) {
    console.error("Prisma failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
