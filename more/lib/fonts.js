import localFont from 'next/font/local'

const Noto = localFont({
  src: [
    {
      path: '../fonts/noto/noto.ttf'
      //   style: "normal",
    }
  ],
  variable: '--font-Noto'
})

const Tajwal = localFont({
  src: [
    {
      path: '../fonts/tajwal/tajawalregular.ttf'
      //   style: "normal",
    }
  ],
  variable: '--font-Tajwal'
})

const Cairo = localFont({
  src: [
    {
      path: '../fonts/cairo/cairofont.ttf'
      //   style: "normal",
    }
  ],
  variable: '--font-Cairo'
})

export { Tajwal, Cairo, Noto }
