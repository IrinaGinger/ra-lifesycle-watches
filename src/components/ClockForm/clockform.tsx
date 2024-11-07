import React from 'react';

import { IFormProps, IForm } from '../../interfaces'; 

import './clockform.css';

class ClockForm extends React.Component<IFormProps, IForm> {
    constructor(props: IFormProps) {
        super(props);
        this.state = { name: '', timezone: '' };
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        this.setState((prevForm: IForm) => ({ ...prevForm, [name]: value }));
    }

    render() {
        return (
            <form
                className="clock-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onFormSubmit(this.state);
                    this.setState({ name: '', timezone: '' });                    
                }}
            >
                <div className="form-control">
                    <label htmlFor="name">Название</label>
                    <input
                        className="form-control-name"
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleFormChange}                        
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="timezone">Временная зона</label>
                    <input
                        className="form-control-timezone"
                        type="number"
                        id="timezone"
                        name="timezone"
                        min="-12"
                        max="12"
                        value={this.state.timezone}
                        onChange={this.handleFormChange}
                        required
                    />
                </div>
                <button
                    className="add-button"
                    type="submit"
                >
                    Добавить
                </button>
            </form>
        );
    }
}

export default ClockForm;