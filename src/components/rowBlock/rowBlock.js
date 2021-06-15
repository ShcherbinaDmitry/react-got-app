import React from 'react';
import { Col } from 'reactstrap';


    const RowBlock = ({left, right}) => {
        return (
            <>
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {right}
            </Col>
            </>
        )
    }

export default RowBlock;