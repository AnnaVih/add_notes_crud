import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react'
import { mount } from 'enzyme'
import Note from './Note'

const props = { note: { text: 'test note'}}

describe('Note', () => {
    let note = mount(<Note {...props}/>)
    it('renders the note text', () => {
        expect(note.find('p').text()).toEqual(props.note.text)
    })
})