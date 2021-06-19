import React, {Component} from 'react';
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

export default class ItemDetails extends Component {


    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateItem();
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateItem() {
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            loading: true
        })

        this.props.getInfo(itemId)
            .then( this.onItemDetailsLoaded )
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }

    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <SelectError>{this.props.noItemSelectedMsg}</SelectError>
        }
        const {item} = this.state
        const {name} = item;

        if (this.state.loading) {
            return (
                <CharDetailsDiv className="char-details rounded">
                    <Spinner/>
                </CharDetailsDiv>
            )
        }

        return (
            <CharDetailsDiv className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {   
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </CharDetailsDiv>
        );
    }
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