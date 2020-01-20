import React, {
    useState, ChangeEvent
} from 'react';
import { IListItem } from './types'

type Props = {
    onClose: () => void,
    onKeyDown: (event: KeyboardEvent) => void,
    list: Array<IListItem>,
    setCatFacts: (unfilteredCatFacts : Array<IListItem>) => void,
    unfilteredCatFacts: Array<IListItem>
}

// Requirements:
// - mount/unmount when the user taps "s".
// - unmount when the user presses the "Close" button
// props: {onClose: Function}
const SearchForm = ({ onClose, onKeyDown, list, setCatFacts, unfilteredCatFacts } : Props) => {
    const [searchEntry, setSearchEntry] = useState('')

    const inputEvtHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchEntry(event.target.value)
    }

    //change this to remove event handler when input is in focus, and add it back when it goes out of focus
    const inputClickHandler = () => {
        window.removeEventListener("keydown", onKeyDown)
    }

    const onClear = () => {
        setSearchEntry('')
        setCatFacts(unfilteredCatFacts)
    }

    const search = () => {
        const filteredList = list.filter((catFact : IListItem) => {
            const matcher = catFact.text.search(searchEntry)
            if (matcher !== -1) {
                return true
            } else {
                return false
            }
        })
        setCatFacts(filteredList)
    }

    return (
        <div style={{border: "2px dashed red"}}>
            <h2>Search Form</h2>
            <input type="text" value={searchEntry} onChange={(event) => (inputEvtHandler(event))} onClick={() => (inputClickHandler())} />
            <button onClick={() => (search())}>Search</button>
            <button onClick={() => (onClear())}>Clear</button>
            <button onClick={() => (onClose())}>Close</button>
        </div>
    )
}

export default SearchForm