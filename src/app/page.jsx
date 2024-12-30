import { getAllPosts } from '@/actions/post'
import Posts from '@/components/Posts'

const Home = async () => {
  const { posts } = await getAllPosts()

  return (
    <div>
      <Posts posts={posts} />
    </div>
  )
}

export default Home
