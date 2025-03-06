import React from 'react'
// import Image from "next/image";
// import Button from './Button';

import ProfileMenu from './Profile';
import MegaMenu from './MegaMenu';
// import Logo from './Logo';



const Navbar = () => {
  return (
    <div className="w-screen h-18 bg-white shadow-xl flex justify-between items-center">
      <MegaMenu />
      <ProfileMenu />
    </div>
  );
};

export default Navbar;
