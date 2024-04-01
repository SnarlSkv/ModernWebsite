import { useState } from "react"
import { useLocation } from "react-router-dom" 
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

import Button from "./Button"
import { HamburgerMenu } from "./design/Header"

import { brainwave } from "../assets"
import MenuSvg from "../assets/svg/MenuSvg"
import { navigation } from "../constants"

const Header = () => {
  const pathName = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    if(openNav) {
      setOpenNav(false);
      enablePageScroll();
    } else {
      setOpenNav(true);
      disablePageScroll();
    }
  }

  const handleClick = () => {
    if(!openNav) return;

    enablePageScroll();
    setOpenNav(false);
  }

  return (
    <div className={`fixed w-full top-0 left-0 z-50 border-b border-n-6 lg:bg-n-8/90 lg:blackdrop-blur-sm
      ${openNav ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'}`}>
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="logo" />
        </a>

        <nav className={`${openNav ? 'flex' : 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}>
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 
                            ${item.onlyMobile ? 'lg:hidden' : ""} px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold
                            ${item.url === pathName.hash ? 'z-2 lg:text-n-1' : 'lg:text-n-1/50'} lg:leading-5 
                            lg:hover:text-n-1 xl:px-12`}
              key={item.id} href={item.url} onClick={handleClick}>
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <a href="#singup" className="button hidden mr-8 text-b-1/50 transition-colors hover:text-color-1 lg:block">
          New account
        </a>
        <Button className="hidden lg:flex" href="#login">
          Sing In
        </Button>

        <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNav}>
          <MenuSvg openNavigation={openNav} />
        </Button>
      </div>
    </div>
  )
}

export default Header