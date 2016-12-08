import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactImageFallback from 'react-image-fallback';
import Modal from 'react-modal';
import { fetchPosts } from '../actions/index';
import { ModalData } from './modal_data';

class PostsIndex extends Component {
	constructor() {
      super();

      this.state = { open: false, index: null }; 
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    /* Methods needed to handle the modal events */

    openModal(i) { this.setState({ open: true }); this.setState({ index: i }); }

    closeModal() { this.setState({ open: false }); }

    /* This method takes care of rendering the fetched posts
	* In absence of rendering data, a loading animation would be present
	* If the data failed to load, an error message would be presented to the user
    */

	renderPosts() {
		if (Object.keys(this.props.posts).length === 0 && this.props.error.length === 0) {
			return (
				<div className="loading">
					<img alt="loader" src="../../images/loader.gif" />Loading...
				</div>
			);
		}
		if (this.props.error.length > 0) {
			return (
				<div className="error-container">
					<h3 className="">Opps! There was an error in your search</h3>
					<p>Most likely it has to do with the category not existing, or being private.</p>
					<p>Don't panic tho, go ahead and pick another category!</p>
				</div>
			);
		}
		return this.props.posts.children.map((post, index) => 
			<li 
				onClick={this.openModal.bind(this, index)} 
				className="clearfix post-item" 
				key={post.data.id}
			>
				<ReactImageFallback 
					src={post.data.thumbnail}
					initialImage="../../images/loader.gif"
					fallbackImage="../../images/unknown.png"
					className="post-image"
				/>
				<div className="post-description">
					<span className="post-author">{post.data.author}</span>
					<p className="post-title">{post.data.title}</p>
					<div className="posts-footer">
						<div className="posts-footer-comments">
							{post.data.num_comments} comments
						</div>
						<div className="posts-footer-ups">
							{post.data.ups} ups
						</div>
						<div className="posts-footer-downs">
							{post.data.downs} downs
						</div>
					</div>
				</div>
			</li>
		);
	}

	render() {
		return (
			<div className="data-container">
				<ul className="post-list">
					{this.renderPosts()}
				</ul>
				<Modal
					className="modal-container"
					overlayClassName="overlay"
					isOpen={this.state.open}
					onRequestClose={this.closeModal}
				>
					<ModalData index={this.state.index} data={this.props.posts.children} />
				</Modal>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts.all, error: state.posts.error };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
