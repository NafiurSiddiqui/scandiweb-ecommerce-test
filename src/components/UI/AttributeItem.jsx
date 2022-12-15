import React, { Component } from 'react';

export default class AttributeItem extends Component {
	render() {
		const { propsKey, element, attributesItem, activeItem, onClick } =
			this.props;
		// console.log(attributesItem, propsKey);
		return (
			<ul key={propsKey} className="pd__attributions">
				<li key={element} className="pd__attribution">
					<span className="pd__attribution__ID">{element}</span>
					<ul className="pd__attribution__items">
						{attributesItem[propsKey].map((item) => {
							let itemMatched = item === activeItem;

							return (
								<li
									className={`pd__attribution__item ${
										itemMatched ? 'itemActive' : ''
									}`}
									role={'button'}
									key={item}
									data-clicked={false}
									onClick={(e) => onClick(e, item)}
								>
									{item}
								</li>
							);
						})}
					</ul>
				</li>
			</ul>
		);
	}
}
