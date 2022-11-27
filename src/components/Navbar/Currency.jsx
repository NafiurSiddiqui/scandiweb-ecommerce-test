import React, { Component } from 'react';

export default class Currency extends Component {
	constructor() {
		super();
		this.state = {
			isSelected: 'USD',
		};
	}
	render() {
		return (
			<>
				<div className={`header-currency`}>
					<div className={`header-currency__symbols`}>
						<span className="header-currency__symbols__currency-symbol">$</span>

						<span className={`header-currency__symbols__dropdown-symbol`}>
							&#8964;
						</span>
					</div>
				</div>
				<ul className={`header-currency__currency-items `}>
					<li className={`header-currency__currency-items__item `}>$ USD</li>
					<li className={`header-currency__currency-items__item `}>
						&euro;EURO
					</li>
					<li className={`header-currency__currency-items__item `}>
						&#165;JPY
					</li>
					<li className={`header-currency__currency-items__item `}>$ AUD</li>
					<li className={`header-currency__currency-items__item `}>
						&#8381; RUB
					</li>
				</ul>
			</>
		);
	}
}
