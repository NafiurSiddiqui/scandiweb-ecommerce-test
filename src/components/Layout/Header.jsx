import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../assets/a-logo.png';
import Currency from '../Header/Currency';
import HeaderCart from '../Header/HeaderCart';
import { getPage } from '../store/pathSlice';
import { getProductID } from '../store/productsSlice';
import DisplayMessage from '../Utilities/DisplayMessage';
import { GET_CATEGORIES } from '../Utilities/query';
import Skeleton from './skeleton';

class Header extends Component {
	constructor() {
		super();

		this.setNavActiveRules = this.setNavActiveRules.bind(this);
	}

	setNavActiveRules(isActive, index, name) {
		const navRules =
			isActive && window.location.pathname === '/' && index === 0
				? 'active'
				: isActive && index !== 0 && window.location.pathname === `/${name}`
				? 'active'
				: null;

		return navRules;
	}

	render() {
		const { getPage } = this.props;

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
									{categories.map((name, index) => {
										return (
											<li
												className={`header-navigation__items--item`}
												key={name}
											>
												<NavLink
													to={`/${name}`}
													onClick={(e) => getPage(e.target.pathname)}
													className={(isActive) =>
														this.setNavActiveRules(isActive, index, name)
													}
													end
												>
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

const mapDispatchToProps = { getProductID, getPage };

export default connect(null, mapDispatchToProps)(Header);
