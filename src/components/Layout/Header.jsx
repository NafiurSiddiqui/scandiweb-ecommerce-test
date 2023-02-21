import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../assets/a-logo.png';
import Currency from '../Header/Currency';
import HeaderCart from '../Header/HeaderCart';
import { getProductID } from '../store/productsSlice';
import DisplayMessage from '../Utilities/DisplayMessage';
import { GET_CATEGORIES } from '../Utilities/query';
import Skeleton from './skeleton';

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
			<Query query={GET_CATEGORIES}>
				{({ error, loading, data }) => {
					if (error) return <DisplayMessage error={error} />;

					if (loading || !data) return <Skeleton />;

					const categories = data.categories.map((item) =>
						item.name.toUpperCase()
					);

					return (
						<header className={'header'}>
							<nav className={'header-navigation'}>
								<ul className={`header-navigation__items`}>
									{categories.map((name, i) => {
										return (
											<li
												className={`header-navigation__items--item`}
												key={name}
											>
												<NavLink to={`/${name}`} onClick={(e) => e.target} end>
													{name}
												</NavLink>
											</li>
										);
									})}
								</ul>
							</nav>

							<div className={`header-logo`}>
								<img
									src={logo}
									alt="Brand logo"
									className={'header-logo__logo'}
								/>
							</div>

							<section className={'header-actions'}>
								<div className="header-actions-wrapper">
									<Currency />

									<HeaderCart />
								</div>
							</section>
						</header>
					);
				}}
			</Query>
		);
	}
}

const mapDispatchToProps = { getProductID };

export default connect(null, mapDispatchToProps)(Header);
