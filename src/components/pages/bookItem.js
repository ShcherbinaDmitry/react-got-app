import React, {Component} from 'react';
import gotService from '../../services';
import ItemDetails, {Field} from '../itemDetails';


export default class BookItem extends Component {
    gotService = new gotService();


    render() {

        return (
            <ItemDetails 
                itemId={this.props.bookId}
                getInfo={this.gotService.getBook}
                noItemSelectedMsg=''>
                <Field field='publisher' label='Publisher'/>
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='id' label='ID'/>
            </ItemDetails>
        )
    }
}