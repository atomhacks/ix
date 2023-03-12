import Script from 'next/script'
import Link from 'next/link'

const Footer = () => {
  return (
    <div>
      <footer className="bg-neutral-900 text-center text-white dark:bg-neutral-900">
        <div className="flex flex-row pt-6 pb-6 text-neutral-200 font-montserrat">
          <div className="basis-1/4 m-auto">© 2023 AtomHacks · All rights reserved.</div>
          <div className="basis-2/4 m-auto">
            <Link href="/#" >
              <img src="/atom.png" className="h-18 w-16 md:h-50 md:w-50 m-auto opacity-40  hover:animate-pulse" />
            </Link>
          </div>
          <div className="basis-1/4 m-auto">
            <Link href="https://www.instagram.com/bxsciatomhacks/">
              <ion-icon name="logo-instagram" class="md hydrated text-3xl px-2 duration-300 hover:text-gray-500" />
            </Link>

            <Link href="https://github.com/atomhacks" >
              <ion-icon name="logo-github" class="md hydrated text-3xl px-2 duration-300 hover:text-gray-500" />
            </Link>

            <Link href="mailto: atomhacks@bxscience.edu" >
              <ion-icon name="mail-outline" class="md hydrated text-3xl px-2 duration-300 hover:text-gray-500" />
            </Link>
          </div>
        </div>
      </footer>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
    </div >
  )
}

export default Footer; 