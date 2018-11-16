import React, { Component } from 'react';

class DeleteButton extends Component {
    /**
     * @property {Object} state
     */
    state = {
        confirmationOpen: false
    }

    /**
     * @method toggleConfirmationOpen
     */
    toggleConfirmationOpen = () => {
        this.setState({confirmationOpen: !this.state.confirmationOpen})
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render () {
        return (
            <div className='delete-button'>
                <small className="muted mb-2 d-block">{this.state.confirmationOpen ? 'ARE YOU SURE?' : 'DELETE'}</small>
                {this.state.confirmationOpen ? (
                    <div className="confirmation-buttons d-flex">
                        <button type="button" onClick={this.toggleConfirmationOpen} className="btn btn-outline-danger flex-grow-1 mr-2"><span>NO</span></button>
                        <button type="button" onClick={this.props.onConfirm} className="btn btn-success--gradient flex-grow-1"><span>YES</span></button>
                    </div>
                ) : (
                    <button type="button" onClick={this.toggleConfirmationOpen} className="btn btn-danger--gradient btn-block"><span>Delete <span className="lnr lnr-trash"></span></span></button>
                )}
            </div>
        )
    }
}

export default DeleteButton