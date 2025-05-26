const Ground = require('../models/Ground');

class GroundController {
  async getAllGrounds(req, res) {
    try {
      const grounds = await Ground.find({ isActive: true });
      res.json({
        message: 'Grounds fetched successfully',
        data: grounds
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getGroundById(req, res) {
    try {
      const ground = await Ground.findById(req.params.id);
      if (!ground || !ground.isActive) {
        return res.status(404).json({ error: 'Ground not found' });
      }

      res.json({
        message: 'Ground fetched successfully',
        data: ground
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async seedGrounds(req, res) {
    try {
      const grounds = [
        {
          name: 'Central Football Ground',
          type: 'Football',
          location: 'Central Park, New York',
          pricePerHour: 50,
          capacity: 22,
          amenities: ['Changing Room', 'Parking', 'Water Facility', 'Lights']
        },
        {
          name: 'Elite Basketball Court',
          type: 'Basketball',
          location: 'Downtown Sports Complex',
          pricePerHour: 30,
          capacity: 10,
          amenities: ['Indoor Court', 'Air Conditioning', 'Sound System']
        },
        {
          name: 'Tennis Club Premium',
          type: 'Tennis',
          location: 'Riverside Tennis Club',
          pricePerHour: 40,
          capacity: 4,
          amenities: ['Professional Court', 'Equipment Rental', 'Coaching Available']
        },
        {
          name: 'Cricket Stadium',
          type: 'Cricket',
          location: 'Sports City',
          pricePerHour: 80,
          capacity: 22,
          amenities: ['Full Size Ground', 'Pavilion', 'Scoreboard', 'Parking']
        },
        {
          name: 'Badminton Arena',
          type: 'Badminton',
          location: 'Indoor Sports Complex',
          pricePerHour: 25,
          capacity: 4,
          amenities: ['Air Conditioned', 'Equipment Rental', 'Shuttle Service']
        }
      ];

      await Ground.deleteMany({}); 
      await Ground.insertMany(grounds);

      res.json({
        message: 'Ground data seeded successfully',
        data: grounds
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new GroundController();
