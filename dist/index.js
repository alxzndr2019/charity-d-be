"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DonationRepository_1 = require("./repositories/DonationRepository");
var DonationService_1 = require("./services/DonationService");
var UserRepository_1 = require("./repositories/UserRepository");
var CharityRepository_1 = require("./repositories/CharityRepository");
var UserService_1 = require("./services/UserService");
var CharityService_1 = require("./services/CharityService");
// Create repository instances
var donationRepository = new DonationRepository_1.DonationRepository();
var userRepository = new UserRepository_1.UserRepository();
var charityRepository = new CharityRepository_1.CharityRepository();
// Create service instances, injecting the repositories
var userService = new UserService_1.UserService(userRepository);
var charityService = new CharityService_1.CharityService(charityRepository);
var donationService = new DonationService_1.DonationService(donationRepository, userRepository, charityRepository);
// Create a sample user
userService.createUser('John Doe', 'john.doe@example.com')
    .then(function (user) {
    console.log('Created user:', user);
    // Create a sample charity
    return charityService.createCharity('Save the Whales', 'A charity dedicated to protecting whales.')
        .then(function (charity) { return ({ user: user, charity: charity }); });
})
    .then(function (_a) {
    var user = _a.user, charity = _a.charity;
    console.log('Created charity:', charity);
    return donationService.processDonation(user.id, charity.id, 100, 'USD');
})
    .then(function (donation) { return console.log('Processed donation:', donation); })
    .catch(function (error) { return console.error('Error:', error); });
//# sourceMappingURL=index.js.map