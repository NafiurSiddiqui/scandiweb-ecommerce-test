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
					<form action="#" className="header actions-currency">
						<select id="currency" name="currency">
							<option value="no-value">$</option>
							<option value="usd">$ USD</option>
							<option value="euro">EURO</option>
							<option value="jpy">JPY</option>
						</select>
						<input type="submit" />
					</form>

					<span className="header actions-cartbtn" role="button">
						&#x1F6D2;
					</span>
				</div>
			</header>
		);
	}
}

export default Navbar;
