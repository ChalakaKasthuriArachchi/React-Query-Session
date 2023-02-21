import React from 'react'
import { Link } from 'react-router-dom'

import PostForm from '../../components/PostForm'
import {Loader, StyledSpan} from '../../components/styled'

import usePosts from '../../hooks/usePosts'
import useCreatePost from '../../hooks/useCreatePost'

export default function Posts() {
  const postsQuery = usePosts()
  const [createPost, createPostInfo] = useCreatePost()

  const onSubmit = async (values) => {
    await createPost(values)
    postsQuery.fetch()
  }

  return (
    <section>
      <div>
        <div>
          {postsQuery.isLoading ? (
            <StyledSpan>
              <Loader /> Loading
            </StyledSpan>
          ) : (
            <>
              <h1>Posts</h1>
              <ul>
                {postsQuery.data.map((post) => (
                  <li key={post.id} style={{fontSize: '30px'}}>
                    <Link to={`./${post.id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h2>Create New Post</h2>
        <div>
          <PostForm
            onSubmit={onSubmit}
            clearOnSubmit
            submitText={
              createPostInfo.isLoading
                ? 'Saving...'
                : createPostInfo.isError
                ? 'Error!'
                : createPostInfo.isSuccess
                ? 'Saved!'
                : 'Create Post'
            }
          />
        </div>
      </div>
    </section>
  )
}
