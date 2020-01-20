import React, {
    useState, ChangeEvent, useEffect
} from 'react';
import { IListItem } from './types'

type Props = {
    onClose: () => void,
    setCatFacts: (unfilteredCatFacts : Array<IListItem>) => void,
    unfilteredCatFacts: Array<IListItem>,
    onFocus: () => void
}

// Requirements:
// - mount/unmount when the user taps "s".
// - unmount when the user presses the "Close" button
// props: {onClose: Function}
const SearchForm = ({ onClose, setCatFacts, unfilteredCatFacts, onFocus } : Props) => {
    const [searchEntry, setSearchEntry] = useState('')

    useEffect(() => {
        const search = () => {
            const filteredList = unfilteredCatFacts.filter((catFact : IListItem) => {
                const matcher = catFact.text.search(searchEntry)
                if (matcher !== -1) {
                    return true
                } else {
                    return false
                }
            })
            setCatFacts(filteredList)
        }
        search()
    }, [searchEntry, unfilteredCatFacts, setCatFacts])

    const inputEvtHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchEntry(event.target.value)
    }

    const onClear = () => {
        setSearchEntry('')
        setCatFacts(unfilteredCatFacts)
    }

    return (
        <div style={{border: "2px dashed red"}}>
            <h2>Search Form</h2>
            <input type="text" value={searchEntry} onChange={(event) => (inputEvtHandler(event))} onFocus={() => (onFocus())} />
            <button onClick={() => (onClear())}>Clear</button>
            <button onClick={() => (onClose())}>Close</button>
        </div>
    )
}

export default SearchForm