import { assets } from '../assets/assets'

export default function Footer() {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo} width={150} alt="" />
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden mt-2'>Copyright @Laraib_Anwar | All rights reserved.</p>
      <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="" width={35}/>
        <img src={assets.twitter_icon} alt="" width={35}/>
        <img src={assets.instagram_icon} alt="" width={35}/>
      </div>
    </div>
  )
}