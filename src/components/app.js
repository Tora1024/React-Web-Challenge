import React, { Component } from 'react';
import RedditData from './show_data';
import SearchBar from './search_bar';

export default class App extends Component {
  render() {
    return (
      <div>
		<SearchBar />
		<RedditData />
      </div>
    );
  }
}
