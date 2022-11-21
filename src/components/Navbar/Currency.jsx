import React, { Component } from 'react';
import classes from './Currency.module.css';

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
				</div>
				<ul className={`${classes['action-dropdown-container']} `}>
					<li className={`header action-dropdown ${classes['dropdown-item']}`}>
						$ USD
					</li>
					<li className={`header action-dropdown ${classes['dropdown-item']}`}>
						&euro;EURO
					</li>
					<li className={`header action-dropdown ${classes['dropdown-item']}`}>
						&#165;JPY
					</li>
					<li className={`header action-dropdown ${classes['dropdown-item']}`}>
						$ AUD
					</li>
					<li className={`header action-dropdown ${classes['dropdown-item']}`}>
						&#8381; RUB
					</li>
				</ul>
			</>
		);
	}
}
