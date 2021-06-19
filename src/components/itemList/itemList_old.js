import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })
    }, [])


    // componentDidCatch() {
    //     console.log('Component did catch an error')
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // }

    // onError(status) {
    //     console.log('Error ' + status)
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // }

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

    // if(error) {
    //     return <ErrorMessage/>
    // }

    const items = itemList ? renderItems(itemList) : <Spinner/>;

    return (
        <ListItems className='rounded list-group-item'>
            {items}
        </ListItems>
    );
    
}

export default ItemList;


const ListItems = styled.ul`
    background-color: #fff;
    list-group-item {
    cursor: pointer;
    }
    li {
        cursor: pointer
    }
`
