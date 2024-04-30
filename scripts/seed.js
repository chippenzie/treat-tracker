const { db } = require('@vercel/postgres');

async function seedTreats(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS treats (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                name VARCHAR(255) NOT NULL,
                period INT NOT NULL,
                start_on INT NOT NULL)
        `;
        console.log(`Created "treats" table`);
   
        return {
          createTable,
        };
    } catch (error) {
        console.error('Error creating table treats:', error);
        throw error;
    }
}

async function seedTreatLog(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS treatlog (
                id serial primary key,
                treat_id UUID NOT NULL,
                start_on INT NOT NULL,
                notes VARCHAR(255))
        `;
        console.log(`Created "treatlog" table`);
   
        return {
          createTable,
        };
    } catch (error) {
        console.error('Error creatnig table treatlog:', error);
        throw error;
    }
}


async function main() {
    const client = await db.connect();
  
    await seedTreats(client);
    await seedTreatLog(client);
  
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });
