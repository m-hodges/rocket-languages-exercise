import React, {
    useState,
    useEffect
} from 'react';

// Requirements:
// - mount/unmount when the user taps "s".
// - unmount when the user presses the "Close" button
// props: {onClose: Function}
const SearchForm = ({ onClose, onKeyDown, list }) => {
    const [searchEntry, setSearchEntry] = useState('')

    const inputEvtHandler = (event) => {
        setSearchEntry(event.target.value)
        console.log(searchEntry)
    }

    //change this to remove event handler when input is in focus, and add it back when it goes out of focus
    const inputClickHandler = () => {
        window.removeEventListener("keydown", onKeyDown)
    }

    const search = () => {
        const filteredList = list.filter((catFact) => {
            const matcher = catFact.text.search(searchEntry)
            if (matcher !== -1) {
                return true
            } else {
                return false
            }
        })
        console.log(filteredList)
    }

    return (
        <div style={{border: "2px dashed red"}}>
            <h2>Search Form</h2>
            <input type="text" value={searchEntry} onChange={(event) => (inputEvtHandler(event))} onClick={() => (inputClickHandler())} />
            <button onClick={() => (search())}>Search</button>
            <button onClick={() => (onClose())}>Close</button>
        </div>
    )
}

export default SearchForm