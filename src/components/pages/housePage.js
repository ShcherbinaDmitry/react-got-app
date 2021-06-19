import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services';
import RowBlock from '../rowBlock';


export default class HousePage extends Component {
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
            getData={this.gotService.getAllHouses}
            renderItem={(item) => item.name}/>
        )

        const bookDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getInfo={this.gotService.getHouse}
                noItemSelectedMsg='Please, select some House'
                children={this.children}>
                <Field field='region' label='Region'/>
                <Field field='id' label='ID'/>
            </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}