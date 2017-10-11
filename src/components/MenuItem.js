import React, { Component } from 'react'
import './MenuItem.css'

export default class MenuItem extends Component {
    state = {
        expanded: false
    }
    toggle = () => {
        this.setState({expanded: !this.state.expanded})
    }
    render() {
        const ownProps = Object.assign({}, this.props, {toggle: this.toggle})
        return this.props.children(this.state, ownProps)
    }
}