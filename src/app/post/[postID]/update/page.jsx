import { getSinglePost } from '@/actions/post'
import Link from 'next/link'
import UpdatePostForm from '@/components/UpdatePostForm'

const Page = async ({ params }) => {
  const { postID } = await params

  const { post } = await getSinglePost(postID)

  return (
    <div>
      <Link className='btn btn-ghost' href={`/post/${postID}`}>
        {'<-'} Go back to post
      </Link>

      <UpdatePostForm post={post} />
    </div>
  )
}

export default Page
