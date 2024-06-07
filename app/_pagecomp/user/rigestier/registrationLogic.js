export const successMessage = name => `مرحبا  ${name} `
export const htmlmsg = (name, email) => `
    <div class="space-y-2 flex flex-col items-start justify-start">
      <ul class="list-none flex flex-col items-start justify-start gap-1">
        <li class="flex items-start justify-start gap-2">
          <div class="mr-3 size-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p class="text-base font-medium text-gray-900">${name} حسابك جاهز تقريبا .. متبقي تفعيل الحساب</p>
        </li>
        <li class="flex items-start justify-start gap-2">
          <div class="mr-3 size-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p class="text-sm text-gray-500">سيتم توجيهك لصفحة الدخول</p>
        </li>
        <li class="flex items-start justify-start gap-2">
          <div class="mr-3 size-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-sm text-gray-500">بعد التسجيل، توجة إلى صفحتك لتفعيل حسابك</p>
        </li>
        <li class="flex items-start justify-start gap-2">
          <div class="mr-3 size-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-sm text-gray-500">سيتم إرسال رمز التفعيل عبر البريد الإلكتروني <b class="font-medium text-gray-900">${email}</b></p>
        </li>
        <li class="flex items-start justify-start gap-2">
          <div class="mr-3 size-6 bg-gray-200 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-sm text-gray-500">ادخل رمز التفعيل المرسل لك</p>
        </li>
       <li class="flex items-start justify-start gap-2">
          <p class="text-sm text-gray-500">استمتع معنا وننتظر ملاحطاتك لتطوير الخدمة على البريد الإلكتروني <a href="mailto:spscale@areco.com" class="font-medium text-gray-900">spscale@areco.com</a></p>
        </li>
      </ul>
    </div>
    `

export const errorMessages = {
  400: 'البريد الإلكتروني مستخدم مسبقا',
  500: 'فشل في تسجيل الحساب'
}
