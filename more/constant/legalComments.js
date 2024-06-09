import { Important } from '@/components/svg/Important'
import { Dot } from '@/more/lib/icons'

export const header = '  باستخدام المنصة فإنك توافق على الشروط والأحكام.'
export const footer = 'شكرًا لك  '

export const legalComment = [
  {
    id: 1,
    rule: 'يتحمل المعلقون المسؤولية الكاملة عن محتوى تعليقاتهم.',
    icon: <Important className='  rounded-full  border p-0.5' />
  },
  {
    id: 2,
    rule: 'نحتفظ بحق إزالة أي تعليقات تخالف سياستنا',
    icon: <Dot size={20} />
  },
  {
    id: 3,
    rule: 'لا نتحمل أي مسؤولية قانونية عن أي محتوى يخالف سياستنا',
    icon: <Dot size={20} />
  },
  {
    id: 4,
    rule: 'نحتفظ بحق تغيير هذه الشروط والأحكام في أي وقت دون إشعار مسبق.',
    icon: <Dot size={20} />
  },
  {
    id: 5,
    rule: 'باستخدام المنصة فإنك توافق على الشروط والأحكام.',
    icon: <Important className='  rounded-full  border p-0.5' />
  },
  {
    id: 6,
    rule: ' نثمن آراء عملائنا ونعتبرها مهمة جدًا لتحسين خدماتنا.',
    icon: <Dot size={20} />
  }
]
