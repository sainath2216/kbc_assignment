# Build a Simple KBC-style Game 

Develop a KBC-style game where the question and a QR code are displayed on a computer screen. Players who wish to participate scan the QR code using their mobile devices, enter their names, and view the same question on their screen.

## Refer to the image below:
![image](https://github.com/user-attachments/assets/48193f49-ee95-4842-8bf4-2515b64933ee)


### `Set Up Instructions`

+ Download dependencies by running npm install
+ Start up the app using npm start
  - Runs the app in the development mode.

### `Completion Instructions`
1.Generate a QR code using a library (e.g., qrcode.react) in the main screen component (the computer screen).
2.The QR code will contain the link to the same React application that players can scan on their mobile devices to join the game.
3.When a player submits their answer from the mobile screen, check if the answer matches the correct one.
4.If the answer is correct:
  - Display a congratulatory message on the computer screen along with the player's name.
  - If the answer is incorrect Send feedback to the player’s mobile screen indicating that the answer is wrong.
  - 5. Ending the Game When all questions are answered, display a completion message on the main screen.
6. Test the flow by running the app on both a computer and a mobile device (using the QR code to join).
7. Final Testing and Polish Ensure the question display, answer submission, and validation work correctly.
8. Refine the UI/UX to ensure smooth transitions between questions and provide clear feedback for both correct and incorrect answers.

### `Implementation Files`
+ src/components/GameLargeScreen/index.js
+ src/components/GameLargeScreen/index.css
+ src/components/GameMobileScreen/index.js
  

### `Key Considerations`

+ State Management: All game logic, including question handling, player management, and answer validation, will be managed using React’s useState or useReducer hooks.

+ Single Application for Both Views: Both the computer and mobile screens will be different views of the same application. React’s component-based structure makes it easy to conditionally render different UIs based on whether the user is on the computer or mobile.
+ QR Code: The QR code is a simple mechanism to allow mobile players to quickly join the game, making the app more interactive and closer to the real KBC experience.

### `Font-families`
+ #fff
+ #00000
+ #ff0000
+ #1A237E
+ #FFEB3B


