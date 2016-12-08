import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DebounceInput from 'react-debounce-input';
import { fetchPosts } from '../actions/index';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
	}

	componentWillMount() {
		this.props.fetchPosts('funny');
	}

	onInputChange(term) {
		this.props.fetchPosts(term);
	}

	/* DebounceInput works as the "delayer" for the keystroke event */

	render() {
		return (
			<div className="search-bar">
				<div>
					<span className="logo-title">Reddit</span>
				</div>
				<div>
					<DebounceInput
						minLength={0}
						debounceTimeout={300}
						className="search-input"
						placeholder="Category"
						value="funny"
						onChange={event => this.onInputChange(event.target.value)} 
					/>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
