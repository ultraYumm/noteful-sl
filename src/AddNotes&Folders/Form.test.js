import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddFolderForm from './AddFolderForm'
import AddNoteForm from './AddFolderForm'

describe(`NotefulForm component`, () => {
  const props = {
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a form.AddFolderForm by default', () => {
    const wrapper = shallow(<AddFolderForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the AddNoteForm given context', () => {
    const wrapper = shallow(<AddNoteForm {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a form.AddNoteForm by default', () => {
    const wrapper = shallow(<AddNoteForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the AddNoteForm given context', () => {
    const wrapper = shallow(<AddFolderForm {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
