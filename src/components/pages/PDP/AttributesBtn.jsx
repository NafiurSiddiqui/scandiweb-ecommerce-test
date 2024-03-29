import React, { Component } from 'react';

class AttributesBtn extends Component {
	constructor() {
		super();
		this.state = {
			colorSwatch: false,
		};

		this.btnCheckHandler = this.btnCheckHandler.bind(this);
	}

	componentDidMount() {
		const { attHeader } = this.props;

		this.setState({
			colorSwatch: attHeader === 'Color' ? true : false,
		});
	}

	btnCheckHandler(itemIndex, btnIndex) {
		const { updateItems, miniCart } = this.props;

		//guard clause for card > cartIcon
		if (miniCart === true) {
			return;
		}
		//update item isChecked based on these indexes
		updateItems(itemIndex, btnIndex);
	}

	render() {
		const {
			item,
			className,
			btnIndex,
			itemIndex,
			itemIsChecked,
			miniCart,
			cartPage,
		} = this.props;

		const { colorSwatch } = this.state;
		const largeBtnGuard = item.length > 2;

		let itemBackground = colorSwatch
			? {
					backgroundColor:
						item === 'Green'
							? '#0F6450'
							: item === 'White'
							? '#ffffff'
							: item === 'Black'
							? '#2B2B2B'
							: item,
					minWidth: miniCart ? '1.1rem' : '2.5rem',
					border: 'none',
					boxShadow: itemIsChecked
						? 'none'
						: '0px 0px 1px 0.9px rgb(142 142 142 / 50%) ',
			  }
			: !colorSwatch && itemIsChecked
			? { backgroundColor: '#1D1F22', color: 'white' }
			: { backgroundColor: 'white' };

		const defaultColorChecked =
			colorSwatch && itemIsChecked
				? { outline: '2px solid #5ECE7B', outlineOffset: ' 0.1rem' }
				: { outline: 'none' };

		return (
			<li
				className={`${className}__attribution__item`}
				key={item}
				onClick={() => this.btnCheckHandler(itemIndex, btnIndex)}
				data-checked={itemIsChecked}
				data-value={item}
				style={{
					...itemBackground,
					...defaultColorChecked,
					fontSize: miniCart && !cartPage ? '0.875rem' : '',
					// minWidth:
					// 	miniCart && !cartPage
					// 		? largeBtnGuard
					// 			? '1.1rem'
					// 			: '1.5rem'
					// 		: colorSwatch
					// 		? '1.5rem'
					// 		: '3.938rem',
					minWidth: colorSwatch
						? cartPage || (!cartPage && !miniCart)
							? '2rem'
							: '1rem'
						: miniCart && !cartPage
						? '1.5rem'
						: '3.983rem',

					padding: miniCart && !cartPage ? '0.2rem' : '0.4rem',
					cursor: miniCart ? 'not-allowed' : 'pointer',
					minHeight: colorSwatch
						? cartPage || (!cartPage && !miniCart)
							? '2rem'
							: '1rem'
						: miniCart && !cartPage
						? '1rem'
						: '2.813rem',
				}}
			>
				{colorSwatch ? '' : item}
			</li>
		);
	}
}

export default AttributesBtn;
