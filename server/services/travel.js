const travel = require('../models/travel');



exports.addTravel = async (req, res) => {
    try {
      const { naziv, slika, opis, polazak, povratak } = req.body;
      let travel = new travel({ naziv, slika, opis, polazak, povratak });
      await travel.save();
      res.status(201).json(travel);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.vratiTravels = async (req, res) => {
    try {
      const travels = await travel.find({})
      res.json(travels);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.vratiTravelId = async (req, res) => {
    try {
      const travel = await travel.findById(req.params.id)
  
      if (!travel) {
        return res.status(404).json({ message: 'No available travels' });
      }
  
      res.json(travel);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.deleteTravel = async (req, res) => {
    try {
      const travel = await travel.findById(req.params.id);
  
      if (!travel) {
        return res.status(404).json({ message: 'No travels' });
      }
      await travel.deleteOne({ _id: req.params.id });
      res.json({ message: 'Travel deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.odabirTravel = async (req, res) => {
    try {
      const travel = await travel.findById(req.params.id);
      if (!travel) {
        return res.status(404).json({ message: 'ERROR' });
      }

      if (travel.users.includes(req.user.userId)) {
        return res.status(400).json({ message: 'ERROR: SELECTED' });
      }
  
      travel.users.push(req.user.userId);
      await travel.save();
  
      res.json({ message: 'selected' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  