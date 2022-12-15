import React, { Component } from 'react';
import AttributionBtn from './AttributionBtn';

export default class AttributeItem extends Component {
	constructor() {
		super();

		// this.setDynamicClass = this.setDynamicClass.bind(this);
	}

	// setDynamicClass(activeItems, activeItem){
	// 	const guardClass = activeItems.forEach((item, i)=> item[i] === activeItem);
	// 	console.log(guardClass);
	// }

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
							// let itemMatched = item === activeItem;
							let itemMatched = item === activeItem;

							// let newMatch = activeItems.includes(item) === activeItem;
							// for (let i = 0; i < activeItems.length; i++) {
							// 	console.log(activeItems[i] === activeItem);
							// }

							// console.log(activeItems.forEach((item) => item === activeItem));

							return (
								// <li
								// 	className={`pd__attribution__item ${
								// 		itemMatched ? 'itemActive' : ''
								// 	}`}
								// 	// className={`pd__attribution__item`}
								// 	role={'button'}
								// 	key={item}
								// 	data-clicked={false}
								// 	onClick={(e) => onClick(e, item, activeItems)}
								// 	style={{}}
								// >
								// 	{item}
								// </li>
								<AttributionBtn key={item} item={item} />
							);
						})}
					</ul>
				</li>
			</ul>
		);
	}
}
