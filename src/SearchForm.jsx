const React = require("react");

// Requirements:
// - mount/unmount when the user taps "s".
// - unmount when the user presses the "Close" button
// props: {onClose: Function}
const SearchForm = () => {
    return (
    <div style={{border: "2px dashed red"}}>
        <h2>Search Form</h2>
        <button onClick={() => (this.props.onClose())}>Close</button>
    </div>
    )
}

export default SearchForm