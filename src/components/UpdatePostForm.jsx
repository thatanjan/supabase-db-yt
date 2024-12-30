'use client'
import { updatePost, deletePost } from '@/actions/post'
import React, { useActionState } from 'react'

const UpdatePostForm = ({ post }) => {
  const initialState = {
    formFields: {
      title: post.title,
      content: post.content,
      isPublic: post.isPublic,
    },
    postID: post.id,
    error: '',
    success: '',
  }

  const [updateState, updatePostAction, isUpdatePending] = useActionState(
    updatePost,
    initialState,
  )

  const [deleteState, deletePostAction, isDeletePending] = useActionState(
    deletePost,
    {
      postID: post.id,
      error: '',
    },
  )

  const {
    formFields: { title, content, isPublic },
    error: updateError,
    success,
  } = updateState

  const { error: deleteError } = deleteState

  return (
    <div>
      <form action={updatePostAction}>
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
            placeholder='Bio'
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
            disabled={isUpdatePending}
          >
            {isUpdatePending && (
              <span className='loading loading-spinner loading-sm'></span>
            )}
            Update Post
          </button>

          <button
            type='submit'
            className='btn btn-block btn-error'
            disabled={isDeletePending}
            formAction={deletePostAction}
          >
            {isDeletePending && (
              <span className='loading loading-spinner loading-sm'></span>
            )}
            Delete Post
          </button>
        </div>
        <div className='mt-5'>
          {(updateError || deleteError) && (
            <div role='alert' className='alert alert-error'>
              <span>{updateError || deleteError}</span>
            </div>
          )}
          {success && (
            <div role='alert' className='alert alert-success'>
              <span>{success}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default UpdatePostForm
