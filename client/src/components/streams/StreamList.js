import React from "react";
import {connect} from "react-redux";
import history from "../../history";
import {Link} from "react-router-dom";
import {fetchStreams, deleteStream} from "../../actions";

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButtons = (stream) => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="buttons right floated content">
                    <Link
                        to={`/streams/edit/${stream.id}`}
                        className="ui button primary edit">
                        Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="ui button negative delete">
                        Delete
                    </Link>
                </div>
            );
        }
    }

    renderList() {
        if (this.props.streams.length > 0) {
            return this.props.streams.map((stream) => (
                <div className="item ui segment" key={stream.id} style={{padding: '15px'}}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            ));
        } else {
            return 'No streams to show'
        }
    }

    renderCreateButton() {
        if (this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="stream-list">
                <h1>Streams List</h1>
                <div className="ui celled list">
                    {this.renderList()}
                </div>

                {this.renderCreateButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {fetchStreams, deleteStream})(StreamList);