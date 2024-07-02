import React, { useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

const Dashboard = () => {
    const ProductDetails = [

        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        }, 

        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        }, 

        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        }, {
            Name: "name",
            Product: "Product",
            Product_Name: "AC1",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        },
        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC2",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        },
      
        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC14",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        },
        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC15",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        },
        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC16",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        },
        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC17",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        },
        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC18",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        },
        {
            Name: "name",
            Product: "Product",
            Product_Name: "AC19",
            Price: "50000",
            Revenue: "55",
            Status: "pending",
            Rating: "5 star"
        },

    
    ]

    const [page1, setPage1] = useState(1)
    const [page2, setPage2] = useState(1)
    const [page3, setPage3] = useState(1)
    
    const selectedHandler1 = (selectedPage1) => {
        if (selectedPage1 >= 1 && selectedPage1 <= Math.ceil(ProductDetails.length / 5) && selectedPage1 !==page1 ) 
        setPage1(selectedPage1)
    }
    const selectedHandler2 = (selectedPage2) => {
        if (selectedPage2 >= 1 && selectedPage2 <= Math.ceil(ProductDetails.length / 5) && selectedPage2 !==page2 ) 
            setPage2(selectedPage2)
    }
    const selectedHandler3 = (selectedPage3) => {
        if (selectedPage3 >= 1 && selectedPage3 <= Math.ceil(ProductDetails.length / 5) && selectedPage3 !==page3 ) 
            setPage3(selectedPage3)
    }

    return (
        <section className='h-[calc(100vh-12vh)] w-full  overflow-y-auto my-3 '>
            <h1 className='font-bold mt-3 text-2xl capitalize'>DASHBOARD</h1>
            <main className='w-full h-full  gap-4 flex flex-col my-5 '>
                <section className='flex gap-2 col w-full h-fit  '>
                    <div className='w-1/3 h-10 bg-white shadow-lg flex items-center justify-between rounded-md   px-2 '>
                        <div className='flex flex-col  font-semibold text-sm '>
                            <h5 >Total user</h5>
                            <h4>15</h4>
                        </div>
                        <button className='bg-green-500 w-8 h-8  rounded-md text-white  '>1</button>
                    </div>
                    <div className='w-1/3 h-10 bg-white flex items-center justify-between rounded-md   px-2 shadow-lg'>
                        <div className='flex flex-col  font-semibold text-sm '>
                            <h5 >Total Orders </h5>
                            <h4>10</h4>
                        </div>
                        <button className='bg-green-500 w-8 h-8  rounded-md text-white  '>1</button>
                    </div>
                    <div className='w-1/3 h-10 shadow-lg bg-white flex items-center justify-between rounded-md   px-2 '>
                        <div className='flex flex-col  font-semibold text-sm '>
                            <h5 >Total sales</h5>
                            <h4>5</h4>
                        </div>
                        <button className='bg-green-500 w-8 h-8  rounded-md text-white  '>1</button>
                    </div>
                </section>
                <section className='flex w-full h-[60vh] gap-3 items-center justify-between'>
                <div className='w-[45%] h-[100%]  flex shadow-lg flex-col gap-2  bg-white rounded-lg  relative  p-2'>
                        <h1 className='text-sm font-bold ' >Recent Product List</h1>
                        <div className='btn_cvs flex  items-center justify-between w-full  mt-2'>
                            <button type='button' className='border-2 border-black py-auto md:py-auto  md:px-2 rounded-md text-[10px] leading-none font-bold md:font-semibold w-[30%] md:w-fit  md:text-sm h-6  md:h-8 cursor-pointer hover:bg-gray-900 hover:text-white' > Export to csv </button>
                            <input type="search" className='border w-[50%] border-black  rounded-md px-2 md:py-1 text-base ' placeholder='search' />
                        </div>
                        <table className='w-full h-[80%] mt-2 mb-10   rounded-md' >
                            <tr className='w-full bg-gray-300  top-0 text-left h-10 '>
                                <th>Product Name</th>
                                <th>Price</th>
                            </tr>
                            {ProductDetails.slice(page1 * 5 - 5, page1 * 5).map(({ Product_Name, Price }) => {
                                return <tr className='w-full  border-b  border-black bg-gray-100 h-8'>
                                    <td>{Product_Name}</td>
                                    <td>{Price}</td>
                                </tr>
                            })}
                        </table>
                        <div className='Pagination px-2 py-auto flex items-center  absolute bottom-2 right-2 justify-end '>
                            <span className='cursor-pointer   flex items-center justify-center px-2 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-200 hover:text-gray-700' onClick={() => selectedHandler1(page1 - 1)}> <FaCaretLeft /> </span>
                            {ProductDetails.length > 0 && <div className='flex items-center '>
                                {[...Array(Math.ceil(ProductDetails.length / 5))].map((_, i) => {
                                    return <span key={i} onClick={() => selectedHandler1(i + 1)} className={`${page1 === 1 + i ? "border text-blue-900 bg-blue-100 rounded-md border-black font-bold " : ""}cursor-pointer  select-none flex items-center justify-center px-2 h-8 leading-tight border  hover:bg-gray-300 `}  > {i + 1}</span>
                                })}
                            </div>}
                            <span className='cursor-pointer  flex items-center justify-center px-2 ms-0 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-200 hover:text-gray-700 ' onClick={() => selectedHandler1(page1 + 1)}  ><FaCaretRight /> </span>
                        </div>
                    </div>
                    <div className='w-[55%] h-[100%]  flex shadow-lg flex-col gap-2  bg-white rounded-lg  p-2'>
                        <h1 className='text-sm font-bold ' >Recent Product List</h1>
                        <div className='btn_cvs flex  items-center justify-between w-full  mt-2'>
                            <button type='button' className='border-2 border-black py-auto md:py-auto  md:px-2 rounded-md text-[10px] leading-none font-bold md:font-semibold w-[30%] md:w-fit  md:text-sm h-6  md:h-8 cursor-pointer hover:bg-gray-900 hover:text-white' > Export to csv </button>
                            <input type="search" className='border w-[50%] border-black  rounded-md px-2 md:py-1 text-base ' placeholder='search' />
                        </div>
                        <table className='w-full h-fit mt-2  rounded-md' >
                            <tr className='w-full font-capitalize bg-gray-300 text-left h-10 '>
                                <th>Name</th>
                                <th>Product</th>
                                <th>Revenue</th>
                                <th>Status</th>
                            </tr>
                            {ProductDetails.slice(page2 * 5 - 5, page2 * 5).map(({ Name, Product, Revenue, Status }) => {
                                return <tr className='w-full  border-b  border-black bg-gray-100 h-8  '>
                                    <td>{Name}</td>
                                    <td>{Product}</td>
                                    <td>{Revenue}</td>
                                    <td>{Status}</td>
                                </tr>
                            })}
                        </table>
                        <div className='Pagination px-2 py-auto flex items-center   justify-end '>
                            <span className='cursor-pointer   flex items-center justify-center px-2 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-200 hover:text-gray-700' onClick={() => selectedHandler2(page2 - 1)}> <FaCaretLeft /> </span>
                            {ProductDetails.length > 0 && <div className='flex items-center '>
                                {[...Array(Math.ceil(ProductDetails.length / 5))].map((_, i) => {
                                    return <span key={i} onClick={() => selectedHandler2(i + 1)} className={`${page2 === 1 + i ? "border text-blue-900 bg-blue-100 rounded-md border-black font-bold " : ""}cursor-pointer  select-none flex items-center justify-center px-2 h-8 leading-tight border  hover:bg-gray-300 `}  > {i + 1}</span>
                                })}
                            </div>}
                            <span className='cursor-pointer  flex items-center justify-center px-2 ms-0 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-200 hover:text-gray-700 ' onClick={() => selectedHandler2(page2 + 1)}  ><FaCaretRight /> </span>
                        </div>
                    </div>

                </section>
                <section className='flex w-full h-[60vh] gap-2 items-center '>
                <div className='w-full h-[100%]  flex shadow-lg flex-col gap-2  bg-white rounded-lg  p-2'>
                        <h1 className='text-sm font-bold ' >Recent Product List</h1>
                        <div className='btn_cvs flex  items-center justify-between w-full  mt-2'>
                            <button type='button' className='border-2 border-black py-auto md:py-auto  md:px-2 rounded-md text-[10px] leading-none font-bold md:font-semibold w-[30%] md:w-fit  md:text-sm h-6  md:h-8 cursor-pointer hover:bg-gray-900 hover:text-white' > Export to csv </button>
                            <input type="search" className='border w-[50%] border-black  rounded-md px-2 md:py-1 text-base ' placeholder='search' />
                        </div>
                        <table className='w-full h-fit mt-2  rounded-md' >
                            <tr className='w-full font-capitalize bg-gray-300 text-left h-10 '>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Revenue</th>
                                <th>Rating</th>
                                <th>Status</th>
                            </tr>
                            {ProductDetails.slice(page3 * 5 - 5, page3 * 5).map(({ Product_Name, Price, Revenue, Rating, Status, id }) => {
                                return <tr key={id} className='w-full  border-b  border-black bg-gray-200 h-8  '>
                                    <td>{Product_Name}</td>
                                    <td>{Price}</td>
                                    <td>{Revenue}</td>
                                    <td>{Rating}</td>
                                    <td>{Status}</td>
                                </tr>
                            })}

                        </table>
                        <div className='Pagination px-2 py-auto flex items-center   justify-end '>
                            <span className='cursor-pointer   flex items-center justify-center px-2 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-200 hover:text-gray-700' onClick={() => selectedHandler3(page3 - 1)}> <FaCaretLeft /> </span>
                            {ProductDetails.length > 0 && <div className='flex items-center '>
                                {[...Array(Math.ceil(ProductDetails.length / 5))].map((_, i) => {
                                    return <span key={i} onClick={() => selectedHandler3(i + 1)} className={`${page3 === 1 + i ? "border text-blue-900 bg-blue-100 rounded-md border-black font-bold " : ""}cursor-pointer  select-none flex items-center justify-center px-2 h-8 leading-tight border  hover:bg-gray-300 `}  > {i + 1}</span>
                                })}
                            </div>}
                            <span className='cursor-pointer  flex items-center justify-center px-2 ms-0 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-200 hover:text-gray-700 ' onClick={() => selectedHandler3(page3 + 1)}  ><FaCaretRight /> </span>

                        </div>
                    </div>
                </section>


            </main>
        </section>
    );
}

export default Dashboard;