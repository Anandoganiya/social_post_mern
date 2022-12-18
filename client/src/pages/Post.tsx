import { useState, SyntheticEvent, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FcAddImage } from 'react-icons/fc';
import { postContext } from '../context/PostContext';
import Posts from '../components/Posts';

function Post() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const { posts, setPosts, loading } = useContext(postContext);

  const handlePostForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    let dataForm = new FormData();
    if (!title) return;
    if (!desc) return;
    dataForm.append('title', title);
    dataForm.append('desc', desc);
    dataForm.append('userId', '14');
    if (imageUpload) {
      dataForm.append('image', imageUpload, imageUpload.name);
    }

    try {
      await axios.post('http://localhost:5000/post', dataForm, {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY3MDkyNzg1NX0.cs4wQBIq-4rQ65L4J27R0IZIDreANEcYR5sdnqGKxXo',
        },
      });
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border w-4/5 mx-auto">
      {/* Header component */}
      <header className="">
        <div>user name</div>
      </header>
      {/* Post form */}
      <form
        onSubmit={handlePostForm}
        method="POST"
        encType="multipart/form-data"
        className="border m-4"
      >
        <div className="flex justify-between m-4">
          <div>
            <div className="flex flex-col">
              <label htmlFor="title">Title:</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                id="title"
                name="title"
                placeholder="Enter the title for the post"
                className="outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="desc">Description:</label>
              <input
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                type="text"
                id="desc"
                name="desc"
                placeholder="what's on your mind john deo"
                className="outline-none"
              />
            </div>
          </div>
          <div>
            <img
              src={imageUpload ? URL.createObjectURL(imageUpload) : undefined}
              className="w-[100px] h-[100px] bg-cover"
            />
          </div>
        </div>
        <div className="flex justify-between items-center m-4">
          <div>
            <label htmlFor="image" className="cursor-pointer">
              <FcAddImage className="w-[30px] h-[30px]" />
            </label>
            <input
              type="file"
              onChange={(e: any) => setImageUpload(e.target.files[0])}
              accept="image/*"
              id="image"
              name="image"
              className="hidden"
            />
          </div>
          <button
            className="text-white px-8 py-2 rounded-md bg-blue-400 hover:bg-blue-500"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
      {/* Post component */}
      {loading ? (
        <div className="text-center">loading...</div>
      ) : posts.length !== 0 ? (
        posts.map((post) => {
          return <Posts key={post.id} post={post} />;
        })
      ) : (
        <div className="text-center">no posts</div>
      )}
    </div>
  );
}

export default Post;
