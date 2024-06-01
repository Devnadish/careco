'use client'
import { Avatar } from '@/components/shared/Avatar'
import Submit from '@/components/shared/Submit'
import { Input } from '@/components/ui/input'
import { addDepartmentComment, addserviceComment } from './commentDb'

function AddComment({
  session,
  providerid,
  departmentid,
  serviceid,
  poviderSlug,
  departmentSlug,
  type = 'department'
}) {
  const addCommentMsg = async formData => {
    const comment = formData.get('comment')
    const userid = session.user.id

    if (!comment) return
    let data
    if (type === 'department') {
      data = { comment, userid, providerid, departmentid }
      await addDepartmentComment(data, poviderSlug, departmentSlug)
    } else data = { comment, userid, providerid, serviceid }
    await addserviceComment(data, poviderSlug, departmentSlug)
  }

  return (
    <form
      action={addCommentMsg}
      className='flex w-full  items-center justify-center gap-2'
    >
      <Avatar
        src={session.user.image}
        alt={session.user.name}
        fallBack={session.user.name}
        size={7}
      />
      <Input name='comment' placeholder='اضافة تعليق' />
      <Submit title='' />
    </form>
  )
}

export default AddComment
