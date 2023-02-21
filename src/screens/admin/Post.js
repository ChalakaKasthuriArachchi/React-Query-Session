import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

//

import usePost from '../../hooks/usePost'
import useSavePost from '../../hooks/useSavePost'
import useDeletePost from '../../hooks/useDeletePost'

import PostForm from '../../components/PostForm'
import {Loader, StyledP, StyledSpan} from '../../components/styled'

export default function Post() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const postQuery = usePost(postId)
  const [savePost, savePostInfo] = useSavePost()
  const [deletePost, deletePostInfo] = useDeletePost()

  const onSubmit = async (values) => {
    await savePost(values)
    postQuery.fetch()
  }

  const onDelete = async () => {
    await deletePost(postId)
    navigate('/admin')
  }

  return (
    <>
      {postQuery.isLoading ? (
        <StyledSpan>
          <Loader /> Loading...
        </StyledSpan>
      ) : (
        <div>
          <h1>{postQuery.data.title}</h1>
          <StyledP>
            <Link to={`/blog/${postQuery.data.id}`}>View Post</Link>
          </StyledP>
          <PostForm
            initialValues={postQuery.data}
            onSubmit={onSubmit}
            submitText={
              savePostInfo.isLoading
                ? 'Saving...'
                : savePostInfo.isError
                ? 'Error!'
                : savePostInfo.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          />

          <button hidden={true} onClick={onDelete}>
            {deletePostInfo.isLoading
                ? 'Deleting...'
                : deletePostInfo.isError
                    ? 'Error!'
                    : deletePostInfo.isSuccess
                        ? 'Deleted!'
                        : 'Delete Post'}
          </button>
        </div>
      )}
    </>
  )
}
