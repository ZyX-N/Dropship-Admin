import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Tooptip from "../../../Components/tool-tip/Tooltip";
import Pagination from "../../../Components/pagination/Pagination";
import ModalDelete from "../../../Components/modal/delete";
import ModalEdit from "../../../Components/modal/edit";
import InputText from "../../../Components/input/Input-text";
import InputCheckbox from "../../../Components/input/Input-checkbox";
import {
  deleteCall,
  getCall,
  postFormDataCall,
  putCall,
} from "../../../services/apiCall";
import { getLoginToken } from "../../../services/token";
import ModalDetails from "../../../Components/modal/details";
import ThreeDotSpinner from "../../../Components/spinner/Page";
import Toast from "../../../Components/toast/toast";
import { toast } from "react-toastify";
import Search from "../../../Components/search/Search";

const ListCategory = () => {
  const token = getLoginToken();
  const imageBox = useRef(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const initialData = {
    title: "",
    image: "",
  };
  const [data, setData] = useState(initialData);

  const [currImage, setCurrImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [manualSlug, setManualSlug] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ****************** Edit start ******************

  const editOpenHandler = async (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall(`/category/${id}`, headers);
    if (data && data.status) {
      setData({
        id: id,
        title: data.data.title,
        slug: data.data.slug,
        image: data.data?.image?._id || null,
        active: data.data.isActive,
      });
      setCurrImage(data.data.image || "");
    }
    setEditOpen(true);
  };

  const editHandler = async (id) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let body = data;
    let editStatus = await putCall(`/category/${id}`, headers, body);
    if (editStatus && editStatus.status) {
      setData(initialData);
      getCategory();
      toast.success(editStatus.msg); 
      setEditOpen(false);
    } else {
      setLoading(false);
      toast.error(editStatus.msg); 
    }
  };
git 
  const editCloseHandler = () => {
    setData(initialData);
    setEditOpen(false);
  };

  // ****************** Edit end ******************

  // ****************** Details start ******************
  const detailOpenHandler = async (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall(`/category/${id}`, headers);
    if (data && data.status) {
      setData({
        id: id,
        title: data.data.title,
        slug: data.data.slug,
        image: data.data?.image?._id || null,
        active: data.data.isActive,
      });
      setCurrImage(data.data.image || "");
    }
    setDetailsOpen(true);
  };

  const detailCloseHandler = () => {
    setData(initialData);
    setDetailsOpen(false);
  };

  // ****************** Details end ******************

  // ****************** Delete start ******************
  const deleteOpenHandler = async (id) => {
    setData({ id: id });
    setDeleteOpen(true);
  };

  const deleteHandler = async (id) => {
    // setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let deleteStatus = await deleteCall(`/category/${id}`, headers);

    if (deleteStatus && deleteStatus.status) {
      toast.success(deleteStatus.msg);
      setData(initialData);
      setDeleteOpen(false);
    } else {
      setLoading(false);
      toast.error(deleteStatus.msg);
    }
  };

  const deleteCloseHandler = () => {
    setData(initialData);
    setDeleteOpen(false);
  };
  // ****************** Delete end ******************

  const fileHandler = async (e) => {
    try {
      const file = e.target.files[0];
      const headers = {
        authorization: `Bearer ${token}`,
      };
      const body = {
        file: file,
      };
      let uploadStatus = await postFormDataCall("/uploads", headers, body);

      if (uploadStatus.status) {
        setUploadedImage(file);
        setData((prev) => ({
          ...prev,
          ...{ image: uploadStatus?.data || "" },
        }));
        toast.success(uploadStatus.msg);
      } else {
        toast.error(uploadStatus.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall("/category", headers);
    if (data && data.status) {
      setCategoryList(data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

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

  const [page, setPage] = useState(1)
  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4  w-full ">
          <h1 className="text-2xl font-semibold capitalize w-[20%]" >list category</h1>
          <Search />
        </div>
        <div className="w-full pt-4 flex flex-col gap-6 items-center">
          {loading ? (
            <ThreeDotSpinner />
          ) : (
            <>
              <table className="w-full">
                <thead>
                  <tr className="font-semibold text-lg py-1 border-y-2 border-gray-800">
                    <td className="whitespace-nowrap  sm:pl-4 lg:w-[100px]">
                      Sl No.
                    </td>
                    <td className="whitespace-nowrap sm:pl-4">Title</td>
                    <td className="whitespace-nowrap sm:pl-4">Slug</td>
                    <td className="whitespace-nowrap sm:pl-4 lg:w-[200px]">
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {categoryList.map((item, index) => (
                    <tr
                      className="font-normal text-md border-b border-gray-500"
                      key={item._id}
                    >
                      <td className="flex items-center gap-3 py-1.5 pl-2 sm:pl-4">
                        <span
                          className={`size-2 rounded-full ${item.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                        ></span>
                        {index + 1}
                      </td>
                      <td className="py-1.5 border-x border-gray-500 pl-2 sm:pl-4">
                        {item.title}
                      </td>
                      <td className="py-1.5 border-x border-gray-500 pl-2 sm:pl-4">
                        {item.slug}
                      </td>
                      <td className="py-1.5 border-l border-gray-500 pl-2 sm:pl-4">
                        <span className="flex items-center gap-4">
                          <Tooptip message="View">
                            <button
                              type="button"
                              onClick={() => detailOpenHandler(item._id)}
                            >
                              <EyeIcon className="size-6 text-green-800" />
                            </button>
                          </Tooptip>

                          <Tooptip message="Edit">
                            <button
                              type="button"
                              onClick={() => editOpenHandler(item._id)}
                            >
                              <PencilSquareIcon className="size-6 text-blue-700" />
                            </button>
                          </Tooptip>

                          <Tooptip message="Delete">
                            <button
                              type="button"
                              onClick={() => deleteOpenHandler(item._id)}
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
              <div className="w-full flex justify-end">
                <Pagination page={page} setPage={setPage} DataList={categoryList} />
              </div>
            </>
          )}
        </div>
      </section>

      <ModalDelete
        title="Category"
        open={deleteOpen}
        setOpen={setDeleteOpen}
        id={data?.id}
        onDelete={deleteHandler}
        onClose={deleteCloseHandler}
      />

      <ModalEdit
        title="Edit Category"
        open={editOpen}
        setOpen={setEditOpen}
        onSave={editHandler}
        closeFn={editCloseHandler}
        id={data.id}
      >
        <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
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
              className="font-medium text-base tracking-wide flex gap-2 items-center"
            >
              Slug
              <InputCheckbox
                value={manualSlug}
                onChange={(e) => setManualSlug(e.target.checked)}
              />
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
                value={uploadedImage?.name || ""}
                disabled={true}
              />
              <input
                type="file"
                id="img"
                className="hidden"
                onChange={fileHandler}
                multiple={false}
                ref={imageBox}
              />
              {uploadedImage && (
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded-full hover:bg-gray-300 p-1"
                  onClick={() => {
                    imageBox.current.value = null;
                    setUploadedImage(null);
                    setData((prev) => ({
                      ...prev,
                      ...{ image: currImage ? currImage._id : "" },
                    }));
                  }}
                >
                  <XMarkIcon className="size-4" />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-end gap-4 row-start-3 md:row-start-auto">
            <label
              htmlFor="active"
              className="font-medium text-base whitespace-nowrap"
            >
              Active
            </label>

            <InputCheckbox
              value={data.active}
              onChange={(e) =>
                setData((prev) => ({ ...prev, active: e.target.checked }))
              }
            />
          </div>
          <div className="grid-item">
            {editOpen && uploadedImage && (
              <>
                <img
                  src={uploadedImage ? URL.createObjectURL(uploadedImage) : ""}
                  alt="Zixen"
                  className="size-40 object-cover border-2 border-black rounded-lg p-0.5"
                />
                <span className="text-sm font-medium">Uploaded Image</span>
              </>
            )}
          </div>
          {editOpen && currImage && (
            <div className="grid-item">
              <img
                src={currImage ? currImage?.url : ""}
                alt="Zixen"
                className="size-40 object-cover border-2 border-black rounded-lg p-0.5"
              />
              <span className="text-sm font-medium">Current Image</span>
            </div>
          )}
        </div>
      </ModalEdit>

      <ModalDetails
        title="Category Details"
        open={detailsOpen}
        setOpen={setDetailsOpen}
        closeFn={detailCloseHandler}
      >
        <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-base tracking-wide">Title</label>
            <InputText type="text" value={data.title} disabled={true} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-base tracking-wide">Slug</label>
            <InputText type="text" value={data.slug || ""} disabled={true} />
          </div>
          {detailsOpen && currImage && (
            <div className="grid-item">
              <img
                src={currImage ? currImage?.url : ""}
                alt="Zixen"
                className="size-40 object-cover border-2 border-black rounded-lg p-0.5"
              />
            </div>
          )}
          <div className="flex items-start gap-4 row-start-3 md:row-start-auto">
            <label className="font-medium text-base whitespace-nowrap">
              Active
            </label>
            <span
              className={`border border-black size-3 rounded-full mt-1.5 ${data?.active ? "bg-green-600" : "bg-red-600"
                }`}
            ></span>
          </div>
        </div>
      </ModalDetails>

      <Toast />
    </>
  );
};

export default ListCategory;
