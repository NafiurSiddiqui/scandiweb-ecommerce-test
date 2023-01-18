import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrencyIsOpen } from '../store/currencySlice';

class OutsideClickGuard extends Component {
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

	// Set the wrapper ref

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		const { currencyIsOpen, miniCartIsOpen } = this.props;

		console.log(miniCartIsOpen);

		//  setCurrency to false if clicked on outside of currency
		if (currencyIsOpen) {
			if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
				this.props.setCurrencyIsOpen(false);
			}
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

const mapStateToProps = (state) => {
	return {
		currencyIsOpen: state.currency.currencyIsOpen,
		miniCartIsOpen: state.cart.miniCartIsOpen,
	};
};

const mapDispatchToProps = { setCurrencyIsOpen };

export default connect(mapStateToProps, mapDispatchToProps)(OutsideClickGuard);
