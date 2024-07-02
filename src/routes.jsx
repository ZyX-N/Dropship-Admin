import AddCategory from "./pages/admin/Category/AddCategory";
import Category from "./pages/admin/Category/Category";
import ListCategory from "./pages/admin/Category/ListCategory";
import Dashboard from "./pages/admin/dashboard";


// const icon = {
//   className: "w-5 h-5 text-inherit",
// };

const routes = [
  {
    title: "admin",
    layout: "admin",
    pages: [
      {
        name: "dashboard",
        path: "/dashboard",
        element: <Dashboard />,
        subPages: []
      },
      {
        name: "category",
        element: <Category />,
        subPages: [
          {
            name: 'Add Catgegory',
            path: '/add-category',
            element: <AddCategory />
          },
          {
            name: 'List Category',
            path: '/list-category',
            element: <ListCategory />
          },
          
        ]
      },
    ]
  },
  {
    title: "auth",
    layout: "auth",
    pages: [

    ]
  },
];

export default routes;
