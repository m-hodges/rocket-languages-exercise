import CatFact from './CatFact'

const React = require('react')

// Requirements:
// - display an unordered list, displaying: "[x upvotes] {text}" per line
// - A button on each line that can "hide" the line
// props: { list: [{ _id: string, text: string, upvotes: number }] }
const AllCatFacts = ({ list }) => {
  // Expected output [ { _id: "", upvotes: 1, text: "" }, { _id: "", upvotes: 2, text: "" }, { _id: "", upvotes 3, text: "" } ]
  const sortedList = [...list].sort((a, b) => (a.upvotes - b.upvotes))

    return (
      <ul>
        {
          sortedList.map((catFact, i) => (
            <CatFact 
              key={i}
              upvotes={catFact.upvotes}
              text={catFact.text}
            />
          ))
        }
      </ul>
    )
}


export default AllCatFacts