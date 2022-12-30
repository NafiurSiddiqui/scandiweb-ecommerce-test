import React, { Component } from 'react';
import AttributionBtn from './AttributionBtn';

export default class AttributeItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedItems: {
				header: '',
				values: [],
			},
		};
	}
	render() {
		const { propsKey, element, attributesItem, className, getSelectedValues } =
			this.props;

		return (
			<ul key={propsKey} className={`${className}__attributions`}>
				<li key={element} className={`${className}__attribution`}>
					<h4 className={`${className}__attribution-header`}>
						{element.toUpperCase()}:
					</h4>
					<ul className={`pd__attribution__items`}>
						{attributesItem[propsKey].map((item, i) => {
							return (
								<AttributionBtn
									key={item}
									item={item}
									attributeTitle={element}
									className={className}
									index={i}
									getSelectedValues={getSelectedValues}
									defaultValue={attributesItem}
								/>
							);
						})}
					</ul>
				</li>
			</ul>
		);
	}
}
