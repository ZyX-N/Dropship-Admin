import React, { useContext, useState } from 'react'
import { MdDeleteForever, MdEditSquare, MdOutlinePreview } from 'react-icons/md'
import { ManageCategoryContext } from './ManageCategory'
import { FaCaretLeft, FaCaretRight, FaCheckSquare } from 'react-icons/fa'
import { FaSquareXmark } from "react-icons/fa6";
import { input } from '@material-tailwind/react';
import { BsFillXSquareFill } from 'react-icons/bs';


const ListCategory = () => {
    const { inputArray, setInputArray } = useContext(ManageCategoryContext)

    const [page, setPage] = useState(1)

    const PageHandler = (selectPage) => {
        if (selectPage >= 1 && selectPage <= (Math.ceil(inputArray.length / 6)) && selectPage !== page)
            setPage(selectPage)
    }

    const [editIndex, setEditIndex] = useState(null)
    const [editData, setEditData] = useState({ title: "", slug: "" })

    const editHandler = (index) => {
        console.log('first', index)
        setEditIndex(index)
        setEditData({ title: inputArray[index].title, slug: inputArray[index].slug })

    }

    const eChangeHandler = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value })
    }

    const saveHandler =()=>{
        const updateData = inputArray.map((item,index)=>(
            index === editIndex ? {...item,...editData}  : item 
        ))
        setInputArray(updateData)
        setEditIndex(null)
        setEditData({title:"",slug:""})
    }

    const deleteHandler = (index) => {
        setInputArray(pre => pre.filter((_, i) => i != index))
    }
    return (
        <main className='px-2 h-[calc(100vh-12vh)] overflow-y-auto my-3 w-full relative '>
            <h1 className='font-bold mt-3 text-2xl capitalize'> List Category</h1>
            <table className='w-full  h-fit   mt-5 '>
                <thead>
                    <tr className='border-gray-900 text-lg w-full border-y-2   h-10 text-left  '>
                        <th className='py-2 pl-2 '>S.N</th>
                        <th className='py-2 pl-2 '>Title</th>
                        <th className='py-2 pl-2 '>Slug</th>
                        <th className='py-2 pl-2 '> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {inputArray.slice(page * 6 - 6, page * 6).map(({ slug, title }, index) => {
                        return (
                            <tr key={index} className='wpl-2  -full py-3 border-b border-gray-700 h-5 '>
                                <td className="border-r pl-2  py-1 border-gray-700"  >{index + 1}  </td>
                                <td className="border-r pl-2  py-1 border-gray-700"  >
                                    {editIndex === index ? (
                                        <input
                                            type='text'
                                            name='title'
                                            value={editIndex.title}
                                            className='border p-1'
                                            onChange={eChangeHandler}
                                        />
                                    )
                                        : (title)
                                    }
                                </td>
                                <td className="border-r pl-2  py-1  border-gray-700"  >
                                    { editIndex ===index ? (
                                        <input 
                                        type="text"
                                        name='slug'
                                        value={editIndex.slug}
                                        className='border p-1'
                                        onChange={eChangeHandler}
                                        />
                                    )
                                :    slug
                                }
                                </td>
                                <td className="py-1  pl-2 flex gap-5 items-center  "  >
                                    {editIndex === index ? (
                                        <>
                                                <button className='p-1 ' onClick={saveHandler}> <FaCheckSquare  className='text-blue-800 size-5 '/> </button>
                                                <button className='p-1 ' onClick={()=>setEditIndex(null) }>  <BsFillXSquareFill className='text-red-800 size-5 '/> </button>
                                        </>
                                    ) :
                                        (<>
                                            <button onClick={() => editHandler(index)} className='p-1 '><MdEditSquare className='text-green-800 size-6 ' /></button>
                                            <button className='p-1'><MdOutlinePreview className='text-blue-800 size-6 ' /></button>
                                            <button onClick={() => deleteHandler(index)} className='p-1 '><MdDeleteForever className='text-red-800 size-7 ' /></button>
                                        </>
                                        )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='Pagination absolute right-2 bottom-20 mt-3  py-auto flex items-center   justify-end w-full '>
                {inputArray.length > 6 && <div className='flex items-center ' >
                    <span className='cursor-pointer   flex items-center justify-center px-2 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-200 hover:text-gray-700' onClick={() => PageHandler(page - 1)} > <FaCaretLeft /> </span>
                    {[...Array(Math.ceil(inputArray.length / 6))].map((_, i) => {
                        return (
                            <div>
                                <span onClick={() => { PageHandler(i + 1) }} className={`${page === 1 + i ? "border text-blue-900 bg-blue-100 rounded-md border-black font-bold " : ""}cursor-pointer  select-none flex items-center justify-center px-2 h-8 leading-tight border  hover:bg-gray-300 `}  > {i + 1}</span>
                            </div>
                        )
                    })}
                    <span className='cursor-pointer  flex items-center justify-center px-2 ms-0 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-200 hover:text-gray-700 ' onClick={() => PageHandler(page + 1)} ><FaCaretRight /> </span>
                </div>}
            </div>
        </main >
    )
}

export default ListCategory