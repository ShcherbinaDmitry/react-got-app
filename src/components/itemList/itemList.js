import React, {Component} from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


export default class ItemList extends Component {
    state = {
        itemList: null,
        error: false
    }
    
    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch(){
        console.log('Component did catch an error')
        this.setState({
            itemList: null,
            error: true
        })
    }
    onError(status){
        console.log('Error ' + status)
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }


    render() {
        const {itemList, error} = this.state;

        if(error) {
            return <ErrorMessage/>
        }

        const items = itemList ? this.renderItems(itemList) : <Spinner/>;

        return (
            <ListItems>
                {items}
            </ListItems>
        );
    }
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
