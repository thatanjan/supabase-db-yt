'use server'

import createClientForServer from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const getAllPosts = async (options = {}) => {
  const { onlyPublic = true, userID = '' } = options

  const supabase = await createClientForServer()

  let query = supabase
    .from('posts')
    // .select('id, title, content') // Select specific columns
    // .select('*, is_public:isPublic') // Rename column
    // .select('*') // Select all columns
    .select('*, user (id, name)') // Join users table

  // Fetching only public posts
  if (onlyPublic) {
    query = query.eq('isPublic', true)
  }

  // Fetching posts by user
  if (userID) {
    query = query.eq('user', userID)
  }

  // filters
  // query = query
  // .gt('totalLikes', 100).gt('totalComments', 30)
  // .lt('totalComments', 30)
  // .order('totalLikes', { ascending: false })

  // Fetching only private posts
  // query = query.neq('isPublic', true)

  const { data, error } = await query

  return {
    error: error?.message,
    posts: data,
  }
}

const getSinglePost = async id => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase
    .from('posts')
    .select('*, user (id, name)')
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
    // .insert([payload, payload, payload]) // Insert multiple rows
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

const updatePost = async (prev, formData) => {
  const { postID } = prev

  const supabase = await createClientForServer()

  const formFields = {
    title: formData.get('title'),
    content: formData.get('content'),
    isPublic: formData.get('isPublic') === 'on',
  }

  const { data, error } = await supabase
    .from('posts')
    .update(formFields)
    .eq('id', postID)

  if (error) {
    return {
      error: error.message,
      formFields,
      postID,
    }
  }

  return {
    postID,
    formFields,
    success: 'Post updated successfully',
    error: '',
  }
}

const deletePost = async (prev, formData) => {
  const { postID } = prev

  const supabase = await createClientForServer()

  const { error } = await supabase.from('posts').delete().eq('id', postID)

  if (error) {
    return {
      error: error.message,
      postID,
    }
  }

  redirect('/')
}

export { createPost, getAllPosts, getSinglePost, updatePost, deletePost }
