import { useState, useEffect } from 'react';
import { getBlogPosts } from '../expressAPI/get-blog-posts';

export const useGetBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<any>([]);

  async function handleDataFetch () {
    const result = await getBlogPosts();
    setBlogPosts(result.blogPosts);
  }

  useEffect(() => {
    handleDataFetch();
  }, [])
  
  return {blogPosts, getBlogPosts: handleDataFetch}
}