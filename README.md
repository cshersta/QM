
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=plastic&logo=javascript)
![React](https://img.shields.io/badge/-React-3b2e5a?style=plastic&logo=react)
![Node.JS](https://img.shields.io/badge/-Node.JS-black?style=plastic&logo=Node.js)
![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=plastic&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=plastic&logo=Socket.io&logoColor=white)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=plastic&logo=bootstrap)

# Quantum Messaging
> This is project is for my own learning purposes. Uses ReactJS, NodeJS, and Sockets to make a chat application. Something like whatsapp web
> Live demo [_here_]().

## Project Status
Project is: _in progress_

## TODO

Create context / use context / context provider or use redux / reducer to pass data around **

	- redux toolkit?

Encrypt (hash) password / user messages

User login with password

Token or session based authentication

Css / bootstrap **

	- responsive / mobile css *

	- chatgroups sidebar scrollable **

Testing / bug fixes **

	- stale date **

	- cross messaging between users (messages to wrong users) - I'm not sure this happens *

	- signup button - disable by default and if invalid -> initialize isValid to false, set isValid to false if username invalid

	- Console errors

		- strict mode error - triggered when a modal is opened

		- unused variables

	- sockets seem to shared between users. Login with different windows / users at the same time and the data gets intermingled ****

Animate message and group loading *

Login page - clear err on modal close

Update server returns to use proper header, response codes (REST) - https://socket.io/docs/v4/how-it-works/

Search should return both users and as well as chatGroups that the user is a part of

Add message box submit button -> useful for mobile

Implement more efficient data transfer method - as Socket.IO library keeps an open TCP connection to the server, it apparently can result in high battery drain -> use Firebase Cloud Messaging?

## Acknowledgements
- This project was inspired by the full stack web developer program taken through coursera
- This project was started with and heavily expanded from [this tutorial](https://developer.okta.com/blog/2021/07/14/socket-io-react-tutorial).
