import React, { Component } from 'react';

export default class Skeleton extends Component {
	render() {
		return (
			<section role={'presentation'}>
				<header className={'header'} role={'presentation'}>
					<nav className={'header-navigation'}>
						<ul className={`header-navigation__items`}>
							<li className={`header-navigation__items--item`}></li>
							<li className={`header-navigation__items--item`}></li>
							<li className={`header-navigation__items--item`}></li>
						</ul>
					</nav>

					<div className={`header-logo`}></div>

					<div className={'header-actions'}>
						<div className="header-actions__currency"></div>

						<div className="header-actios__cart"></div>
					</div>
				</header>

				<main>
					<div>
						<h1 className={'category-title'}>All</h1>
					</div>

					<ul className={'category-items'}>
						<li className={'category-item'}>
							<div className={'category-item__image-wrapper'}>
								<div className={'category-item__image-wrapper__image'}></div>

								<div
									color={'#ffffff'}
									className={`category-item__image-wrapper__cart`}
								/>
							</div>

							<div className="category-item__meta-container">
								<div role={'presentation'}></div>
								<p role={'presentation'}></p>
							</div>
						</li>
					</ul>
				</main>
			</section>
		);
	}
}
