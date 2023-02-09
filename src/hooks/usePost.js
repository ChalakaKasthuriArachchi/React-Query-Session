import React from 'react'
import axios from 'axios'
import {queryCache, useQuery} from "react-query";

export const fetchPost = (postId) =>
  axios.get(`/api/posts/${postId}`).then((res) => res.data)

export default function usePost(postId) {
  return  useQuery(['posts', postId], () => fetchPost(postId), {
    initialData: () => {
      return queryCache.getQueryData('posts')?.find(post => post.id === postId)
    },
    initialStale: true
  })
}
