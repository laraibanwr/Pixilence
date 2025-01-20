import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const {generateImage} = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(input){
      const image = await generateImage(input);
      if(image){
        setIsImageLoaded(true)
        setImage(image)
        setInput("")
      }
      setLoading(false)
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <img src={image} alt="" className="max-w-sm rounded" />
        </div>
        {loading && <div className="loader mt-10"></div>}
      </div>

      {isImageLoaded ? (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      ) : (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-gray-300 text-base font-light"
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
