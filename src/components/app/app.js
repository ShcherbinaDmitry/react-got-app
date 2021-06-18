import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {HousePage, BookPage, CharacterPage, BookItem, NoPageFound} from '../pages';
import ErrorMessage from '../errorMessage';
import gotService from '../../services';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';


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
            <Router>
                 <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {content}
                                <button
                                    className='toggle-btn'
                                    onClick= {this.toggleRandom}>
                                    Toggle random character
                                </button>
                            </Col>
                        </Row>
                        
                        <Route path='/' exact component={() => <h1>Welcome to GoT database</h1>}/>
                        <Route path='*' component={NoPageFound}/>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BookItem bookId={id}/>}
                            }/>
                        
                    </Container>
                </div>
            </Router>
        )
    }

}
