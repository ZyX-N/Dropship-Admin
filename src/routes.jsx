import Dashboard from "./pages/admin/dashboard";
import AddCategory from "./pages/admin/category/addCategory";
import ListCategory from "./pages/admin/category/listCategory";
import AddProduct from "./pages/admin/product/addProduct";
import ListProduct from "./pages/admin/product/listProduct";
import Login from "./pages/auth/login";

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
      {
        name: "product",
        subPages: [
          {
            name: 'Add Product',
            path: '/add-product',
            element: <AddProduct />
          },
          {
            name: 'List Product',
            path: '/list-product',
            element: <ListProduct />
          }
        ]
      },
    ]
  },
  {
    title: "auth",
    layout: "auth",
    pages: [
      {
        name: "login",
        path: "/login",
        element: <Login />,
        subPages: []
      }
    ]
  },
];

export default routes;
