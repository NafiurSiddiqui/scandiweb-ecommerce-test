import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributionBtn from './AttributionBtn';

class AttributeItem extends Component {
	render() {
		const {
			itemIndex,
			attHeader,
			cartPage,
			className,
			updateItems,
			miniCart,
			attributesItem,
		} = this.props;

		return (
			<ul key={itemIndex} className={`${className}__attributions`}>
				<li key={attHeader} className={`${className}__attribution`}>
					<h4
						className={`${className}__attribution-header`}
						style={{ fontSize: cartPage ? '0.853rem' : '0.7rem' }}
					>
						{attHeader.toUpperCase()}:
					</h4>
					<ul className={`pd__attribution__items`}>
						{attributesItem?.map((item, btnIndex) => {
							return (
								<AttributionBtn
									key={btnIndex}
									item={item.value}
									attHeader={attHeader}
									className={className}
									btnIndex={btnIndex}
									itemIndex={itemIndex}
									updateItems={updateItems}
									itemIsChecked={item.isChecked}
									miniCart={miniCart}
									cartPage={cartPage}
								/>
							);
						})}
					</ul>
				</li>
			</ul>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		productID: state.products.productID,
		selectedProduct: state.products.selectedProduct,
	};
};

export default connect(mapStateToProps)(AttributeItem);
