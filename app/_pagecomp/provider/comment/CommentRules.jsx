'use client'
import DialogBox from '@/components/shared/DialogBox'
import Text from '@/components/shared/Text'
import { ReadIt } from '@/components/svg/ReadIt'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'

function CommentRules() {
  const [open, setOpen] = useState(false)
  return (
    <div className='flex w-full items-baseline justify-end gap-2'>
      <Text className='text-xs text-gray-400'>
        ارشادات التعليق يجب الاطلاع والموافقة للتعليق{' '}
      </Text>
      <Button variant='outline' onClick={() => setOpen(true)}>
        <ReadIt className='size-7  ' />
      </Button>
      <DialogBox open={open} setOpen={setOpen}>
        <Legal />
      </DialogBox>
    </div>
  )
}

export default CommentRules
const Legal = () => {
  return (
    // FIXME: use a modal small size hard to read
    <ScrollArea className='h-[40vh] w-full' dir='rtl'>
      <Text className='flex max-h-[80vh]   flex-col  rounded-md px-5 py-3 shadow-lg '>
        <h2 className='text-lg font-semibold text-gray-400'>ارشادات التعليق</h2>
        <p className='mt-3 text-sm text-gray-400'>
          في سعينا لخلق بيئة تفاعلية وإيجابية حول خدمتنا، نضع لكم هذه الإرشادات
          لضمان تعليقات محترمة وذات قيمة
        </p>
        <ol className='mt-5 list-inside list-decimal text-sm text-gray-400'>
          <li className='mt-2'>
            التعليقات البناءة: شاركنا برأيك حول تجربتك مع الخدمة، وكيف يمكننا
            تحسينها
          </li>
          <li className='mt-2'>
            التعليقات الهادفة: اطرح الأسئلة حول الخدمة أو الميزات لمساعدة
            الآخرين
          </li>
          <li className='mt-2'>
            التعليقات الإيجابية: شجع الآخرين على تجربة الخدمة وشارك بقصص نجاحك
          </li>
          <li className='mt-2'>
            التعليقات الداعمة: ساعد الآخرين بإجابات مفيدة على أسئلتهم المتعلقة
            بالخدمة
          </li>
        </ol>
        <p className='mt-5 text-sm text-gray-400'>
          التعليقات التي سيتم إزالتها:
        </p>
        <ul className='mt-2 list-inside list-disc text-sm text-gray-400'>
          <li className='mt-2'>
            التعليقات المسيئة: لا تقم بالإساءة إلى الآخرين أو استخدام ألفاظ
            نابية
          </li>
          <li className='mt-2'>
            التعليقات المسيئة للعرق أو الدين أو الجنس: احترم جميع المستخدمين بغض
            النظر عن خلفياتهم
          </li>
          <li className='mt-2'>
            التعليقات غير ذات الصلة: تجنب نشر تعليقات خارج نطاق الخدمة أو مواضيع
            غير مرتبطة
          </li>
          <li className='mt-2'>
            التعليقات الترويجية: لا تستخدم التعليقات للإعلان عن خدمات أو منتجات
            أخرى
          </li>
          <li className='mt-2'>
            التعليقات المزيفة: لا تنشر معلومات خاطئة أو مضللة
          </li>
          <li className='mt-2'>
            التعليقات المكررة: تجنب تكرار التعليقات المتشابهة
          </li>
          <li className='mt-2'>
            التخويف والتهديد: لا تهدد الآخرين أو تستخدم التعليقات لإثارة الخوف
          </li>
          <li className='mt-2'>
            المعلومات الشخصية: لا تشارك بمعلومات شخصية لك أو للآخرين
          </li>
        </ul>
        <p className='mt-5 text-sm text-gray-400'>
          نحتفظ بالحق في إزالة أي تعليق ينتهك هذه الإرشادات، أو قد يؤثر سلبًا
          على تجربة المستخدمين الآخرين
        </p>
        <p className='mt-5 text-sm text-gray-400'>
          للحصول على أفضل تجربة: اقرأ إرشادات التعليق بعناية قبل نشر تعليق جديد
        </p>
        <p className='mt-5 text-sm text-gray-400'>
          احترم آراء المستخدمين الآخرين حتى لو اختلفت معهم
        </p>
        <p className='mt-5 text-sm text-gray-400'>
          ركز على تقديم تعليقات مفيدة وإيجابية
        </p>
        <p className='mt-5 text-sm text-gray-400'>
          إذا وجدت تعليقًا ينتهك إرشادات التعليق، يمكنك الإبلاغ عنه باستخدام زر
          الإبلاغ
        </p>
      </Text>
      /{' '}
    </ScrollArea>
  )
}
