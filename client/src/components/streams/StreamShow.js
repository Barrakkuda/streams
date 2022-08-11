import React from "react";
import {connect} from "react-redux";
import {fetchStream} from "../../actions";

class StreamShow extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    renderStream() {
        if (!this.props.stream) {
            return 'Loading...'
        }

        const {title, description} = this.props.stream;

        return (
            <React.Fragment>
                <h1>{title}</h1>
                <p>{description}</p>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div className="stream-show">
                {this.renderStream()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);