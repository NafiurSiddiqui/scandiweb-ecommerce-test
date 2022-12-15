import React, { Component } from 'react';

export default class AttributeItem extends Component {
	render() {
		const {
			propsKey,
			element,
			attributesItem,
			activeItem,
			activeItems,
			onClick,
		} = this.props;

		// console.log();

		return (
			<ul key={propsKey} className="pd__attributions">
				<li key={element} className="pd__attribution">
					<span className="pd__attribution__ID">{element}</span>
					<ul className="pd__attribution__items">
						{attributesItem[propsKey].map((item) => {
							let itemMatched = item === activeItem;
							// console.log();
							// let newMatch = activeItems.includes(item) === activeItem;

							return (
								<li
									className={`pd__attribution__item ${
										itemMatched ? 'itemActive' : ''
									}`}
									role={'button'}
									key={item}
									data-clicked={false}
									onClick={(e) => onClick(e, item)}
									style={{}}
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
