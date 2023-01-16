import React, { Component } from 'react';

class AttributionBtn extends Component {
	constructor() {
		super();
		this.state = {
			colorSwatch: false, //!KEEP
			btnDisable: false, //!KEEP
		};

		this.btnCheckHandler = this.btnCheckHandler.bind(this);
	}

	componentDidMount() {
		const { attHeader, className } = this.props;

		className === 'cart-items__pd'
			? this.setState({ btnDisable: true })
			: this.setState({ btnDisable: false });

		if (attHeader === 'Color') {
			this.setState({
				colorSwatch: true,
			});
		} else {
			this.setState({
				colorSwatch: false,
			});
		}
	}

	btnCheckHandler(e, itemIndex, btnIndex) {
		const {
			itemValuesHandler,
			removeValuesHandler,
			itemCheckHandler,
			updateItems,
		} = this.props;

		const attCheck = e.target.checked;
		const attValue = e.target.value;

		if (this.state.miniCart === true) {
			return;
		}

		itemCheckHandler(attValue);

		attCheck ? itemValuesHandler(attValue) : removeValuesHandler(attValue);

		updateItems(itemIndex, btnIndex);
	}

	render() {
		const { item, className, btnIndex, itemIndex, itemIsChecked, miniCart } =
			this.props;

		const { colorSwatch } = this.state;
		const largeBtnGuard = item.length > 2;

		let itemBackground = colorSwatch
			? {
					backgroundColor:
						item === 'Green'
							? '#0F6450'
							: item === 'White'
							? '#D3D2D5'
							: item === 'Black'
							? '#2B2B2B'
							: item,
					minWidth: miniCart ? '1.1rem' : '2.5rem',
					border: 'none',
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
				style={{
					...itemBackground,
					...defaultColorChecked,
					fontSize: miniCart ? '0.75rem' : '',
					minWidth: miniCart ? (largeBtnGuard ? '1.1rem' : '1.5rem') : '2.5rem',
					padding: miniCart ? '0.2rem' : '0.4rem',
				}}
			>
				<label htmlFor="item">{colorSwatch ? '' : item}</label>
				<input
					type="checkbox"
					name={item}
					id={item}
					value={item}
					className={'attribution__item-checkbox'}
					checked={itemIsChecked}
					onChange={(e) => this.btnCheckHandler(e, itemIndex, btnIndex)}
				/>
			</li>
		);
	}
}

export default AttributionBtn;
