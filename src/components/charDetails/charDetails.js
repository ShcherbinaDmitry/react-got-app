import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {
    Field
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

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    onCharDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.setState({
            loading: true
        })

        this.gotService.getCharacter(charId)
            .then( this.onCharDetailsLoaded )
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            char: null,
            error: true
        })
    }

    render() {

        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return <SelectError>Please select a character</SelectError>
        }
        const {char} = this.state
        const {name} = char;

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
                            return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            </CharDetailsDiv>
        );
    }
}