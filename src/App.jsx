import AllCatFacts from './AllCatFacts'
import SearchForm from './SearchForm'

const React = require('react')

// Returns a list of "cat facts" { all: [ { _id: string, upvotes: number, text: string } ] }
var API_URL = "https://www.mocky.io/v2/5e1e7dfb31000068001892e8";
/**
* Entry point for our application
*/

const App = () => {
  var [searchFormIsOpen, setSearchFormIsOpen] = React.useState(false);  
  var [catFacts, setCatFacts] = React.useState(null);
  var [loading, setLoading] = React.useState(true);

  React.useEffect(function onMount() {
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
        {searchFormIsOpen && 
            <SearchForm 
                onClose={closeSearchForm} 
                onKeyDown={onKeyDown} 
                list={catFacts} 
                setCatFacts={setCatFacts} 
            />
        }
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

export default App;