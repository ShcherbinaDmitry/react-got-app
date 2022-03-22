import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import gotService from '../../services';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
// import { ninvoke } from 'q';


 function RandomChar() {
    
    const [item, updateItem] = useState({});
    const [loading, isLoading] = useState(true);
    const [error, hasError] = useState(false);

    const got = new gotService();


    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, 1500)
        return () => {
            clearInterval(timerId);
        }
    }, [])


    function onCharLoaded (item) {
        updateItem(item);
        isLoading(false);
        hasError(false);
    }


    function updateChar() {
        const id = Math.floor(Math.random()*140 + 11);
        got.getCharacter(id)
            .then(onCharLoaded)
            .catch((status) => {
                console.log(`Error: ${status}`);
                hasError(true);
            })
    }

    

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View char={item}/> : null;

    return (
        <RandomBlock className="rounded">
            {errorMessage}
            {spinner}
            {content}
        </RandomBlock>
    );

}

const View = (item) => {
    const {name, gender, born, died, culture, titles, aliases, id} = item.char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Born </Term>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Titles </Term>
                    <span>{titles}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Aliases</Term>
                    <span>{aliases}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>ID</Term>
                    <span>{id}</span>
                </li>
            </ul>
        </>
    )
}

const RandomBlock = styled.div`
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        color: #fff,
        margin-bottom: 20px;
        text-align: center;
    }
    .loadingio-spinner-spin-iisr1mbgvzo {
        margin: 0 auto; 
    }
`
const Term = styled.span`
    font-weight: bold;
    margin-right: 10px;
    color: #fff,
`
export default RandomChar;