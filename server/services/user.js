const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Da li korisnik već postoji
      let user = await user.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Kreiranje novog korisnika
      user = new user({ username, email, password });
      await user.save();
  
      // Generisanje tokena, secret se čuva u env fajlu
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.loginUser = async (req, res) => {
    try {
      
      const { email, lozinka } = req.body;
      
      const user = await user.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'ERROR' });
      }
      
      if (!user.aktivan) {
        return res.status(403).json({ message: 'ERROR' });
      }
      const isMatch = await bcrypt.compare(lozinka, user.lozinka);
      if (!isMatch) {
        return res.status(400).json({ message: 'ERROR: WRONG PASSWORD' });
      }
  
      const token = jwt.sign({ userId: user._id, uloga: user.uloga }, process.env.JWT_SECRET, { expiresIn: '2d' });
  
      res.json({ token, uloga: user.uloga });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.vratiUsers = async (req, res) => {
    try {
      const users = await user.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.azuriraj = async (req, res) => {
    try {
      const { korisnickoIme, email, uloga, aktivan } = req.body;
      const user = await user.findByIdAndUpdate(req.params.id, { korisnickoIme, email, uloga, aktivan }, { new: true });
      
      if (!user) {
        return res.status(404).json({ message: 'ERROR' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deaktivirajUser = async (req, res) => {
    try {
      const user= await user.findByIdAndUpdate(req.params.id, { aktivan: req.body.aktivan }, { new: true });
      
      if (!user) {
        return res.status(404).json({ message: 'ERROR' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
 