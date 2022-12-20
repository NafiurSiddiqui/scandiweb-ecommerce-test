import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../assets/a-logo.png';
import Currency from '../Header/Currency';
import HeaderCart from '../Header/HeaderCart';
import { getProductID } from '../store/categorySlice';
import OutsideClickGuard from '../Utilities/OutsideClickGuard';

class Header extends Component {
	constructor() {
		super();

		this.resetProductID = this.resetProductID.bind(this);
	}
	resetProductID() {
		this.props.getProductID('');
	}
	render() {
		return (
			<header className={'header'}>
				<nav className={'header-navigation'}>
					<ul className={`header-navigation__items`}>
						<li className={`header-navigation__items--item`}>
							<NavLink
								to={'/'}
								className={(navData) => (navData.isActive ? 'active' : '')}
								onClick={this.resetProductID}
							>
								All
							</NavLink>
						</li>
						<li className={`header-navigation__items--item`}>
							<NavLink to={'/clothes'} onClick={this.resetProductID}>
								Clothes
							</NavLink>
						</li>
						<li className={`header-navigation__items--item`}>
							<NavLink to={'/tech'} onClick={this.resetProductID}>
								Tech
							</NavLink>
						</li>
					</ul>
				</nav>

				<div className={`header-logo`}>
					<img src={logo} alt="Brand logo" className={'header-logo__logo'} />
				</div>

				<div className={'header-actions'}>
					<Currency />
					{/* <OutsideClickGuard /> */}

					<HeaderCart />
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productIDState: state.category,
	};
};

const mapDispatchToProps = { getProductID };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
