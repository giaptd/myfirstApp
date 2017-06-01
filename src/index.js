import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {ListGroup, ListGroupItem, FormGroup, FormControl, Button,
    Grid, Row, Col, Clearfix,InputGroup,} from 'react-bootstrap';

const grid = (
    <InputGroup style={{margin:'5px'}}>
        <FormControl type="text"/>
        <InputGroup.Button>
            <Button>Add</Button>
        </InputGroup.Button>
    </InputGroup>
);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
