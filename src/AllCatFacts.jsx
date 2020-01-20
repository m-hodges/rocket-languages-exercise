const React = require('react')

// Requirements:
// - display an unordered list, displaying: "[x upvotes] {text}" per line
// - A button on each line that can "hide" the line
// props: { list: [{ _id: string, text: string, upvotes: number }] }
const AllCatFacts = (props) => {
      // Expected output [ { _id: "", upvotes: 1, text: "" }, { _id: "", upvotes: 2, text: "" }, { _id: "", upvotes 3, text: "" } ]
    
      React.useEffect(() => {
        console.log('from use effect')
        console.log(props.list)
      }, [props.list])
    
      const hide = (index) => {
        props.list.splice(index, 1)
      }
    
        return (
          <ul>
            {
              props.list.map((catFact, i) => (
                <li key={i}>
                  <span>[{catFact.upvotes} upvotes]: {catFact.text}</span>
                  <button onClick={() => hide(i)}>x</button>
                </li>
              ))
            }
          </ul>
        )
    }


export default AllCatFacts