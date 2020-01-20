import AllCatFacts from './AllCatFacts'
import SearchForm from './SearchForm'
import Header from './Header'

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
  //placeholder state to reset catFacts to normal after search is closed
  var [unfilteredCatFacts, setUnfilteredCatFacts] = React.useState(null)
  var [inputIsFocused, setInputIsFocused] = React.useState(false)

  React.useEffect(function onMount() {
    // When component mounts, listen for keydown events
    if(!inputIsFocused) {
      window.addEventListener("keydown", onKeyDown)
    }
    // Unmount the event listener when the component unmounts
    return function cleanup () {
      window.removeEventListener("keydown", onKeyDown)
    }
  });

  function closeSearchForm() {
    setInputIsFocused(false)
    setSearchFormIsOpen(false)
    setCatFacts(unfilteredCatFacts)
  }

  function onKeyDown (event: KeyboardEvent) {
    // Toggle search form visibility when the user taps "s" anywhere on the window
    if (event.keyCode === 83) {
      setSearchFormIsOpen(!searchFormIsOpen)
      }
  }

  //removes window event handler when user clicks on input box so they can type 's'
  //window event handler is added back again when user clicks the close button
  function onFocus () {
    setInputIsFocused(true)
    window.removeEventListener("keydown", onKeyDown)
  }

  if (loading) {
    // Fetches all cat facts
    // Expected response: { all: [{ _id: string, text: string, upvotes: number }] }
    fetch(API_URL)
      .then(response => response.json())
      .then(function(response) {
        setCatFacts(response.all);
        setUnfilteredCatFacts(response.all)
      })     
      .then(function() {
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <>
        <Header />
        <div>Tap 's' to toggle the search form!</div>
        <span>Loading...</span>
        <footer>Copyright</footer>
      </>
    );
  } else if (searchFormIsOpen) {
    return (
      <>     
        <Header />
        <span>Tap 's' to toggle the search form!</span>
        {searchFormIsOpen && 
            <SearchForm 
                onClose={closeSearchForm} 
                setCatFacts={setCatFacts}
                unfilteredCatFacts={unfilteredCatFacts}
                onFocus={onFocus}
            />
        }
        <AllCatFacts list={catFacts} />
        <footer>Copyright</footer>
      </>
    )
  } else {
    return (
      <>
        <Header />
        <span>Tap 's' to toggle the search form!</span>
        <AllCatFacts list={catFacts} />
        <footer>Copyright</footer>
      </>
    );
  }
}

export default App;