const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const travelRoutes = require('./routes/travelRoutes');
const bcrypt = require('bcrypt');
const cors = require('cors');
const user = require('./models/user');
const travel = require('./models/travel');


mongoose.connect('mongodb+srv://drewsbelieber459:edina123@dbtravel256.cwo8kph.mongodb.net/dbtravel_256?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to database')
    dodajAdmin();
});

async function dodajAdmin() {
  try {
    const adminUser = await user.findOne({ email: "edina@gmail.com" });
    if (!adminUser) {
      const newAdmin = new user({
        korisnickoIme: "Admin",
        lozinka: "admin123", 
        email: "edina@gmail.com",
        uloga: "admin",
        aktivan: true
      });
      await newAdmin.save();
      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Error ensuring admin user:", error);
  }
}

async function addTravel() {
    try {
      const existingTravel = await travel.findOne({ naziv: "Barselona" });
      if (!existingTravel) {
        const newTravel = new travel({
            naziv: "Barselona",
            slika: "https://a.cdn-hotels.com/gdcs/production81/d1983/1441d9b5-d0e6-4230-9923-646d58ba66d8.jpg", 
            opis: "Barselona ljeto 2024.",
            polazak: new Date('2024-06-06'), 
            povratak: new Date('2024-07-07'), 
            ucesnici: [] 
        });
        await newTravel.save();
        console.log("Example travel created");
      }
    } catch (error) {
      console.error("Error ensuring example travel:", error);
    }
  }

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/travels', travelRoutes);



app.get('/', (req, res) => {
  res.send('Web Travel Portal');
});



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
