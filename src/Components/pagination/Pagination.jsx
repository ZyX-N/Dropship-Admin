
const Pagination = ({ page, setPage, count, totalCount }) => {

  const selectHandler = (selectPage) => {
    if (selectPage >= 1 && selectPage <= totalPages && selectPage !== page)
      setPage(selectPage)
  }
  let totalPages = Math.ceil(totalCount / count)
  let StartPage = Math.max(page - 2, 1)
  let EndPage = Math.min(StartPage + 4, totalPages)

  if (EndPage - StartPage <= 4) {
    StartPage = Math.max(EndPage - 4, 1)
  }
  const paginationArr = Array.from({ length: EndPage - StartPage + 1 }, ((_, idx) => StartPage +idx))

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <div onClick={() => selectHandler(page - 1)} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3 rtl:rotate-180" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
            </div>
          </li>
          {paginationArr.map((idx) => (
            <li key={idx} className="flex items-center ">
              <div
                onClick={() => selectHandler(idx)}
                className={`${page === idx ? "text-blue-900 bg-blue-200 hover:bg-blue-200 border-blue-400  font-bold " : " text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"} flex items-center justify-center px-4 h-10 leading-tight`}> {idx}
              </div>
            </li>
          ))}
          <li>
            <div onClick={() => selectHandler(page + 1)} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >
              <span className="sr-only">Next</span>
              <svg className="w-3 h-3 rtl:rotate-180" ariaHidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
