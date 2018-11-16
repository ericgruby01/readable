import React, { Component } from 'react';

class ToTopButton extends Component {

    /**
     * @method toggleToTopButton
     * @description If the page scrolls 200px or more, the button will fade-in
     */
    toggleToTopButton = () => {
        const scrollAmount = document.getElementsByTagName('html')[0].scrollTop;
        if (scrollAmount >= 200) {
            this.toTop.classList.add('visible');
        } else {
            this.toTop.classList.remove('visible');
        }
    }

    /**
     * @method componentDidMount
     * @description Lifecycle method
     */
    componentDidMount() {
        window.addEventListener('scroll', this.toggleToTopButton)
    }

    /**
     * @method componentWillUnmount
     * @description Lifecycle method
     */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.toggleToTopButton);
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        return (
            <div id="to-top-btn" ref={toTop => this.toTop = toTop} className="cursor-pointer" onClick={() => document.getElementById('app').scrollIntoView({ block: 'start', behavior: 'smooth' })}>
                <span className="lnr lnr-chevron-up"></span>
            </div>
        )
    }
}

export default ToTopButton;