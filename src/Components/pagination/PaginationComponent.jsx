const Pagination = ({ page, setPage, count, totalCount }) => {
    const maxPage = Math.ceil(totalCount / count);
  
    const selectHandler = (selectPage) => {
      if (selectPage >= 1 && selectPage <= maxPage && selectPage !== page) {
        setPage(selectPage);
      }
    };
  
    return (
      <>
        <nav>
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <div
                onClick={() => selectHandler(page - 1)}
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  ariaHidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </div>
            </li>
  
            {[...Array(Math.min(5, maxPage))].map((_, i) => (
              <li key={i} className="flex items-center">
                <div
                  onClick={(e) => selectHandler(i + 1)}
                  className={`${
                    page === i + 1
                      ? "text-blue-900 bg-blue-200 hover:bg-blue-200 border-blue-400"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800"
                  } flex items-center justify-center px-4 h-10 leading-tight`}
                >
                  {i + 1}
                </div>
              </li>
            ))}
  
            {maxPage > 5 && (
              <li>
                <div
                  onClick={() => selectHandler(page + 1)}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    ariaHidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </>
    );
  };
  
  export default Pagination;