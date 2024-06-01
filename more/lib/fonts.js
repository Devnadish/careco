import localFont from "next/font/local";

const Tajwal = localFont({
  src: [
    {
      path: "../fonts/tajwal/tajawalregular.ttf",
      //   style: "normal",
    },
  ],
  variable: "--font-Tajwal",
});



const Cairo = localFont({
  src: [
    {
      path: "../fonts/cairo/cairofont.ttf",
      //   style: "normal",
    },
  ],
  variable: "--font-Cairo",
});


export { Tajwal, Cairo };
