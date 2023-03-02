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

		this.setState({
			attributesItem: attributesItem,
			attHeader: attHeader,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.attributesItem !== this.props.attributesItem) {
			this.setState({
				attributesItem: this.props.attributesItem,
			});
		}
	}

	render() {
		const { itemIndex, cartPage, className, updateItems, miniCart } =
			this.props;

		const { attributesItem, attHeader } = this.state;

		return (
			<ul key={itemIndex} className={`${className}__attributions`}>
				<li key={attHeader} className={`${className}__attribution`}>
					<h4
						className={`${className}__attribution-header`}
						style={{
							fontSize: cartPage ? '1.125rem' : '0.835rem',
							fontWeight: cartPage ? '700' : '400',
						}}
					>
						{attHeader}:
					</h4>
					<ul className={`pd__attribution__items`}>
						{attributesItem ? (
							attributesItem?.map((item, btnIndex) => {
								return (
									<AttributesBtn
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
	};
};

export default connect(mapStateToProps)(AttributeItem);
