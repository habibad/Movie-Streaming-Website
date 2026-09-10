import { PrismaClient } from './src/generated';

const prisma = new PrismaClient();

try {
  const rows = await prisma.$queryRaw<Array<{ column_name: string }>>`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'User'
    ORDER BY ordinal_position
  `;
  console.log(JSON.stringify(rows, null, 2));
} finally {
  await prisma.$disconnect();
}
