Uses ReactJS, NodeJS, and Sockets to make a chat application. Something like whatsapp web

<h1>TODO</h1>

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
