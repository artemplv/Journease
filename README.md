
<p align="center">
  <img width="800" src="https://github.com/artemplv/Journease/assets/132113558/0bc6f372-ca77-409e-a91d-e03de9b5c1f2">
</p>

## Background and Overview

Journease is a comprehensive trip planning web application. It allows users to create detailed travel itineraries for various destinations and occasions with ease. The platform promotes collaborative planning, allowing multiple users to contribute and refine trip plans together. Furthermore, users can openly share their curated itineraries, providing insights and inspiration to the community. Journease invites users to explore a wide range of travel experiences by accessing plans created by fellow users.

Journease is built with the MERN stack: MongoDB, Express, React, and Node.

## Functionality and MVP

- ### User Auth
  - Sign up, log in, and log out
  - Auth protected routes
  - Demo user login

- ### Itineraries
  - CRUD operations
  - Collaborators
  - Images

- ### Activities
  - CRUD operations
  - Predefined categories
  - Activities for each day of the trip

- ### Places
  - Search for places with Google Maps API
  - Map with places pinned on it

- ### Likes / wishlist
  - Ability to like other users' itineraries and save them to a wishlist
  - Display wishlist on user's profile page

- ### Production README

- ### Bonus
  - Interactive globe map on a user's profile page showing countries they visited
  - AI generated suggestions for itineraries


## Technologies and Technical Challenges
The app uses MERN stack and additionaly utilizes following technologies:

- ### Google Maps API
It's used for searching for places for itinerary activities and displaying them on a map after saving the retrived information to a database.

- ### AWS S3 Storage
It allows users to upload images for their itineraries.

## Wireframe

![Journease](https://github.com/artemplv/Journease/assets/132113558/14b9fd47-0a99-40c8-8ce9-26fa4b8ba720)

## Group Members and Work Breakdown
Team Leader: Artem Polevoy

Front-end Lead: Michelle Li

Back-end Lead: Ashley Kim

Flex Lead: Viktoria Czaran

### Day 0
- Decide on the exact features, views and app workflow for mvp — All
- Plan database schema — All
- Create wireframes and styling guidelines — Ashley
- Setup basics for the project, plan features implementation timeline — Artem
- Implement user auth on backend, create database — Viktoria
- Implement user auth on frontend, create header and modals — Michelle

### Day 1
- Finish day 0 work, discuss design suggestions, discuss features implementation plan, overview auth work and git workflow – All
- Implement itinerary creation modal with calendar and collaborators — Michelle
- Implement itinerary backend routes, db Model — Ashley
- Research AWS and add images to itinerary on backend — Ashley
- Create itinerary index page, itinerary cards — Viktoria
- Research Google Maps API and implement search field — Artem

### Day 2
- Finish previous day work, have a standup — All
- Create itinerary show page
- Create categories on backend
- Implement activities backend
- Research map and show saved places on it

### Day 3
- Implement activity creation modal, use places search field from Day 1
- Implement activity card and show them on itinerary show page
- Add map from Day 3 to itinerary show page
- Add edit modals

### Day 4
- create user profile page
- add likes
- display wishlist
- Deploy

