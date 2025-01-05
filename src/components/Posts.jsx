import Link from 'next/link'

const Post = ({
  totalLikes,
  totalComments,
  title,
  content,
  id,
  isPublic,
  createdAt,
  user,
}) => {
  return (
    <div className='card bg-base-100 w-96 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='line-clamp-3 text-gray-500 text-sm'>
          Created by {user.name} at {new Date(createdAt).toDateString()}{' '}
        </p>

        <div>total likes {totalLikes}</div>
        <div>total comments {totalComments}</div>

        <p className='line-clamp-3'>{content}</p>

        <div className='card-actions justify-end'>
          {isPublic ? (
            <Link href={`/post/${id}`} className='btn btn-primary'>
              View Post
            </Link>
          ) : (
            <Link href={`/post/${id}/update`} className='btn btn-info'>
              Edit Post
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

const Posts = ({ posts }) => {
  return (
    <>
      <div className='flex flex-wrap gap-3'>
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}

export default Posts
