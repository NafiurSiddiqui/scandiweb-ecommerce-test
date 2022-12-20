import React, { Component } from 'react';
import Currency from '../Header/Currency';

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideClickGuard extends Component {
	constructor(props) {
		super(props);

		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	/**
	 * Set the wrapper ref
	 */
	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	/**
	 * Alert if clicked on outside of element
	 */
	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			alert('You clicked outside of me!');
		}
	}

	render() {
		return (
			<div ref={this.setWrapperRef} className={this.props.className}>
				{this.props.children}
			</div>
		);
	}
}
