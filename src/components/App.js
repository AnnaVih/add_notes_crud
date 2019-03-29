import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import Note from './Note';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const cookie_key = 'NOTES';

class App extends Component {
    state = {
        text: '',
        notes: []
    }

    componentDidMount() {
        const notes = read_cookie(cookie_key)
        this.setState({ notes })
    }

    submit = () => {
        const {notes, text} = this.state;

        notes.push({ text });

        this.setState({ notes })

        this.setState({ text: '' })

        bake_cookie(cookie_key, this.state.notes)
    }

    clear = () => {
        delete_cookie(cookie_key);
        this.setState({notes: []})
    }

    render() {
        return(
            <div>
                <h1>Note to Self</h1>
                <Form>
                    <FormControl onChange={event => this.setState({text: event.target.value})}/>
                    <Button className="btn btn-1" onClick={() => this.submit()}>Submit</Button>
                </Form>
                {this.state.notes.map((note, index) => {
                    return <Note key={index} note={note}/>
                })}
                <hr/>
                <button className="btn btn-2" onClick={this.clear}>Clear notes</button>
            </div>
        )
    }
}

export default App;