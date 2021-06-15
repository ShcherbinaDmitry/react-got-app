import React, {Component} from 'react';
import styled from 'styled-components';
import gotService from '../../services';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
// import { ninvoke } from 'q';

const RandomBlock = styled.div`
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
`
const Term = styled.span`
    font-weight: bold;
    margin-right: 10px;
`

export default class RandomChar extends Component {


    gotService = new gotService();

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }
  

    state = {
        char: {},
        loading: true,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    updateChar =() => {
        const id = Math.floor(Math.random()*140 + 11);
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }




    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <RandomBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture, titles, aliases, id} = char;
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