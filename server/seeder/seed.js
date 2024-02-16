const db = require('../config/connection');
const { User } = require('../models');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    console.log('Seeding Complete!');
    process.exit(0);
  }
  catch (err) {
    throw err;
  }
});