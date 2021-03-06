import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Note from './Note'


describe ("Note Component", () => {

  const props = {
    name: "test",
    id: "342",
    modified: new Date(2018, 12, 15),
  }

  it ('renders empty with no tabs', () => {

    const wrapper = shallow(<Note/>)
    expect(toJson (wrapper)).toMatchSnapshot()
  },


  it ('renders its given props', () => {

    const wrapper = shallow(<Note {...props}/>)
    expect(toJson (wrapper)).toMatchSnapshot()
  })
  
  
  
  
  )} 


)

