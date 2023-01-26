import React, { Component } from 'react';

export default class Skeleton extends Component {
	render() {
		return (
			<section role={'presentation'} className={'skeleton'}>
				<header className={'header skeleton-header'} role={'presentation'}>
					<nav className={'header-navigation skeleton-header-navigation'}>
						<ul
							className={`header-navigation__items skeleton-header-navigation__items`}
						>
							<li
								className={`header-navigation__items--item skeleton-header-navigation__item`}
							></li>
							<li
								className={`header-navigation__items--item skeleton-header-navigation__item`}
							></li>
							<li
								className={`header-navigation__items--item skeleton-header-navigation__item`}
							></li>
						</ul>
					</nav>

					<div className={`header-logo skeleton-header-logo`}></div>

					<div className={'header-actions skeleton-header-actions'}>
						<div className="header-actions__currency skeleton-header-actions__currency"></div>

						<div className="header-actios__cart skeleton-header-actions__cart"></div>
					</div>
				</header>

				<main className="products-display skeleton-products-display">
					<div>
						<div className={'category-title skeleton-category-title'}></div>
					</div>

					<ul className={'category-items skeleton-category-items '}>
						<li className={'category-item skeleton-category-item skeleton-run'}>
							<div
								className={
									'category-item__image-wrapper skeleton-category-item__image-wrapper'
								}
							>
								<div
									className={
										'category-item__image-wrapper__image skeleton-category-item__image-wrapper__image'
									}
								></div>

								<div
									color={'#ffffff'}
									className={`category-item__image-wrapper__cart  skeleton-category-item__image-wrapper__cart`}
								/>
							</div>

							<div className="category-item__meta-container skeleton-category-item__meta-container">
								<div
									role={'presentation'}
									className="skeleton-category-item__meta-container__header"
								></div>
								<p
									role={'presentation'}
									className="skeleton-category-item__meta-container__paragraph"
								></p>
							</div>
						</li>
						<li className={'category-item skeleton-category-item skeleton-run'}>
							<div
								className={
									'category-item__image-wrapper skeleton-category-item__image-wrapper'
								}
							>
								<div
									className={
										'category-item__image-wrapper__image skeleton-category-item__image-wrapper__image'
									}
								></div>

								<div
									color={'#ffffff'}
									className={`category-item__image-wrapper__cart  skeleton-category-item__image-wrapper__cart`}
								/>
							</div>

							<div className="category-item__meta-container skeleton-category-item__meta-container">
								<div
									role={'presentation'}
									className="skeleton-category-item__meta-container__header"
								></div>
								<p
									role={'presentation'}
									className="skeleton-category-item__meta-container__paragraph"
								></p>
							</div>
						</li>
						<li className={'category-item skeleton-category-item skeleton-run'}>
							<div
								className={
									'category-item__image-wrapper skeleton-category-item__image-wrapper'
								}
							>
								<div
									className={
										'category-item__image-wrapper__image skeleton-category-item__image-wrapper__image'
									}
								></div>

								<div
									color={'#ffffff'}
									className={`category-item__image-wrapper__cart  skeleton-category-item__image-wrapper__cart`}
								/>
							</div>

							<div className="category-item__meta-container skeleton-category-item__meta-container">
								<div
									role={'presentation'}
									className="skeleton-category-item__meta-container__header"
								></div>
								<p
									role={'presentation'}
									className="skeleton-category-item__meta-container__paragraph"
								></p>
							</div>
						</li>
						<li className={'category-item skeleton-category-item skeleton-run'}>
							<div
								className={
									'category-item__image-wrapper skeleton-category-item__image-wrapper'
								}
							>
								<div
									className={
										'category-item__image-wrapper__image skeleton-category-item__image-wrapper__image'
									}
								></div>

								<div
									color={'#ffffff'}
									className={`category-item__image-wrapper__cart  skeleton-category-item__image-wrapper__cart`}
								/>
							</div>

							<div className="category-item__meta-container skeleton-category-item__meta-container">
								<div
									role={'presentation'}
									className="skeleton-category-item__meta-container__header"
								></div>
								<p
									role={'presentation'}
									className="skeleton-category-item__meta-container__paragraph"
								></p>
							</div>
						</li>
						<li className={'category-item skeleton-category-item skeleton-run'}>
							<div
								className={
									'category-item__image-wrapper skeleton-category-item__image-wrapper'
								}
							>
								<div
									className={
										'category-item__image-wrapper__image skeleton-category-item__image-wrapper__image'
									}
								></div>

								<div
									color={'#ffffff'}
									className={`category-item__image-wrapper__cart  skeleton-category-item__image-wrapper__cart`}
								/>
							</div>

							<div className="category-item__meta-container skeleton-category-item__meta-container">
								<div
									role={'presentation'}
									className="skeleton-category-item__meta-container__header"
								></div>
								<p
									role={'presentation'}
									className="skeleton-category-item__meta-container__paragraph"
								></p>
							</div>
						</li>
						<li className={'category-item skeleton-category-item skeleton-run'}>
							<div
								className={
									'category-item__image-wrapper skeleton-category-item__image-wrapper'
								}
							>
								<div
									className={
										'category-item__image-wrapper__image skeleton-category-item__image-wrapper__image'
									}
								></div>

								<div
									color={'#ffffff'}
									className={`category-item__image-wrapper__cart  skeleton-category-item__image-wrapper__cart`}
								/>
							</div>

							<div className="category-item__meta-container skeleton-category-item__meta-container">
								<div
									role={'presentation'}
									className="skeleton-category-item__meta-container__header"
								></div>
								<p
									role={'presentation'}
									className="skeleton-category-item__meta-container__paragraph"
								></p>
							</div>
						</li>
					</ul>
				</main>
			</section>
		);
	}
}
