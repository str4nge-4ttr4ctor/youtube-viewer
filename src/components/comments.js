import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchComments, clearCommentsState } from "../actions";
import Moment from 'react-moment';
import { FormattedMessage } from 'react-intl';
import renderHTML from 'react-render-html';
import Button from 'react-bootstrap/Button'


class Comments extends Component {

    componentWillMount() {
        if (this.props.videoId) {
            this.props.fetchComments();
        }
    }
    componentWillUnmount() {
        this.props.clearCommentsState();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps && nextProps.videoId
            && this.props.videoId !== nextProps.videoId) {
            nextProps.fetchComments();
        }
    }

    handleLoadMore = () => {
        this.props.fetchComments(this.props.nextPageToken, this.props.comments);
    }

    render() {
        return (
            <div className="comments">
                <span className="commentsTitle">
                    <FormattedMessage
                        id="comments.commentsTitle"
                        defaultMessage="Comments"
                    />
                </span>

                {!!this.props.isFetching && !this.props.comments
                    && <FormattedMessage
                        id="comments.loading"
                        defaultMessage="Loading... Please wait..."
                    />
                }

                {!!this.props.errorMessage && !this.props.isFetching
                    ? <div>
                        <span className="errorMessage">{this.props.errorMessage}</span>
                        <div><Button
                            onClick={this.handleLoadMore}
                            disabled={this.props.isFetching}
                            variant="primary">
                            <FormattedMessage
                                id="comments.button.reload"
                                defaultMessage="Reload"
                            /></Button></div>
                    </div>
                    : !this.props.comments && !this.props.isFetching
                    && <FormattedMessage
                        id="comments.noComments"
                        defaultMessage={`No comments`}
                    />}

                {!!this.props.comments
                    && <div>
                        {this.props.comments.map((comment, index) => {
                            return <div key={`comment${index}`} className="comment" >
                                <div className="commentHeader">
                                    <img className="authorProfile" src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="not found"></img>
                                    <span className="commentAuthorName">{comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
                                    <Moment interval={0} format="D MMMM YYYY" className="commentDate">{comment.snippet.topLevelComment.snippet.updatedAt}</Moment>
                                </div>
                                <div>{renderHTML(comment.snippet.topLevelComment.snippet.textDisplay)}</div>
                                <div className="likeCount">
                                    <FormattedMessage
                                        id="comments.likeCount"
                                        defaultMessage={`{count, number} {count, plural, one {like} other {likes}}`}
                                        values={{ count: comment.snippet.topLevelComment.snippet.likeCount }}
                                    /></div>
                            </div>
                        })}

                        {!!this.props.nextPageToken
                            && <div className="loadMoreButton"><Button
                                onClick={this.handleLoadMore}
                                variant="link"
                                disabled={this.props.isFetching}
                            >
                                {this.props.isFetching
                                    ? <FormattedMessage
                                        id="comments.button.loading"
                                        defaultMessage="Loading..."
                                    />
                                    : <FormattedMessage
                                        id="comments.button.loadMore"
                                        defaultMessage="Load More..."
                                    />}
                            </Button></div>}


                    </div>}
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        comments: state.comments.videoComments,
        isFetching: state.comments.isFetching,
        nextPageToken: state.comments.nextPageToken,
        errorMessage: state.comments.errorMessage
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchComments: (nextPageToken, comments) => {
            fetchComments(dispatch, ownProps.videoId, nextPageToken, comments)
        },
        clearCommentsState: () => {
            dispatch(clearCommentsState())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
