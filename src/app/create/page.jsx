'use client'
import { createPost } from '@/actions/post'
import React, { useActionState } from 'react'

const Page = () => {
  const initialState = {
    error: '',
    formFields: {
      title: '',
      content: '',
      isPublic: true,
    },
  }

  const [state, formAction, isPending] = useActionState(
    createPost,
    initialState,
  )

  const {
    formFields: { title, content, isPublic },
  } = state

  return (
    <div>
      <h1 className='text-3xl my-4'>Create Post</h1>

      <form action={formAction}>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Title</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full'
            name='title'
            required
            defaultValue={title}
          />
        </label>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Content</span>
          </div>
          <textarea
            className='textarea textarea-bordered '
            placeholder='Content'
            rows={5}
            name='content'
            required
            defaultValue={content}
          ></textarea>
        </label>

        <label className='form-control w-full flex-row items-center'>
          <input
            type='checkbox'
            className='checkbox checkbox-md'
            name='isPublic'
            defaultChecked={isPublic}
          />
          <div className='label'>
            <span className='label-text'>Public</span>
          </div>
        </label>

        <div className='flex flex-wrap gap-2'>
          <button
            type='submit'
            className='btn btn-block btn-primary'
            disabled={isPending}
          >
            {isPending && (
              <span className='loading loading-spinner loading-sm'></span>
            )}
            Create Post
          </button>
        </div>
        <div className='mt-5'>
          {state.error && (
            <div role='alert' className='alert alert-error'>
              <span>{state.error}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Page
