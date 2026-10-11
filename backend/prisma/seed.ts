import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  console.log("Seeding the platform admin user")

  const email = 'collecollins@gmail.com';
  const password = 'ChangeMe123';

  const passwordHash = await bcrypt.hash(password, 10);
  /*Seeding*/
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash: passwordHash },
    create: {
      email,
      fullName: "Collins Omondi",
      passwordHash,
      userType: 'PLATFORM_ADMIN',
      twoFactorEnabled: false,
      phone: '0725114379'
    },
  });

  console.log("\n Seeding the platform admin user done.")
}

main()