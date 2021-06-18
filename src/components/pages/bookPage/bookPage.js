import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services';
import RowBlock from '../../rowBlock';


export default class BookPage extends Component {
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
            getData={this.gotService.getAllBooks}
            renderItem={(item) => (<span>{item.name}</span>)}/>
        )

        const charDetails = (
            <ItemDetails 
                itemId={this.state.selectedItem}
                getInfo={this.gotService.getBook}
                noItemSelectedMsg='Please, select some book'>
                <Field field='publisher' label='Publisher'/>
                <Field field='id' label='ID'/>
            </ItemDetails>
        )

        return(
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}