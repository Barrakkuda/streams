import React from "react";
import {Field, reduxForm} from "redux-form";

class StreamForm extends React.Component {
    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label htmlFor={formProps.id}>{formProps.label}</label>
                <input {...formProps.input} id={formProps.id} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>

            // <input
            //     name={formProps.input.name}
            //     onChange={formProps.input.onChange}
            //     value={formProps.input.value}
            // />
        );
    }

    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form className="stream-form ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Title"
                    id="stream-title"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Description"
                    id="stream-description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'Title cannot be empty'
    }

    if (!formValues.description) {
        errors.description = 'Description cannot be empty';
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);