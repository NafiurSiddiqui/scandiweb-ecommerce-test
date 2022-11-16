import React, { Component } from 'react';
import logo from '../assets/a-logo.png';

class Navbar extends Component {
	render() {
		return (
			<header className="header">
				<nav className="navigation">
					<ul className="navigation header-navigation">
						<li className="navigation header-navigation navigation-item">
							Women
						</li>
						<li className="navigation header-navigation navigation-item">
							Men
						</li>
						<li className="navigation header-navigation navigation-item">
							Kids
						</li>
					</ul>
				</nav>
				<img src={logo} alt="Brand logo" className="header-logo" />

				<div className="header actions">
					<div className="header action-dropdown container">
						<span className="header action-dropdown currency-symbol">$</span>
						<ul className="header action-dropdown ">
							<li className="header action-dropdwon item">$ USD</li>
							<li className="header action-dropdwon item">&euro;EURO</li>
							<li className="header action-dropdwon item">&#165;JPY</li>
						</ul>
						<span className="header action-dropdown dropdown-symbol">
							&#8964;
						</span>
					</div>

					<span className="header actions-cartbtn" role="button">
						&#x1F6D2;
					</span>
				</div>
			</header>
		);
	}
}

export default Navbar;
