import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


import React from 'react'
import { mount } from 'enzyme'
import App from './App'

describe('App', () => {
    let app = mount(<App />)

    it('renders the App title', () => {
        expect(app.find('h1').text()).toEqual('Note to Self')
    })

    it('renders the clear button', () => {
        expect(app.find('.btn').at(1).text()).toEqual('Submit')
    })

    describe('when rendering the form', () => {
        it('creates a Form component', () => {
            expect(app.find('Form').exists()).toBe(true)
        })

        it('creates a FormControl component', () => {
            expect(app.find('FormControl').exists()).toBe(true)
        })

        it('creates a submit button component', () => {
            expect(app.find('.btn').at(0).text()).toEqual('Submit')
        })
    })

    describe('when creating a note', () => {
        let testNote = 'test note';
        beforeEach(() => {
            app.find('FormControl').simulate('change', {
                target: { value: testNote}
            })
        })

        it('updates the textin state', () => {
            expect(app.state().text).toEqual(testNote)
        })

        describe('and submitting the new note', () => {
            beforeEach(() => {
                app.find('.btn-1').at(0).simulate('click')
            })

            afterEach(() => {
                app.find('.btn-2').at(0).simulate('click');
            })
    
            it('adds the new note to state', () => {
                expect(app.state().notes[0].text).toEqual(testNote)
            })

            describe('and remounting the component', () => {
                let app2;
                beforeEach(() => {
                    app2 = mount(<App/>)
                })

                it('reads the stored note cookies', () => {
                    expect(app.state().notes).toEqual([{text: testNote}])
                })
            })

            describe('and clicking the clear button', () => {
                beforeEach(() => {
                    app.find('.btn-2').at(0).simulate('click');
                })

                it('clears the notes in the state', () => {
                    expect(app.state().notes).toEqual([])
                })
            })
        })
    })

})

