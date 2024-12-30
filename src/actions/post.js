'use server'

import createClientForServer from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

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

  console.log(data, error)

  if (error) {
    return {
      error: error.message,
      formFields,
    }
  }

  redirect(`/post/${data.id}`)
}

export { createPost }
