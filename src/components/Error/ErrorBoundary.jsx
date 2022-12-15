import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			errorMessage: null,
		};
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.

		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			errorMessage: error,
		});
		console.log(errorInfo);
	}

	render() {
		if (this.state.hasError) {
			console.log(this.state.errorMessage);
			return (
				<>
					<h1>Something went wrong.</h1>
				</>
			);
		}

		return this.props.children;
	}
}
