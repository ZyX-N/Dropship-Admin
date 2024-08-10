import React, { useState } from 'react';
import Search from "../../Components/search/Search";
import Pagination from '../../Components/pagination/Pagination';

const Dashboard = () => {
    const ProductDetails = [
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

    return (
        <section className='h-[calc(100vh-12vh)] w-full  overflow-y-auto my-1 '>
            <h1 className='text-2xl font-semibold capitalize'>DASHBOARD</h1>
            <main className='w-full h-full  gap-4 flex flex-col my-5 '>
                <section className='flex gap-2 col w-full h-fit  '>
                    <div className='w-1/3 h-12 bg-white shadow-lg flex items-center justify-between rounded-md   px-2 '>
                        <div className='flex flex-col  font-semibold text-sm '>
                            <h5 >Total user</h5>
                            <h4>15</h4>
                        </div>
                        <button className='bg-green-500 w-8 h-8  rounded-md text-white  '>1</button>
                    </div>
                    <div className='w-1/3 h-12 bg-white flex items-center justify-between rounded-md   px-2 shadow-lg'>
                        <div className='flex flex-col  font-semibold text-sm '>
                            <h5 >Total Orders </h5>
                            <h4>10</h4>
                        </div>
                        <button className='bg-green-500 w-8 h-8  rounded-md text-white  '>1</button>
                    </div>
                    <div className='w-1/3 h-12 shadow-lg bg-white flex items-center justify-between rounded-md   px-2 '>
                        <div className='flex flex-col  font-semibold text-sm '>
                            <h5 >Total sales</h5>
                            <h4>5</h4>
                        </div>
                        <button className='bg-green-500 w-8 h-8  rounded-md text-white  '>1</button>
                    </div>
                </section>
                <section className='flex w-full h-[70vh]  gap-3 items-center justify-between'>
                    <div className='w-[45%] h-[100%]  flex shadow-lg flex-col gap-2   rounded-lg  relative  p-2 '>
                        <h1 className='text-sm font-bold ' >Recent Product List</h1>
                        <div className='btn_cvs flex  items-center justify-between w-full    mt-2 '>
                            <button type='button' className='border-2 border-black py-auto md:py-auto  md:px-2 rounded-md text-[10px] leading-none font-bold md:font-semibold w-[10%] md:w-fit  md:text-[10px] h-6  md:h-8 cursor-pointer hover:bg-gray-900 hover:text-white' > Export to csv </button>
                            {/* <div className='w-[50%]'> */}
                            <Search/>
                            {/* </div> */}
                        </div>
                        <div className='flex flex-col justify-between h-[43vh]  ' >
                            <table className='w-full  mt-2   rounded-md' >
                                <tr className='w-full bg-gray-300  top-0 text-left h-10 '>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                </tr>
                                {ProductDetails.slice(page1 * 2 - 2, page1 * 2).map(({ Product_Name, Price }) => {
                                    return <tr className='w-full  border-b  border-black bg-gray-100 h-8'>
                                        <td>{Product_Name}</td>
                                        <td>{Price}</td>
                                    </tr>
                                })}
                            </table>
                            <Pagination page={page1} setPage={setPage1} DataList={ProductDetails} />

                        </div>
                    </div>
                    <div className='w-[55%] h-[100%]  flex shadow-lg flex-col gap-2  bg-white rounded-lg  p-2'>
                        <h1 className='text-sm font-bold ' >Recent Product List</h1>
                        <div className='btn_cvs flex  items-center justify-between w-full  mt-2'>
                            <button type='button' className='border-2 border-black py-auto md:py-auto  md:px-2 rounded-md text-[10px] leading-none font-bold md:font-semibold w-[30%] md:w-fit  md:text-[10px] h-6  md:h-8 cursor-pointer hover:bg-gray-900 hover:text-white' > Export to csv </button>
                            <Search />
                        </div>
                        <div className='flex flex-col justify-between h-[43vh]  ' >
                            <table className='w-full mt-2  rounded-md' >
                                <tr className='w-full font-capitalize bg-gray-300 text-left h-10 '>
                                    <th>Name</th>
                                    <th>Product</th>
                                    <th>Revenue</th>
                                    <th>Status</th>
                                </tr>
                                {ProductDetails.slice(page2 * 2 - 2, page2 * 2).map(({ Name, Product, Revenue, Status }) => {
                                    return <tr className='w-full  border-b  border-black bg-gray-100 h-8  '>
                                        <td>{Name}</td>
                                        <td>{Product}</td>
                                        <td>{Revenue}</td>
                                        <td>{Status}</td>
                                    </tr>
                                })}
                            </table>
                            <Pagination page={page2} setPage={setPage2} DataList={ProductDetails} />

                        </div>
                    </div>
                </section>
                <section className='flex w-full h-[70vh]  items-center '>
                    <div className='w-full h-[100%]  flex shadow-lg flex-col gap-2  bg-white rounded-lg  p-2'>
                        <h1 className='text-sm font-bold ' >Recent Product List</h1>
                        <div className='btn_cvs flex  items-center justify-between w-full  mt-2'>
                            <button type='button' className='border-2 border-black py-auto md:py-auto  md:px-2 rounded-md text-[10px] leading-none font-bold md:font-semibold w-[30%] md:w-fit  md:text-[12px] h-6  md:h-8 cursor-pointer hover:bg-gray-900 hover:text-white' > Export to csv </button>
                            <Search />
                        </div>
                        <div className='flex flex-col justify-between h-[43vh]  ' >
                            <table className='w-full  mt-2  rounded-md' >
                                <tr className='w-full font-capitalize bg-gray-300 text-left h-10 '>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Revenue</th>
                                    <th>Rating</th>
                                    <th>Status</th>
                                </tr>
                                {ProductDetails.slice(page3 * 2 - 2, page3 * 2).map(({ Product_Name, Price, Revenue, Rating, Status, id }) => {
                                    return <tr key={id} className='w-full  border-b  border-black bg-gray-200 h-8  '>
                                        <td>{Product_Name}</td>
                                        <td>{Price}</td>
                                        <td>{Revenue}</td>
                                        <td>{Rating}</td>
                                        <td>{Status}</td>
                                    </tr>
                                })}

                            </table>
                            <Pagination page={page3} setPage={setPage3} DataList={ProductDetails} />

                        </div>
                    </div>
                </section>
            </main >
        </section >
    );
}

export default Dashboard;