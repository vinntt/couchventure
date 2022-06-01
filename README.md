# COUCHVENTURE 🛋️
- **Demo: [click me](https://couchventure.herokuapp.com/)**
- **Live screen recording preview: [click me](https://drive.google.com/file/d/1FDHbpHfsIa3HcFZCoshmxOW-H_xcbRGf/view)**
- **Short Presentation: [click me](https://www.canva.com/design/DAE6qZbSgxM/MFxgJegLKmkaWPS1Aq6Qog/view?utm_content=DAE6qZbSgxM&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)**

## Description
- This is a full-stack app that was originally inspired by [Couchsurfing](https://www.couchsurfing.com/). I'm quite active on the app but since the app charges fees, I and many of my friends stopped using it and are looking for an alternative options.
- I want to build a free app which helps the traveler to plan their trips ahead, search for hosts by location where they want to travel in the future, send a request to stay in the host's accommodation for free, and chat with the host to understand each other and arrange the arrival/leave time or the meeting location. Then, the user can cancel the request if they could not make the trip and the host can accept or deny requests from travelers. 

## Technical skills
- HTML
- CSS
- JavaScript
- Axios
- Express JS
- Node JS
- React
- MongoDB
- Material UI (MUI)
- Mongoose
- Heroku
- Cloudinary

## App routes
**My Profile:**
  - Edit Profile
  - Create a new trip
  - Edit a trip
  - Delete a trip
  - List trips
  - Add a couch
  - Edit a couch
  - Delete a couch
  - Requests
  - Messages

**View Others Profile:**
  - See profile details
  - See couch
  - See trips
  - Send a request message => inbox
  - Send a message => inbox

**Search:**
  - Search by location: Find Hosts, Find Travelers => List User =>

**[My Profile]**
- View Profile: /profile/me => /profile/:id
- View trips: /profile/me/trips => /profile/:id/trips
- View couch: /profile/me/couch => /profile/:id/couch

**[Others Profile]**
- View Profile: /profile/:id
- View trips: /profile/:id/trips
- View couch: /profile/:id/couch

**[Trips]**
- Create a new trip: POST /trips/
- Edit a trip: PUT /trips/:id
- Delete a trip: DELETE /trips/:id

**[Couches]**
- Create a new couch: POST /couches/
- Edit a couch: PUT /couches/:id
- Delete a couch: DELETE /couches/:id

## User Stories
- **Sign Up** - As a user, I would like to be able to create a new account.
- **Login** - As a user, I would like to be able to login so that I can write some lines to introduce myself, create my future travel plan as well as describe my home.
- **Logout** - As a user, I would like to log out of my account so that no-one will have access to it and redirect to the login or sign up page.
- **Landing Page** - As a user, I would like to be welcomed by randomly beautiful travel scene images, inspiration quotes and further information providing the user with a "sneak peek" to what the website is about.
- **Profile Page** - As a user, I would like to be able to see my profile with all details. I also can easily either edit any information on my profile or delete it, which includes my travel plan and my home description.
- **My Travel Plan** - As a user, I would like to be able to create a travel plan with details, view all of my travel plans that I have created and to be able to edit/delete them.
- **My Home** - As a user, I would like to be able to describe my home with more details, upload photos and later on I can view, edit or delete it.
- **Search Page** - As a user, I would like to be able to search for hosts by country or city. I can access the host's profiles, send them requests to stay, text them something as messages.

## Backlog
- **Message button** where the user can access and check their messages or requests history.
- **Send Message** need to be real-time and easy to access and check.
Search **Hosts/Travellers** buttons where the user can switch between these buttons and look on purpose (be a host or looking for hosts).
- **Local Hosts** and **Upcoming Visitors** options on the landing page need to be separated.

## Nice to have
- **Add Friend feature** where the user can connect with people.
- **Write Reference** where the user can leave the review after hosting or being hosted by others.
- **Hangout feature** where the user can spontaneously ask others to hangout within the location where they are in.
