import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost, addComment, deleteComment } from '../../redux/actions/post'
import PostItem from './PostItem'
import CreatePost from './CreatePost'
import Spinner from '../layout/Spinner'
import Comment from './Comment'

const SinglePost = ({
   getPost,
   match,
   post,
   addComment,
   isAuthenticated,
   user_id,
   deleteComment,
}) => {
   useEffect(() => {
      getPost(match.params.id)
   }, [getPost, match.params.id])
   if (!post) return <Spinner />
   return (
      <Fragment>
         <Link to='/posts'>Back to Posts</Link>
         <PostItem post={post} isDiscussion={true} />
         <CreatePost
            isDiscussion={true}
            addComment={addComment}
            id={match.params.id}
         />
         {post.comments.length > 0 &&
            post.comments.map((comment) => (
               <Comment
                  comment={comment}
                  isAuthenticated={isAuthenticated}
                  postId={post._id}
                  user_id={user_id}
                  deleteComment={deleteComment}
               />
            ))}
      </Fragment>
   )
}

SinglePost.propTypes = {
   getPost: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
   addComment: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
   user_id: PropTypes.string.isRequired,
   deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
   post: state.post.post,
   isAuthenticated: state.auth.isAuthenticated,
   user_id: state.auth.user._id,
})

export default connect(mapStateToProps, { getPost, addComment, deleteComment })(
   SinglePost
)
