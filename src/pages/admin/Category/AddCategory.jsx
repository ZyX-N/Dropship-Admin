import React, { useContext, useState } from 'react'
import { nanoid } from "nanoid"
import { ManageCategoryContext } from './ManageCategory'

const AddCategory = () => {
  const { inputArray, setInputArray } = useContext(ManageCategoryContext);

  const [inputData, setInputData] = useState({ slug: "", title: "", img: null })
  const inputChangeHandler = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })

  }

  const submitFormHandler = (e) => {
    e.preventDefault();
    const newInputArray = {
      id: nanoid(),
      title: inputData.title,
      slug: inputData.slug
    };
    const newInputArrays = [...inputArray, newInputArray];
    setInputArray(newInputArrays);
    console.log('inputData', inputData);
    console.log('newInputArrays', newInputArrays);
    setInputData({ slug: "", title: "" });
  };

  const focusHandler = (e) => {
    let parentElement = e.target.parentElement;
    parentElement.classList.remove("after:w-0");
    parentElement.classList.add("after:w-full");
  };

  const blurHandler = (e) => {
    let parentElement = e.target.parentElement;
    parentElement.classList.remove("after:w-full");
    parentElement.classList.add("after:w-0");
  };


  //?  checkBox 
  const [manuallySlug, setManuallySlug] = useState(false)


  //? Image input 
  const fileHandler = (e) => {
    console.log('e.target.files', e.target.files)
    console.log(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0]
    setInputData((prev) => ({ ...prev, img: file }))
  }


  return (

    <section className='px-2 h-[calc(100vh-12vh)] overflow-y-auto my-3 w-full '>
      <div>
        <h1 className='font-bold mt-3 text-2xl capitalize'>Add Category</h1>
      </div>
      <div className="h-[90%] w-full flex flex-col items-start justify-start text-black   rounded-xl">
        <form onSubmit={submitFormHandler} className=" w-full flex flex-col gap-16 md:gap-5 mt-5 ">
          <div className=" flex  flex-col md:flex-row w-full gap-5  items-center ">
            <div className="w-full  md:w-1/2   ">
              <label className=" px-2 font-semibold text-xl text-gray-900 ">Title </label>
              <input value={inputData.title} name="title" onChange={inputChangeHandler} type="text" className="block w-full px-4 py-2 md:mt-2 text-base placeholder-gray-400  border-gray-300  bg-transparent outline-none p-2 border-b-2 rounded-md  focus:border-black" onFocus={focusHandler} onBlur={blurHandler} placeholder="Enter Category List " />
            </div>
            <div className=" w-full md:w-1/2  md:gap-5   relative ">
              <label className=" px-2 font-semibold text-xl text-gray-900 "> Image </label>
              <label htmlFor='img' className=' px-3 py-1.5 absolute left-0 md:top-10 top-11 border-black border-r rounded-l-lg bg-blue-gray-50 hover:bg-blue-gray-100 '> Upload</label>
              <input
                type="text"
                className=" size-full  truncate w-full px-4 md:py-2  md:mt-2 text-base placeholder-gray-400  border-gray-300  bg-transparent outline-none  border-b-2 rounded-md  focus:border-black "
                value={inputData.img?.name || ""}
                disabled={true}
              />

              <input
                id='img'
                type="file"
                className="hidden"
                onChange={fileHandler}
                multiple={false}
              />
            </div>
          </div>
          <div className=" flex  w-full gap-5 items-center flex-col md:flex-row ">
            <div className='w-full md:w-1/2 '>
              <label htmlFor='slug' className=" px-2 font-semibold text-xl text-gray-900 "> Slug </label>
              <input value={inputData.slug} name="slug" onChange={inputChangeHandler} type="text" className={`block w-full px-4   md:py-2 md:mt-2 text-base placeholder-gray-400  border-gray-300  bg-transparent outline-none md:p-2 border-b-2 rounded-md  focus:border-black " onFocus={focusHandler} onBlur={blurHandler} placeholder="Enter Category Slug   ${manuallySlug ? null : "cursor-not-allowed"}`} disabled={manuallySlug ? false : true} />
            </div>
            <div className='w-full md:w-1/2   md:pt-10 '>
              <label className=' text-lg font-semibold mr-5'>Enter Slug Manually</label>
              <input onClick={() => setManuallySlug(!manuallySlug)} type="checkbox" name="slug" id="slug" className='bg-black' />
            </div>
          </div>

          <button className="inline-block md:mt-5 w-40  px-4 md:py-2 text-xl font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-500 ease">Submit</button>
          {inputData.img && (
            <div>
              <img
                src={inputData.img ? URL.createObjectURL(inputData.img) : ""}
                alt="xxyyzz"
                className="size-72 object-cover"
              />

            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default AddCategory;