import React from 'react'
import { Link } from 'react-router-dom'
//
import usePosts from '../../hooks/usePosts'
import {PostStyles, StyledP, StyledSpan} from '../../components/styled'

export default function Home() {
  const postsQuery = usePosts()

  return (
    <div>
      <h1>Blog</h1>

      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        `}
      >
        {postsQuery.isLoading ? (
          <StyledSpan>Loading...</StyledSpan>
        ) : postsQuery.isError ? (
          postsQuery.error.message
        ) : (
          postsQuery.data.map((post) => (
            <PostStyles as={Link} to={`./${post.id}`} key={post.id}>
              <h2>{post.title}</h2>
              <StyledP>{post.body}</StyledP>
            </PostStyles>
          ))
        )}
      </div>
    </div>
  )
}
