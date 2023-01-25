import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMiniCartIsOpen } from '../store/cartSlice';
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
		const {
			currencyIsOpen,
			miniCartIsOpen,
			setCurrencyIsOpen,
			setMiniCartIsOpen,
		} = this.props;

		//  setCurrency to false if clicked on outside of currency
		if (currencyIsOpen) {
			if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
				setCurrencyIsOpen(false);
			}
		}

		if (miniCartIsOpen) {
			if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
				if (event.target.nodeName === 'svg') {
					return;
				} else if (!event.target.closest('.mini-cart-container')) {
					setMiniCartIsOpen(false);
				}
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

const mapDispatchToProps = { setCurrencyIsOpen, setMiniCartIsOpen };

export default connect(mapStateToProps, mapDispatchToProps)(OutsideClickGuard);
