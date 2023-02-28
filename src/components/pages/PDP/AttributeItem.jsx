import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributesBtn from './AttributesBtn';

class AttributeItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			attributesItem: [],
			attHeader: '',
		};
	}

	componentDidMount() {
		const { attributesItem, attHeader } = this.props;

		// console.log(attributesItem);
		this.setState({
			attributesItem: attributesItem,
			attHeader: attHeader,
		});
	}

	render() {
		const {
			itemIndex,
			// attHeader,
			cartPage,
			className,
			updateItems,
			miniCart,
			// attributesItem,
		} = this.props;

		const { attributesItem, attHeader } = this.state;

		// console.log(attHeader);
		return (
			<ul key={itemIndex} className={`${className}__attributions`}>
				<li key={attHeader} className={`${className}__attribution`}>
					<h4
						className={`${className}__attribution-header`}
						style={{ fontSize: cartPage ? '0.853rem' : '0.7rem' }}
					>
						{attHeader?.toUpperCase()}:
					</h4>
					<ul className={`pd__attribution__items`}>
						{attributesItem ? (
							attributesItem?.map((item, btnIndex) => {
								return (
									<AttributesBtn
										key={btnIndex}
										item={item.value}
										// attHeader={attHeader}
										className={className}
										btnIndex={btnIndex}
										itemIndex={itemIndex}
										updateItems={updateItems}
										itemIsChecked={item.isChecked}
										miniCart={miniCart}
										cartPage={cartPage}
									/>
								);
							})
						) : (
							<p>something went wrong</p>
						)}
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
