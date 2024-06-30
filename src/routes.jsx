import Dashboard from "./pages/admin/dashboard";
import AddCategory from "./pages/admin/category/addCategory";
import ListCategory from "./pages/admin/category/listCategory";

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
        subPages: [
          {
            name: 'Add Category',
            path: '/add-category',
            element: <AddCategory />
          },
          {
            name: 'List Category',
            path: '/list-category',
            element: <ListCategory />
          }
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
