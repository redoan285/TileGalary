const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not found');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('tile-gallery');
    const collection = db.collection('tiles');

    // Read tiles.json
    const dataPath = path.join(__dirname, '..', 'data', 'tiles.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Check if tiles already exist to avoid duplicates (optional)
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log('Tiles already exist in database. Skipping seed.');
      return;
    }

    // Insert tiles
    const result = await collection.insertMany(data.tiles);
    console.log(`${result.insertedCount} tiles inserted`);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();
