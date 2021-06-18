import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services';
import RowBlock from '../rowBlock';


export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedItem: null,
        error: false,
    }

        
    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
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
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllCharacters}
                    renderItem={( {name, gender}) => `${name} (${gender})`}/>
        )

        const charDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getInfo={this.gotService.getCharacter}
                noItemSelectedMsg='Please, select some character'>
                <Field field='gender' label='Name'/>
                <Field field='id' label='ID'/>
            </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}