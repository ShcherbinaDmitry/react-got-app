import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services';
import RowBlock from '../rowBlock';


export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedChar: 130,
        error: false,
    }

        
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }


    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                    onItemSelected={this.onCharSelected}
                    getData={this.gotService.getAllCharacters}
                    renderItem={( {name, gender}) => `${name} (${gender})`}/>
        )

        const charDetails = (
            <CharDetails 
                charId={this.state.selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
            </CharDetails>
        )

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}