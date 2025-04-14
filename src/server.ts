import express, { Express, Request, Response } from 'express';
import { DonationService } from './services/DonationService';
import { CharityService } from './services/CharityService';
import { UserService } from './services/UserService';
import { DonationRepository } from './repositories/DonationRepository'; // Import the concrete repository
import { UserRepository } from './repositories/UserRepository'; // Import the concrete repository
import { RepositoryInterface } from './repositories/RepositoryInterface';
import { CharityRepository } from './repositories/CharityRepository';

const app: Express = express();
app.use(express.json());

// Initialize repositories and services (replace with your actual initialization logic)
const donationRepository = new DonationRepository();
const charityRepository = new CharityRepository();
const userRepository = new UserRepository();
const donationService = new DonationService(donationRepository, userRepository, charityRepository);
const charityService = new CharityService(charityRepository);
const userService = new UserService(userRepository);

// 1. POST /donate
app.post('/donate', async (req, res) => {
  const { userId, charityId, amount, currency } = req.body;
  try {
    const donation = await donationService.processDonation(userId, charityId, amount, currency);
    if (donation) {
      res.status(201).json(donation);
    } else {
      res.status(400).json({ error: 'Invalid donation parameters' });
    }
  } catch (error) {
    console.error('Error processing donation:', error);
    res.status(500).json({ error: 'Failed to process donation' });
  }
});

// 2. GET /charities
app.get('/charities', async (req, res) => {
  try {
    const charities = await charityService.findAll();

    res.status(200).json(charities);
  } catch (error) {
    console.error('Error fetching charities:', error);
    res.status(500).json({ error: 'Failed to fetch charities' });
  }
});

// 3. GET /charities/:charityId/donations
app.get('/charities/:charityId/donations', async (req, res) => {
  const { charityId } = req.params;
  try {
    const donations = await donationService.getDonationsByCharity(charityId);    
    
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations for charity:', error);
    res.status(500).json({ error: 'Failed to fetch donations for charity' });
  }
});

// 4. GET /users/:userId/donations
app.get('/users/:userId/donations', async (req, res) => {
  const { userId } = req.params;
  try {
    const donations = await donationService.getDonationsByUser(userId);    
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations for user:', error);
    res.status(500).json({ error: 'Failed to fetch donations for user' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});