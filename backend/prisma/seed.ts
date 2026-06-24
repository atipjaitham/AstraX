import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const mercury = await prisma.planet.create({
    data: {
      name: 'Mercury',
      description: 'Introduction to Quality Assurance',
      order: 1,
    },
  });

  await prisma.mission.create({
    data: {
      title: 'Find the Login Bug',
      description: 'Learn how to identify and report bugs.',
      xpReward: 100,
      difficulty: 'BEGINNER',
      planetId: mercury.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
