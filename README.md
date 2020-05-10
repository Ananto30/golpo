# Golpo13 (v2)

A simple social network web app built with React and Express. This is the 2nd version of the [Golpo13](https://golpo13-old.herokuapp.com/) which I built a few years back. The main purpose is to write clean code and use a frontend technology like React.

***We can continue this as an open platform for people!***

***This is not a mobile friendly web app! Not responsive!***

## Installation

The Express server and React client are both served by the Express server.

Mostly if you want to run the whole app, you have to set the env variables. All of them can be found in `server/config.js` file. After setting those in you env -

```bash
cd client
npm install
npm run build

cd ../
npm install
npm start
```
This will basically run the Express app and the build files of React app will be served by express static.

But for development, probably you wouldn't want to build every time. So you can just start the server with `npm start`. And then go to the `/client` directory and start the React development with `npm start` 


## Feature level todo's

- [x] Google login
- [x] Home page with all posts, user card, and activity feed
- [x] Home page posts with the comment count
- [x] Post with comment (when clicked in comment) and able to post new comment
- [x] Realtime activity feed in several pages (state managed by mobx)
- [x] Activity feed updates with specific activities from user (like new post, comment and profile changes)
- [x] Profile page with user-specific posts 
- [x] Profile page with a text area to post a new post 😐
- [x] **User card with image change option (people don't notice it!)**
- [x] Tagline and work is changeable from user card with edit profile button
- [x] Users page with all users, clickable to go to their profile
- [x] Send message option with other user's profile
- [x] Message page with recent chats
- [x] Message page's recent chat is clickable to open chat history of that user
- [x] Realtime messaging (using socket.io)

- [ ] **MAKE IT RESPONSIVE**
- [ ] Option to use google image
- [ ] Message seen
- [ ] New message/chat notification
- [ ] Notification for comment in user's post
- [ ] Notification for same post commenters
- [ ] Follow option for users (for now it's the least priority)
- [ ] User registration

.............. and much more.

## Code level todo's

- [x] Clean code (not fully, there's always room for improvement and debate 🍻)
- [x] Decouple service, model and controller in Express
- [x] State management for necessary components in React (using [mobx](https://mobx.js.org/README.html))

- [ ] Code refactor in React
- [ ] Proper error handling (with global) in Express
- [ ] Proper error handling in React
- [ ] Password hashing, as there's no registration option now, there's no password to save, this will be done when registration feature will come

............... and much more.

## Contributing
There's a lot to do. So please contribute to make Golpo great again 😅 


## License
[![license](https://github.com/Ananto30/golpo13-v2/blob/master/LICENSE)
