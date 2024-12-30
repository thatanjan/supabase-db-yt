'use server'

import createClientForServer from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const getAllPosts = async () => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase
    .from('posts')
    // .select('id, title, content')
    .select('*')
  // .select('*, is_public:isPublic')

  return {
    error: error?.message,
    posts: data,
  }
}

const getSinglePost = async id => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  return {
    error: error?.message,
    post: data,
  }
}

const createPost = async (prev, formData) => {
  const supabase = await createClientForServer()

  const formFields = {
    title: formData.get('title'),
    content: formData.get('content'),
    isPublic: formData.get('isPublic') === 'on',
  }

  const payload = {
    ...formFields,
  }

  const { data, error } = await supabase
    .from('posts')
    .insert(payload)
    // .insert([payload, payload, payload])
    .select()
    .single()

  if (error) {
    return {
      error: error.message,
      formFields,
    }
  }

  redirect(`/post/${data.id}`)
}

export { createPost, getAllPosts, getSinglePost }
