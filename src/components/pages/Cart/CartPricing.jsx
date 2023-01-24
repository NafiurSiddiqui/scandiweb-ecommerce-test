import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMiniCartIsOpen } from '../../store/cartSlice';
import Button from '../../UI/Button';

class CartPricing extends Component {
	constructor(props) {
		super(props);
		this.locaton = window.location.pathname;
		this.state = {
			cartPageIsActive: false,
		};

		this.cartActiveHandler = this.cartActiveHandler.bind(this);
	}

	componentDidMount() {
		this.cartActiveHandler();
	}

	cartActiveHandler() {
		const { miniCartIsOpen } = this.props;

		if (this.locaton === '/Cart') {
			this.setState({
				cartPageIsActive: true,
			});
		}
	}

	render() {
		const {
			miniCartIsOpen,
			className,
			cartTotal,
			currencySymbol,
			setMiniCartIsOpen,
		} = this.props;

		const { cartPageIsActive } = this.state;

		return (
			<section className={className}>
				<span
					className={`cartPage-tax-info`}
					role={miniCartIsOpen ? 'contentinfo' : ''}
				></span>

				<span
					className={`cartPage-quantity-info`}
					role={miniCartIsOpen ? 'contentinfo' : ''}
				></span>

				<div className={`${className} price-info`} role="contentinfo">
					<span className={`${className} price-info__total`}>Total</span>
					<span className={`${className} price-info__amount`}>
						{currencySymbol ? currencySymbol : '$'}
						{cartTotal}
					</span>
				</div>

				<div className="cart-btns">
					{miniCartIsOpen && !cartPageIsActive ? (
						<Link
							to="Cart"
							className="cart-btns__btn view-bag"
							onClick={() => setMiniCartIsOpen(false)}
						>
							VIEW BAG
						</Link>
					) : null}
					<Button className={`cart-btns__btn ${className} `}>
						{miniCartIsOpen && !cartPageIsActive ? 'CHECKOUT' : 'ORDER'}
					</Button>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => ({
	cartTotal: state.cart.cartTotal,
	currencySymbol: state.currency.selectedCurrency?.symbol,
	miniCartIsOpen: state.cart.miniCartIsOpen,
});

export default connect(mapStateToProps, { setMiniCartIsOpen })(CartPricing);
