import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllPosts, addPost, getPost } from '../../redux/actions/post'
import CreatePost from './CreatePost'
import PostItem from './PostItem'
import Spinner from '../layout/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPeace } from '@fortawesome/free-solid-svg-icons'

const Post = ({ post: { AllPosts, isLoading }, getAllPosts, addPost, getPost }) => {
   useEffect(() => {
      getAllPosts()
   }, [getAllPosts])
   if (isLoading) return <Spinner />
   return (
      <div className='post-page'>
         <h1 className='header-post'>
            Welcome to the community{' '}
            <FontAwesomeIcon className='peace' icon={faHandPeace} />
         </h1>
         <CreatePost
            addPost={addPost}
            isDiscussion={false}
            getAllPosts={getAllPosts}
            getPost={getPost}
         />
         {AllPosts &&
            AllPosts.map((post) => (
               <PostItem key={post._id} post={post} isDiscussion={false} />
            ))}
      </div>
   )
}

Post.propTypes = {
   post: PropTypes.object.isRequired,
   getAllPosts: PropTypes.func.isRequired,
   addPost: PropTypes.func.isRequired,
   getPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
   post: state.post,
})

export default connect(mapStateToProps, { getAllPosts, addPost, getPost })(Post)
