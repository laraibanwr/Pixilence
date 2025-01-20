import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function GenerateBtn() {

  const navigate = useNavigate();
  const { user, setShowLogin } = useContext(AppContext);

  function onClickHandler() {
    if (user) {
      window.scrollTo(0, 0);
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  }

  return (
    <motion.div
    initial={{ opacity:0.2, y:100 }}
    transition={{ duration:1 }}
    whileInView={{ opacity:1, y:0 }}
    viewport={{ once:true }}
    className='pb-16 text-center flex flex-col items-center'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6md
      py-6'>See the magic. Try now</h1>
      <button className='sm:text-lg text-white bg-black w-auto mt-2 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-300' onClick={onClickHandler}>Generate Image
      <img className='h-6' src={assets.star_group} alt="" />
      </button>
    </motion.div>
  )
}
