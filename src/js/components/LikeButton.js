import React, { Component } from 'react';
import { TweenLite, Elastic } from 'gsap';

class LikeButton extends Component {
    /**
     * @property {setTimeout} classTimer
     */
    classTimer = setTimeout(() => false, 0);

    /**
     * @method bounceThis
     * @description boucing micro interaction
     * @param {Object} e Event
     */
    bounceThis = e => {
        e.preventDefault();
        this.props.onClick();
        this.reaction.classList.add('clicked');
        clearTimeout(this.classTimer);
        this.classTimer = setTimeout(() => this.reaction === null ? null : this.reaction.classList.remove('clicked'), 1150);
        TweenLite.to(this.reaction, 0, {transform:"scale(1)"});
        TweenLite.to(this.reaction, 1, {transform:"scale(1.5)", ease: Elastic.easeOut.config(1, 0.3)})
        .eventCallback('onComplete', () => this.reaction === null ? null : TweenLite.to(this.reaction, 0.3, {transform:"scale(1)"}));
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        const { option } = this.props;
        return (
            <span onClick={this.bounceThis} ref={reaction => this.reaction = reaction} className="reaction">
                {option === 'upVote' ? <span className="lnr lnr-thumbs-up"></span> : <span className="lnr lnr-thumbs-down flipX d-inline-block"></span>}
            </span>
        )
    }
}

export default LikeButton;