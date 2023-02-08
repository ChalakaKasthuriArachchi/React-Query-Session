import React from 'react'
import axios from 'axios'
import {useQuery} from "react-query";

export default function usePosts() {
  return  useQuery(
      'posts',
      () => axios.get('/api/posts').then((res) => res.data), {
        cacheTime: 10 * 60 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: true
      })
}
