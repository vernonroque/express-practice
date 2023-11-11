// Import the express library here
const express = require('express');

const cors = require('cors');
// Instantiate the app here
const app = express(); 


app.use(cors());


const PORT = process.env.PORT || 4001;

// Use static server to serve the Express Yourself Website
app.use(express.static('public'));

// Invoke the app's `.listen()` method below:
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  const names = [];

app.get('/', (req,res) => {
    console.log("Hello World");
    res.status(200).send({"message":"hello world"});
})

app.get('/query', (req,res) => {
    console.log(`The value is ${req.query.value}`);
    console.log(`The number is ${req.query.number}`);
    res.status(200).send(`Hello ${req.query.value} and ${req.query.number}`);
})

app.get('/:name', (req,res) => {
    console.log(`Hello ${req.params.name}`);
    res.status(200).send({"message":`Hello ${req.params.name}`});
})
app.post('/newName', (req,res) =>{
    const newUser = req.query.name;
    console.log('You made a new user. It is >>>', newUser);
    names.push(newUser);
    res.status(201).send({"list":names})
})


