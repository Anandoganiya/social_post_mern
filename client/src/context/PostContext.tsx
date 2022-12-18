import React, { createContext, useEffect, useState, Key } from 'react';
import moment from 'moment';
import axios from 'axios';

export interface PostType {
  title: String;
  description: String;
  username?: String;
  createdAt?: moment.MomentInput;
  userId: String;
  id: Key;
  postImage: File;
}

type postContextType = {
  posts: PostType[] | [];
  loading: boolean;
  setPosts: (data: PostType[]) => void;
};

export const postContext = createContext<postContextType>({
  posts: [],
  loading: true,
  setPosts: () => undefined,
});

const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostType[] | []>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await axios.get('http://localhost:5000/post', {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY3MDkyNzg1NX0.cs4wQBIq-4rQ65L4J27R0IZIDreANEcYR5sdnqGKxXo',
        },
      });
      const { data } = res.data;
      setPosts(
        data.sort(
          (a: any, b: any) =>
            Number(moment(b.createdAt)) - Number(moment(a.createdAt))
        )
      );
      setLoading(false);
    })();
  }, []);
  return (
    <postContext.Provider value={{ posts, loading, setPosts }}>
      {children}
    </postContext.Provider>
  );
};

export default PostProvider;
