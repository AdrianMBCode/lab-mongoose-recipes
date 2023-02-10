const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create ({
      title: "Curry",
      level: "Amateur Chef",
      ingredients: ["chicken", "coco", "cheese", "potato"],
      cuisine: "Oriental",
      dishTypes: "other",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 60,
      creator: "Adrián Martín",
      created: 2023,
    })

  })
  .then((result) => {
    console.log(result.title);
    return Recipe.insertMany(data)
  })
  .then((recipes) => {
    recipes.forEach(recipe => {
      console.log(`- Recipe Title: ${recipe.title}`)
    })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},  {duration: 100},  {new: true})
  })
  .then(() => {
    console.log("You updated the recipe")
  })
  
  .then (() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log("Recipe deleted")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close();
    console.log("Closed MongoDB connection");
  });
