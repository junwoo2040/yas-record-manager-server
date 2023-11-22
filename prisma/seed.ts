import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.donationRecord.deleteMany({});
  await prisma.spendingRecord.deleteMany({});
  await prisma.salesRecord.deleteMany({});

  await prisma.user.create({
    data: {
      email: "isy.junny@gmail.com",
      firstName: "Jun Woo",
      lastName: "Baek",
      username: "jun2040",
      password: "1234",
      donationRecords: {
        create: [
          {
            donorName: "Isabel Tan",
            donorContact: "24tani@isyedu.org",
            amount: 10000,
          },
        ],
      },
      spendingRecords: {
        create: [
          {
            note: "Something",
            amount: 5000,
          },
        ],
      },
      salesRecords: {
        create: [
          {
            clientName: "Lin Htet Aung",
            clientContact: "24aungl@isyedu.org",
            product: "Calendar",
            price: 10000,
            quantity: 5,
            discount: 0,
          },
        ],
      },
    },
  });
}

main().then(() => {
  console.log("Data seeded");
});
