import React from "react";
import {connect} from "react-redux";
import {editStream, fetchStream, deleteStream} from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    renderForm() {
        return (
            <StreamForm
                onSubmit={this.onSubmit}
                initialValues={{
                    title: this.props.stream.title,
                    description: this.props.stream.description
                }}

                // Or...
                // initialValues={this.props.stream}
            />
        );
    }

    render() {
        if (this.props.stream) {
            return (
                <div className="stream-edit">
                    <h1>Edit Stream</h1>
                    {this.renderForm()}
                </div>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {editStream, fetchStream, deleteStream})(StreamEdit);