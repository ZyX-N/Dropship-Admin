import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";
import Tooptip from "../../../Components/tool-tip/Tooltip";
import Pagination from "../../../Components/pagination/Pagination";
import ModalDelete from "../../../Components/modal/delete";
import ModalEdit from "../../../Components/modal/edit";
import InputText from "../../../Components/input/Input-text";
import InputCheckbox from "../../../Components/input/Input-checkbox";

const ListProduct = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const editHandler = () => {
    console.log("Edit submit.");
    setEditOpen(false);
  };

  const [data, setData] = useState({
    title: "",
    image: null,
  });

  const [manualSlug, setManualSlug] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setData((prev) => ({ ...prev, image: file }));
  };

  useMemo(() => {
    if (manualSlug) {
      setData((prev) => ({ ...prev, slug: "" }));
    } else {
      setData((prev) => {
        const { slug, ...rest } = prev;
        return rest;
      });
    }
  }, [manualSlug]);

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold capitalize">list product</h1>
        </div>

        <div className="w-full pt-4 flex flex-col gap-6 items-end">
          <table className="w-full ">
            <thead>
              <tr className="font-semibold text-lg border-y-2 border-gray-800">
                <td className="whitespace-nowrap py-2 px-0 sm:px-2 lg:w-[100px]">
                  Sl No.
                </td>
                <td className="whitespace-nowrap py-2 px-0 sm:px-2">Title</td>
                <td className="whitespace-nowrap py-2 px-0 sm:px-2">Category</td>
                <td className="whitespace-nowrap py-2 px-0 sm:px-2">MRP</td>
                <td className="whitespace-nowrap py-2 px-0 sm:px-2">Price</td>
                <td className="whitespace-nowrap py-2 px-0 sm:px-2">Stock</td>
                <td className="whitespace-nowrap py-2 px-0 sm:px-2">Rating</td>
                <td className="whitespace-nowrap py-2 px-0 sm:px-2 lg:w-[200px]">
                  Action
                </td>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => (
                <tr
                  className="font-normal text-md border-b border-gray-500"
                  key={item}
                >
                  <td className="py-1.5 border-r border-gray-500 px-1 sm:px-2">
                    1
                  </td>
                  <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                    Sofa Set
                  </td>
                  <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                    household
                  </td>
                  <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                    19000
                  </td>
                  <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                    12000
                  </td>
                  <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                    60
                  </td>
                  <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                    4.5
                  </td>
                  <td className="py-1.5 border-l border-gray-500 px-1 sm:px-2">
                    <span className="flex items-center gap-4">
                      <Tooptip message="View">
                        <button type="button">
                          <EyeIcon className="size-6 text-green-800" />
                        </button>
                      </Tooptip>

                      <Tooptip message="Edit">
                        <button type="button" onClick={() => setEditOpen(true)}>
                          <PencilSquareIcon className="size-6 text-blue-700" />
                        </button>
                      </Tooptip>

                      <Tooptip message="Delete">
                        <button
                          type="button"
                          onClick={() => setDeleteOpen(true)}
                        >
                          <TrashIcon className="size-6 text-red-600" />
                        </button>
                      </Tooptip>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination />
        </div>
      </section>

      <ModalDelete title="Category" open={deleteOpen} setOpen={setDeleteOpen} />

      <ModalEdit
        title="Edit Category"
        open={editOpen}
        setOpen={setEditOpen}
        onSave={editHandler}
      >
        <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="font-medium text-base tracking-wide"
            >
              Title
            </label>
            <InputText
              type="text"
              id="title"
              placeholder="Enter category title"
              value={data.title}
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="slug"
              className="font-medium text-base tracking-wide"
            >
              Slug
            </label>
            <InputText
              type="text"
              id="slug"
              placeholder="Enter category slug"
              value={data.slug || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, slug: e.target.value }))
              }
              disabled={manualSlug ? false : true}
              classes={manualSlug ? null : "cursor-not-allowed"}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="image"
              className="font-medium text-base tracking-wide"
            >
              Image
            </label>
            <div className="size-full relative flex border-b-2 border-gray-400">
              <label
                htmlFor="img"
                className="border-r-2 border-gray-400 px-6 hover:bg-gray-300 rounded-tl-md flex items-center justify-center cursor-pointer"
              >
                Upload
              </label>
              <input
                type="text"
                className="size-full bg-transparent outline-none py-2 px-6 truncate"
                value={data.image?.name || ""}
                disabled={true}
              />
              <input
                type="file"
                id="img"
                className="hidden"
                onChange={fileHandler}
                multiple={false}
              />
            </div>
          </div>
          <div className="flex items-end gap-4 row-start-3 md:row-start-auto">
            <label
              htmlFor="title"
              className="font-medium text-base whitespace-nowrap"
            >
              Enter slug manually
            </label>
            <InputCheckbox
              value={manualSlug}
              onChange={(e) => setManualSlug(e.target.checked)}
            />
          </div>
          {data.image && (
            <div className="grid-item">
              <img
                src={data.image ? URL.createObjectURL(data.image) : ""}
                alt="Zixen"
                className="size-72 object-cover border-2 border-black rounded-lg p-0.5"
              />
            </div>
          )}
        </div>
      </ModalEdit>
    </>
  );
};

export default ListProduct;