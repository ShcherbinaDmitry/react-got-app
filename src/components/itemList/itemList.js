import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);
    const [error, hasError] = useState(false);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        getData()
            .then( (data) => {
                updateList(data);
                hasError(false);
                isLoading(false);
            })
            .catch((status) => {
                console.log(`Error: ${status}`)
                hasError(true);
                isLoading(false);
            })
    }, [])

    // componentDidCatch(){
    //     console.log('Component did catch an error')
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // } - no Hook equivalent as of now
 

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    if(error) {
        return <ErrorMessage/>
    }

    if(loading) {
        return <Spinner/>
    }

    const items = renderItems(itemList);

    return (
        <ListItems className='rounded list-group-item'>
            {items}
        </ListItems>
    );
}

const ListItems = styled.ul`
    background-color: #fff;
    list-group-item {
    cursor: pointer;
    }
    li {
        cursor: pointer
    }
`

export default ItemList;