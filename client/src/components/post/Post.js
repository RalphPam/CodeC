import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllPosts, addPost } from '../../redux/actions/post'
import CreatePost from './CreatePost'
import PostItem from './PostItem'
import Spinner from '../layout/Spinner'

const Post = ({ post: { AllPosts, isLoading }, getAllPosts, addPost }) => {
   useEffect(() => {
      getAllPosts()
   }, [getAllPosts])
   if (isLoading) return <Spinner />
   return (
      <div>
         <h1>
            Welcome to the community <i className='fas fa-hand-peace'></i>
         </h1>
         <CreatePost addPost={addPost} isDiscussion={false} />
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
}

const mapStateToProps = (state) => ({
   post: state.post,
})

export default connect(mapStateToProps, { getAllPosts, addPost })(Post)
