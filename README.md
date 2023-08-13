
<p align="center">
  <img width="800" src="https://github.com/artemplv/Journease/assets/132113558/0bc6f372-ca77-409e-a91d-e03de9b5c1f2" style="background-color:black">
</p>

## Background and Overview

[Journease](https://journease.onrender.com) is a comprehensive trip planning web application. It allows users to create detailed travel itineraries for various destinations and occasions with ease. The platform promotes collaborative planning, allowing multiple users to contribute and refine trip plans together. Furthermore, users can openly share their curated itineraries, providing insights and inspiration to the community. Journease invites users to explore a wide range of travel experiences by accessing plans created by fellow users.

Journease is built with the MERN stack: MongoDB, Express, React, and Node. Additional technologies used include Google Maps API and AWS S3 Storage for image hosting.

![ezgif com-video-to-gif](https://github.com/artemplv/Journease/assets/131270949/c7f36a7b-f073-46fd-9fc4-8bf1b862f54e)


## Features

### User Authentication
  - Users are able to browse and search itineraries, as well as view a specific itinerary's show pages without being logged in but must log in or create an account in order to create itineraries. A Demo Login option is available for users to test the site's features.

### Itineraries
  - Users can create itineraries and add collaborators to their itineraries. All collaborators are able to edit the itinerary itself as well as its activities. The creator of the itinerary can add or remove collaborators.
 
![ezgif com-video-to-gif](https://github.com/artemplv/Journease/assets/131270949/9a61b950-8b7f-4d6c-8eb2-fd0d78d3e269)


  - Searching all users for collaborators in the itinerary modal was handled using a number of interconnected React functional components (as well as backend support) which all came together in the search users input field as follows:


<img width="574" alt="Screenshot 2023-08-13 at 5 11 09 PM" src="https://github.com/artemplv/Journease/assets/131270949/b33593f6-64d2-4fca-85b0-c6390779a5eb">


### Activities
  - Users and collaborators can create activities for each day of the trip. Utilizing Google Maps API, users are also able to search for specific places which will pin that location on the map allowing the user to visualize their trip. Pins are color coded and numbered by day for easy visualization of which activities will be done on what days. When selecting a place, an image is also automatically generated via Google Maps to showcase that activity. 

    
![ezgif com-video-to-gif](https://github.com/artemplv/Journease/assets/131270949/ad7a8c43-15b0-4802-ad11-8690b911ca36)

  - The code snippet below showcases handling of place input for the activities:

<img width="416" alt="Screenshot 2023-08-13 at 5 25 41 PM" src="https://github.com/artemplv/Journease/assets/131270949/55a20ee8-caaa-4e35-b350-cec399108aeb">


### Likes and Wishlist
  - Users are able to like and unlike itineraries which will automatically add that itinerary to the user's wishlist, allowing them to go back and revisit trips they liked in the past and use them as inspiration for future travels.

### Coming Soon:
  - An interactive map for each user where they can mark off countries they've visited
  - AI generated suggestions for itineraries


## Group Members

**Team Leader:** Artem Polevoy

**Front-end Lead:** Michelle Li

**Back-end Lead:** Ashley Kim

**Flex Lead:** Viktoria Czaran


Check out the About page on [Journease](https://journease.onrender.com) for more information on our incredible team!
