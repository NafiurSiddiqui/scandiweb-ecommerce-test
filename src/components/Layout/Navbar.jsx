import React, { Component } from 'react';
import logo from '../assets/a-logo.png';
import Currency from '../Navbar/Currency';
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
							All
						</li>
						<li
							className={`navigation header-navigation ${classes['navigation-item']}`}
						>
							Clothes
						</li>
						<li
							className={`navigation header-navigation ${classes['navigation-item']}`}
						>
							Tech
						</li>
					</ul>
				</nav>

				<div className={`header-logo ${classes['logo-container']}`}>
					<img src={logo} alt="Brand logo" className={classes['header-logo']} />
				</div>

				<div className={classes['header-actions']}>
					<Currency />

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
