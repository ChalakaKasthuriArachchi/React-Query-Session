import React from 'react'
import axios from 'axios'
import {queryCache, useQuery} from "react-query";
import {fetchPost} from "./usePost";

export default function usePosts() {
  return  useQuery(
      'posts',
      () => axios.get('/api/posts').then((res) => res.data), {
        cacheTime: 10 * 60 * 1000,
        staleTime: 0,
        refetchOnWindowFocus: true,
        onMutate: () => {
            return queryCache.getQueryData('posts');
        },
        onSuccess: (savedPosts, _ , existingPosts) => {
            if(savedPosts?.length !== existingPosts?.length) {
                return savedPosts?.map(post => {
                    if(!queryCache.getQueryData(['posts', post.id])) // if the post is not in the cache
                        queryCache.prefetchQuery(['posts', post.id], () => fetchPost(post.id))
                })
            }
            return null;
        }
      })
}
