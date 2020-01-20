import App from './App'

const React = require("react");
const ReactDOM = require('react-dom');

/**
* Requirements:
* - When the user taps "s" anywhere on the page, it should toggle the visibility of the SearchForm component
* - The app should fetch a list of "cat facts" (once) from the API listed below.
* - Display "Loading..." to indicate that the data is being fetched.
* - Display a list of "cat facts", sorted by the lowest upvotes.
* - Ability to hide a "cat fact" by pressing "x" next to a single "cat fact".
*
* Bonus points (Optional):
* (these are completely optional so don't feel pressured to complete these)
* - Instead of hiding, implement the ability to toggle "[+]/[-]" on each "cat fact".
* - Implement a search input field and filter the "cat facts" by the search input.
* - A live, working code sample hosted on StackBlitz (or anywhere else you'd prefer).
* - Use of TypeScript
*
* Notes:
* - Don't worry too much if you can't complete a requirement. We just want to see how you approach problems.
* - Try to avoid using external libraries unless for a good reason
* - You're allowed to refactor this whole project to your discretion.
* - Error handling isn't required
* - Styling is a nice-to-have but not required
*/


ReactDOM.render(
  <App />, 
  document.getElementById('root')
);