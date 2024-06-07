export const code200msg =
  'مرحبا بك تم انشاء الحاب الخاص بك  نامل  تزويدنا برمز التفعيل لنتمكن من تنشيظ الحساب  تم ارسال الرمز علي البريد الالكتروني'

// Verivation Mail data

export const sender = 'صديق السيارة  <test@devnadish.com>'
// export const sender = 'صديق السيارة  <onboarding@resend.dev>'

export const htmlMsg = (VerifiedToken, name) => `
        <h1>رقم تفعيل حسابك لمنصة صديق السيارة</h1>
        <p>مرحبا  ${name},</p>
       <p>مرحبًا بك في كار فريند! لتفعيل حسابك والبدء باستخدام خدماتنا، يرجى إدخال رمز التفعيل التالي:</p>
        <div style="background-color: #009933; padding: 10px; border: 1px solid #ddd; display: inline-block; font-size: 24px; font-weight: bold; color: white">
          ${VerifiedToken}
        </div>
        <p>If you cannot use the code for some reason, please contact us at [Support Email Address] for assistance.</p>
        <p>Thanks,</p>
        <p>The CarFriend Team</p>
      `
