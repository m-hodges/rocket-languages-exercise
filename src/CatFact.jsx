import React, {
    useState
} from 'react';

const CatFact = ({ upvotes, text }) => {
    const [isVisible, setIsVisible] = useState(true)

    const hide = () => {
        setIsVisible(!isVisible)
    }

    return (
        <li>
            {isVisible && 
                <span>[{upvotes} upvotes]: {text}</span>
            }
            <button onClick={() => hide()}>
                {
                    (isVisible) ? '-' : '+'
                }
            </button>
        </li>
    );
};

export default CatFact;