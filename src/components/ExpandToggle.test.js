import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import ExpandToggle from './ExpandToggle'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ExpandToggle
      children={(state, props) => {
        expect(state.expanded).toBe(false)
        return <div />
      }}
    />,
    div
  )
})

it('toggles expanded state onClick', () => {
  const div = document.createElement('div')
  const childFn = jest.fn((state, props) => (
    <div className="menuItem">
      <button className="btn" type="button" onClick={props.toggle}>
        Test
      </button>
    </div>
  ))

  const testToggle = shallow(<ExpandToggle children={childFn} />)
  const testProps = expect.objectContaining({
    children: expect.any(Function),
    toggle: expect.any(Function)
  })
  expect(childFn).toHaveBeenCalledTimes(1)
  expect(childFn).toHaveBeenCalledWith(
    expect.objectContaining({ expanded: false }),
    testProps
  )
  testToggle.find('button').simulate('click')
  expect(childFn).toHaveBeenCalledTimes(2)
  expect(childFn).toHaveBeenCalledWith(
    expect.objectContaining({ expanded: true }),
    testProps
  )
})
