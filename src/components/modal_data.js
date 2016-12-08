import React, { Component } from 'react';
import ReactImageFallback from 'react-image-fallback';
import { Draggable, Droppable } from 'react-drag-and-drop';

const urlHeader = 'https://www.reddit.com';

export class ModalData extends Component {

	/* Methods to handle the Droppable events for either open the post or send it through email */

	onDropReddit() {
		window.open(`${urlHeader}${this.props.data[this.props.index].data.permalink}`, '_blank');
	}

	onDropEmail() {
		const strTitle = 'Interesting reddit post! Check it out: ';
		window.location = `mailto:?body=${strTitle} 
							${urlHeader}${this.props.data[this.props.index].data.permalink}
							&subject=I thought this link might interest you.`;
	}

	/* Contents for the modal, inside it all the drag and drop functionality */

	render() {
		return (
			<div className="modal-container">
				<Draggable className="modal-item-box modal-post-container">
					<div className="modal-post-item">
						<ReactImageFallback
							src={this.props.data[this.props.index].data.thumbnail}
							initialImage="../../images/loader.gif"
							fallbackImage="../../images/unknown.png"
							className="post-image"
						/>
						<span className="modal-post-author">
							{this.props.data[this.props.index].data.author}
						</span>
						<p className="modal-post-title">
							{this.props.data[this.props.index].data.title}
						</p>
						<div className="posts-footer">
							<div className="posts-footer-comments">
								{this.props.data[this.props.index].data.num_comments}
							</div>
							<div className="posts-footer-ups">
								{this.props.data[this.props.index].data.ups}
							</div>
						</div>
					</div>
				</Draggable>
				<Droppable onDrop={this.onDropReddit.bind(this)}>
					<div className="modal-item-box modal-reddit-container">
						<img className="modal-inside-images" alt="reddit" src="../../images/reddit-logo.png" />
						<p className="modal-inside-title">Open on Reddit</p>
					</div>
				</Droppable>
				<Droppable onDrop={this.onDropEmail.bind(this)}>
					<div className="modal-item-box modal-email-container">
						<img className="modal-inside-images" alt="reddit" src="../../images/mail-logo.png" />
						<p className="modal-inside-title">Email to a Friend</p>
					</div>
				</Droppable>
				<span className="modal-text">Drag the card on the left to the desired action</span>
			</div>
		);
	}
}

