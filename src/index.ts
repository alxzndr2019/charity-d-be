import { DonationRepository } from './repositories/DonationRepository';
import { DonationService } from './services/DonationService';
import { UserRepository } from './repositories/UserRepository';
import { CharityRepository } from './repositories/CharityRepository';
import { UserService } from './services/UserService';
import { CharityService } from './services/CharityService';

// Create repository instances
const donationRepository = new DonationRepository();
const userRepository = new UserRepository();
const charityRepository = new CharityRepository();

// Create service instances, injecting the repositories
const userService = new UserService(userRepository);
const charityService = new CharityService(charityRepository);
const donationService = new DonationService(
  donationRepository,
  userRepository,
  charityRepository
);

// Create a sample user
userService.createUser('John Doe', 'john.doe@example.com')
  .then(user => {
    console.log('Created user:', user);

    // Create a sample charity
    return charityService.createCharity('Save the Whales', 'A charity dedicated to protecting whales.')
      .then(charity => ({ user, charity }));
  })
  .then(({ user, charity }) => {
    console.log('Created charity:', charity);    

    return donationService.processDonation(      user.id,
      charity.id,
      100,
      'USD'
    );
  })
  .then(donation => console.log('Processed donation:', donation))
  .catch(error => console.error('Error:', error));
