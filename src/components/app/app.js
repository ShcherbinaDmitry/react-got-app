import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../characterPage';
import ErrorMessage from '../errorMessage';
import CharDetails from '../charDetails';
import ItemList from '../itemList';
import gotService from '../../services';
import './app.css';
import styled from 'styled-components';


const Button = styled.button`
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRand: true,
        error: false,
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandom = () => {
        this.setState((state) => {
            return {
               showRand: !state.showRand
            }
        })
    }


    render() {
        const content = !this.state.showRand ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {content}
                        </Col>
                    </Row>
                    <Button 
                        className='btn btn-info'
                        onClick= {this.toggleRandom}>Toggle random character</Button>
                    <Row>
                        <CharacterPage/>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={(item) => (<><span>{item.name}</span><button>Click me!</button></>)}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails 
                            charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails 
                                charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

}
