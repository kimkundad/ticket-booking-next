import Link from 'next/link';
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="container">
    <nav className='d-flex justify-content-center'>
      <Link href="/">
        <div className="logo">
          <Image src="/logo_v1.png" alt="site logo" width={85} height={40} />
        </div>
      </Link>
    </nav>
    </div>
);
}
 
export default Navbar;
