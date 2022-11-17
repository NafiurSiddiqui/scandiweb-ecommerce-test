import React, { Component } from 'react';
import logo from '../assets/a-logo.png';
import classes from './Navbar.module.css';

class Navbar extends Component {
	render() {
		return (
			<header className={classes.header}>
				<nav className={classes.navigation}>
					<ul className={`navigation ${classes['header-navigation']}`}>
						<li
							className={`navigation header-navigation ${classes['navigation-item']}`}
						>
							Women
						</li>
						<li
							className={`navigation header-navigation ${classes['navigation-item']}`}
						>
							Men
						</li>
						<li
							className={`navigation header-navigation ${classes['navigation-item']}`}
						>
							Kids
						</li>
					</ul>
				</nav>

				<div className={`header-logo ${classes['logo-container']}`}>
					<img src={logo} alt="Brand logo" className={classes['header-logo']} />
				</div>

				<div className={classes['header-actions']}>
					<div className={`header action-dropdown ${classes.container} `}>
						<div
							className={`header action-dropdown ${classes['currency-symobol-container']} `}
						>
							<span className="header action-dropdown currency-symbol">$</span>

							<span
								className={`header action-dropdown ${classes['dropdown-symbol']}`}
							>
								&#8964;
							</span>
						</div>
						<ul className={`header ${classes['action-dropdown-container']} `}>
							<li
								className={`header action-dropdwon ${classes['dropdown-item']}`}
							>
								$ USD
							</li>
							<li
								className={`header action-dropdwon ${classes['dropdown-item']}`}
							>
								&euro;EURO
							</li>
							<li
								className={`header action-dropdwon ${classes['dropdown-item']}`}
							>
								&#165;JPY
							</li>
						</ul>
					</div>

					<span
						className={`header ${classes['actions-cartbtn']}`}
						role="button"
					>
						&#x1F6D2;
					</span>
				</div>
			</header>
		);
	}
}

export default Navbar;
