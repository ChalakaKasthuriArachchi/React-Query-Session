import React from 'react'
import { useParams } from 'react-router-dom'

//

import usePost from '../../hooks/usePost'
import {StyledP, StyledSpan} from "../../components/styled";

export default function Post() {
  const { postId } = useParams()
  const postQuery = usePost(postId)

  return (
    <>
      {postQuery.isLoading ? (
        <StyledSpan>Loading...</StyledSpan>
      ) : postQuery.isError ? (
        postQuery.error.message
      ) : (
        <div>
          <h1>{postQuery.data.title}</h1>
          <StyledP>{postQuery.data.body}</StyledP>
        </div>
      )}
    </>
  )
}
