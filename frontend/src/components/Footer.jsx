import { Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <div id='footer' className="bg-slate-800 text-white pt-8 pb-2 flex flex-col items-center justify-center">
      <div className="flex items-center w-full px-8 gap-10">
        <div className="flex flex-col items-center justify-center">
          <div className='p-0 m-0'><img src="src/assets/logo.png" alt="EcoBud" className="h-18 w-auto" /></div>
          <p className="text-sm opacity-80">Recycle Today to Save Tomorrow.</p>
        </div>
        <div className="flex items-start justify-evenly flex-1 min-w-0 ">
          <div className="flex flex-col items-start justify-center gap-2">
            <h4 className="font-semibold text-xl text-lime-400 mb-1">Quick Links</h4>
            <a href="" >Home</a>
            <a href="" >Our Mission</a>
            <a href="" >Start Learning</a>
            <a href="" >Contribute</a>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 w-50">
            <h4 className="font-semibold text-xl text-lime-400 mb-1">Contact & Support</h4>
            <a href="" >ecobud@gmail.com</a>
            <a href="" >+91 12345678</a>
            <a href="" >221B Baker Street, Westminster County, London, England</a>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 w-50">
            <h4 className="font-semibold text-xl text-lime-400 mb-1">Our Socials</h4>
            <div>
              <span className='flex flex-col w-full h-full justify-evenly text-left gap-3'>
                <a href="" >
                  <span className='flex gap-3'>
                    <Instagram></Instagram>
                    <p>ecobud.25</p>
                  </span>
                </a>
                <a href="">
                  <span className='flex gap-3'>
                    <Facebook></Facebook>
                    <p>EcoBud</p>
                  </span>
                </a>
              <a href="">
                <span className='flex gap-3'>
                  <Youtube></Youtube>
                  <p>EcoBud</p>
                </span>
              </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full p-0 mt-4 mb-2 border-emerald-400" />
      <span className='flex gap-1'>
        <p className="text-xs p-0 m-0">©</p>
        <p className="text-xs p-0 m-0">2025</p>
        <span className='flex'>
          <p className="text-xs p-0 m-0 font-semibold text-emerald-800">Eco</p>
          <p className="text-xs p-0 m-0 font-semibold text-lime-400">Bud</p>
        </span>
      </span>
    </div>
  );
}
