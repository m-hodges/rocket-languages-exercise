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

// Returns a list of "cat facts" { all: [ { _id: string, upvotes: number, text: string } ] }
var API_URL = "https://www.mocky.io/v2/5e1e7dfb31000068001892e8";
/**
* Entry point for our application
*/
export default function App() {
  var [searchFormIsOpen, setSearchFormIsOpen] = React.useState(false);  
  var [catFacts, setCatFacts] = React.useState(null);
  var [loading, setLoading] = React.useState(true);

  React.useEffect(function onMount() {
    // Set loading to "true"
    // setLoading(true);
    // When component mounts, listen for keydown events
    window.addEventListener("keydown", onKeyDown)
    // Unmount the event listener when the component unmounts
    return function cleanup () {
      window.removeEventListener("keydown", onKeyDown)
    }
  });

  function closeSearchForm() {
    setSearchFormIsOpen(false);
  }

  function onKeyDown (event) {
    // Toggle search form visibility when the user taps "s" anywhere on the window
    if (event.keyCode === 83) {
      setSearchFormIsOpen(!searchFormIsOpen);
      }
   }
  

  if (loading) {
    // Fetches all cat facts
    // Expected response: { all: [{ _id: string, text: string, upvotes: number }] }
    fetch(API_URL)
      .then(response => response.json())
      .then(function(response) {
        setCatFacts(response.all);
      })     
      .then(function() {
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <>
        <h1>Cat Facts</h1>
        <div>Tap 's' to toggle the search form!</div>
        <span>Loading...</span>
        <footer>Copyright</footer>
      </>
    );
  } else if (searchFormIsOpen) {
    return (
      <>     
        <h1>Cat Facts</h1>
        <span>Tap 's' to toggle the search form!</span>
        {searchFormIsOpen && <SearchForm onClose={closeSearchForm} />}
        {/* {SearchForm({ onClose: closeSearchForm })} */}
        <AllCatFacts list={catFacts} />
        <footer>Copyright</footer>
      </>
    )
  } else {
    return (
      <>
        <h1>Cat Facts</h1>
        <span>Tap 's' to toggle the search form!</span>
        <AllCatFacts list={catFacts} />
        <footer>Copyright</footer>
      </>
    );
  }
}

// Requirements:
// - mount/unmount when the user taps "s".
// - unmount when the user presses the "Close" button
// props: {onClose: Function}
class SearchForm extends React.Component {
  render() {
    return (
      <div style={{border: "2px dashed red"}}>
        <h2>Search Form</h2>
        <button onClick={() => (this.props.onClose())}>Close</button>
      </div>
    )
  }
};

// Requirements:
// - display an unordered list, displaying: "[x upvotes] {text}" per line
// - A button on each line that can "hide" the line
// props: { list: [{ _id: string, text: string, upvotes: number }] }
class AllCatFacts extends React.Component {
  // Expected output [ { _id: "", upvotes: 1, text: "" }, { _id: "", upvotes: 2, text: "" }, { _id: "", upvotes 3, text: "" } ]

  sortListByUpvotesDescending() {
    var list = this.props.list;
    var len = list.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            if (list[j] < list[j + 1]) {
                let tmp = list[j];
                list[j] = list[j + 1];
                list[j + 1] = tmp;
            }
        }
    }
  }

  componentWillReceiveProps() {
    this.sortListByUpvotesDescending();
  }

  hide(index) {
    console.log(index)
  }

  render() {
    // var componentList = [];
    return (
      <ul>
        {
          this.props.list.map((catFact, i) => (
            <li key={i}>
              <span>[{catFact.upvotes} upvotes]: {catFact.text}</span>
              <button onClick={() => this.hide(i)}>x</button>
            </li>
          ))
        }
      </ul>
    )

    
    // this.props.list.map((catFact, i) => {
    //   componentList.push(
    //     <li key={i}>
          
    //     </li>
    //   );
    // });
    // return <ul>{componentList}</ul>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));