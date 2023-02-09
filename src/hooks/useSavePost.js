import React from 'react'
import axios from 'axios'
import {queryCache, useMutation} from "react-query";

export default function useSavePost() {
  return useMutation((newPost) => axios.patch(`/api/posts/${newPost.id}`, newPost),
      {
          onMutate: (newPost) => {
              const oldPost = queryCache.getQueryData(['posts', newPost.id])
              queryCache.setQueryData(['posts', newPost.id], newPost)
              return oldPost;
          },
          onSuccess: (updatedPost) => {
              queryCache.setQueryData(['posts', updatedPost.id], updatedPost)
          },
          onError: (error, newPost, oldPost) => {
              queryCache.setQueryData(['posts', newPost.id], oldPost)
          },
          onSettled: () => {
              queryCache.invalidateQueries('posts')
          }
      }
  )
}
