import moment from 'moment';
import { PostType } from '../context/PostContext';

const Posts = ({ post }: { post: PostType }) => {
  const image = `data:image/png;base64,${post?.postImage}`;
  return (
    <div className="mx-auto my-4 border rounded-lg w-2/4">
      <div className="font-bold m-1">
        <div>{post.username}</div>
        <div>{moment(post.createdAt).fromNow()}</div>
        {post.postImage && (
          <div className="h-[400px] w-full ">
            <img
              src={image}
              className="w-full h-full bg-cover rounded-lg"
              alt="post image"
            />
          </div>
        )}
        <div className="font-bold my-1">{post.title}</div>
        <div className="font-normal">{post.description}</div>
      </div>
    </div>
  );
};

export default Posts;
