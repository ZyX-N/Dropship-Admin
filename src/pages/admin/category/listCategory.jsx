import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';

const ListCategory = () => {
    return (
        <section className='flex flex-col gap-4'>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold capitalize">list category</h1>
            </div>

            <div className='w-full pt-4'>

                {/* <table className="w-full bg-green-600"> */}
                <table className="w-full ">
                    <thead>
                        <tr className='font-semibold text-lg border-y-2 border-gray-800'>
                            <td className='whitespace-nowrap py-2 sm:pl-4 lg:w-[100px]'>Sl No.</td>
                            <td className='whitespace-nowrap py-2 sm:pl-4'>Title</td>
                            <td className='whitespace-nowrap py-2 sm:pl-4'>Slug</td>
                            <td className='whitespace-nowrap py-2 sm:pl-4 lg:w-[200px]'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <tr className='font-normal text-md border-b border-gray-500' key={item}>
                                <td className='py-1.5 border-r border-gray-500 pl-2 sm:pl-4'>1</td>
                                <td className='py-1.5 border-x border-gray-500 pl-2 sm:pl-4'>Household</td>
                                <td className='py-1.5 border-x border-gray-500 pl-2 sm:pl-4'>household</td>
                                <td className='py-1.5 border-l border-gray-500 pl-2 sm:pl-4'>
                                    <span className='flex items-center gap-4'>
                                        <button type="button">
                                            <EyeIcon className='size-6 text-green-800' />
                                        </button>
                                        <button type="button">
                                            <PencilSquareIcon className='size-6 text-blue-700' />
                                        </button>
                                        <button type="button">
                                            <TrashIcon className='size-6 text-red-600' />
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </section>
    );
}

export default ListCategory;