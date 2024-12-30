import Link from 'next/link'
import { getSinglePost } from '@/actions/post'
import React from 'react'

const Page = async ({ params }) => {
  const { postID } = await params

  const { post } = await getSinglePost(postID)

  return (
    <div>
      <div className='flex gap-3 justify-between mt-10'>
        <h1 className='text-4xl'>{post.title}</h1>

        <Link href={`/post/${postID}/update`} className='btn btn-info'>
          Edit
        </Link>
      </div>
      <p className='line-clamp-3 text-gray-500 text-sm  mb-5'>
        Created at {new Date(post.createdAt).toDateString()}{' '}
      </p>

      <p className='pr-10 whitespace-break-spaces'>{post.content}</p>
    </div>
  )
}

export default Page
