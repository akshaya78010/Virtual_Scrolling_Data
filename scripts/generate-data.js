import fs from "fs";
import { faker } from "@faker-js/faker";

const TOTAL = 1_000_000;
const statuses = ["Completed", "Pending", "Failed"];
const categories = ["Food", "Shopping", "Travel", "Bills", "Health"];

const transactions = [];

for (let i = 0; i < TOTAL; i++) {
  transactions.push({
    id: i + 1,
    date: faker.date.past().toISOString(),
    merchant: faker.company.name(),
    category: categories[Math.floor(Math.random() * categories.length)],
    amount: Number(
      faker.finance.amount({
        min: 10,
        max: 10000,
        dec: 2
      })
    ),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: faker.lorem.sentence()
  });
}

fs.writeFileSync(
  "./public/transactions.json",
  JSON.stringify(transactions)
);

console.log("✅ 1,000,000 records generated successfully");
