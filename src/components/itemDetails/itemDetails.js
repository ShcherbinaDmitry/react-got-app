import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

function ItemDetails({itemId, getInfo, noItemSelectedMsg, children}) {

    const [item, updateData] = useState([]);
    const [loading, isLoading] = useState(true);
    const [error, hasError] = useState(false);

    useEffect(() => {
        updateItem();
    }, [itemId])

    function onItemDetailsLoaded(data) {
        isLoading(false);
        updateData(data);
    }

    function updateItem() {
        if (!itemId) {
            return;
        }

        isLoading(true)

        getInfo(itemId)
            .then(onItemDetailsLoaded)
            .catch((status) => {
                console.log(`Error: ${status}`);
                hasError(true);
            })
    }


    if (!item && error) {
        return <ErrorMessage/>
    } else if (item.length === 0) {
        return <SelectError>{noItemSelectedMsg}</SelectError>
    }


    if (loading) {
        return (
            <CharDetailsDiv className="char-details rounded">
                <Spinner/>
            </CharDetailsDiv>
        )
    }

    return (
        <CharDetailsDiv className="rounded">
            <h4>{item.name}</h4>
            <ul className="list-group list-group-flush">
                {   
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </CharDetailsDiv>
    );

}

const CharDetailsDiv = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
    .loadingio-spinner-spin-iisr1mbgvzo {
        margin: 0 auto; 
    }
`;

const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

export default ItemDetails;