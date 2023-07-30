import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const Navbar = () => {

  const [checkPaht, setcheckPaht] = useState('/Logo_new_v1.png');

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      let pathx = window.location.pathname;
      let searchTerm = 'plengneepeehainong';
      const indexOfFirst = pathx.indexOf(searchTerm);

      if(indexOfFirst > 0){
        setcheckPaht('/Logo_new_v1.png')
      }else{
        setcheckPaht('/mawa_logo.png')
      }
      console.log('indexOfFirst', indexOfFirst)
      }

  });
  

  return (
    <div className="container">
    <nav className='d-flex justify-content-center'>
      <Link href="/plengneepeehainong">
        <div className="logo">
          <Image src={checkPaht} alt="site logo" width={114} height={60} />
        </div>
      </Link>
    </nav>
    </div>
);
}
 
export default Navbar;
