import React, {
    useState
} from 'react';

type Props = {
    key: number,
    upvotes: number,
    text: string
}

const CatFact = ({ upvotes, text } : Props) => {
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