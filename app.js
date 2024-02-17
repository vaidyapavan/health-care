const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { Snowflake } = require('nodejs-snowflake');

const app = express(); // Initialize Express
app.set('view engine', 'ejs'); // Set view engine

mongoose.connect('mongodb://127.0.0.1:27017/login', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
  console.log('MongoDB connected successfully');
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const Person = mongoose.model('Person', {
  name: String,
  id: String
});

// Route for the root path, redirecting to /login
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('u'); // Assuming "u" is the name of your view file
});

app.post('/login', async (req, res) => {
  try {
    const uid = new Snowflake();
    const id = uid.getUniqueID().toString();
    const name = req.body.name;

    const person = new Person({ name, id });
    await person.save();

    res.json({ message: 'Person data saved successfully!', id });
  } catch (error) {
    console.error('Error saving person data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/search', (req, res) => {
  res.render('ID'); // Assuming "ID" is the name of your search form view file
});

app.post('/search', async (req, res) => {
  try {
    const searchID = req.body.searchID.toString();
    const workers = await Person.find({ id: searchID });

    res.render('searchresult', { workers }); // Assuming "searchresult" is the name of your search result view file
  } catch (error) {
    console.error('Error searching workers:', error);
    res.status(500).send('Failed to search workers');
  }
});

const PORT = 3200;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
