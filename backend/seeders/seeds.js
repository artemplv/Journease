const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Itinerary = require('../models/Itinerary');

const DEFAULT_PROFILE_IMAGE_URL = 'https://journease-artemplv.s3.amazonaws.com/blank-profile-picture-973460_1280.webp'; 
const DEFAULT_COVER_IMAGE_URL = 'https://journease-artemplv.s3.amazonaws.com/photo-1512100356356-de1b84283e18.jpg';

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const initializeImages = async () => {
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });
  await Itinerary.updateMany({}, { coverImageUrl: DEFAULT_COVER_IMAGE_URL });

  mongoose.disconnect();
}
