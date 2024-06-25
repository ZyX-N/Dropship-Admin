import Dashboard from "./pages/admin/dashboard";
import Category from "./pages/admin/category";

const icon = {
  className: "w-5 h-5 text-inherit",
};

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
            element: <div>Add Category</div>
          },
          {
            name: 'Cat 456',
            path: '/cat-456',
            element: <div>Cat 456</div>
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
