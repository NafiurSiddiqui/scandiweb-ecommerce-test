import React, { Component } from 'react';
import AttributionBtn from './AttributionBtn';

export default class AttributeItem extends Component {
	render() {
		const { propsKey, element, attributesItem } = this.props;

		return (
			<ul key={propsKey} className="pd__attributions">
				<li key={element} className="pd__attribution">
					<span className="pd__attribution__ID">{element}:</span>
					<ul className="pd__attribution__items">
						{attributesItem[propsKey].map((item) => {
							return (
								<AttributionBtn
									key={item}
									item={item}
									attributeTitle={element}
								/>
							);
						})}
					</ul>
				</li>
			</ul>
		);
	}
}
