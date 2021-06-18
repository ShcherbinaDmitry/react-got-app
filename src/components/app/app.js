import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage';
import ErrorMessage from '../errorMessage';
import gotService from '../../services';
import styled from 'styled-components';


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
                        <BookPage/>
                    </Row>
                    <Row>
                        <HousePage/>
                    </Row>
                </Container>
            </>
        )
    }

}

const Button = styled.button`
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`