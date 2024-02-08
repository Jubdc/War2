/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

function getRandomYear(startYear, endYear) {
  return Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
}

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    // await database.query(" user");

    for (let i = 0; i < 50; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO film(title, description, director, release_date, image) VALUES (?, ?, ?, ?, ?)",
          [
            faker.lorem.sentence(),
            faker.lorem.paragraph(),
            faker.person.lastName(),
            getRandomYear(1990, 2024), // Pas besoin de .toString() si le type de la colonne est YEAR
            faker.image.abstract(1234, 2345),
          ]
        )
      );
    }

    for (let i = 0; i < 30; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO directors(firstname, lastname, birthDate, age, country, filmNumber, filmList, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            faker.person.firstName(),
            faker.person.lastName(),
            faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
            faker.datatype.number({ min: 0, max: 120 }), // Pas besoin de .toString() si le type de la colonne est YEAR
            faker.location.country(),
            faker.string.numeric(42),
            faker.person.lastName(),
            faker.image.abstract(1234, 2345),
          ]
        )
      );
    }

    for (let i = 0; i < 30; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO user(name, email, country, hashedPassword, combo, score) VALUES (?, ?, ?, ?, ?, ?)",
          [
            faker.internet.displayName(),
            faker.internet.email(),
            faker.location.country(),
            faker.internet.password(),
            getRandomYear(0, 30),
            faker.number.float(),
          ]
        )
      );
    }

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
