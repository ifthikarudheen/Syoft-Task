const fs = require('fs');
const path = require('path');

let sequelize;

// Dynamically import Sequelize instance from config
import('../config/database.js')
  .then(database => {
    sequelize = database.default;
    loadModels();
  })
  .catch(error => {
    console.error('Error importing database:', error);
  });

const models = {};

// Load models from files in the current directory
function loadModels() {
  fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js') // Exclude index.js from loading
    .forEach(file => {
      const model = require(path.join(__dirname, file)).default(sequelize, sequelize.Sequelize);
      models[model.name] = model;
    });

  // Apply associations if necessary
  Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));
}

module.exports = { sequelize, models };
