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
import { getLoginToken } from "../../../services/token";
import {
  deleteCall,
  getCall,
  postFormDataCall,
} from "../../../services/apiCall";
import ThreeDotSpinner from "../../../Components/spinner/Page";
import InputDropdown from "../../../Components/input/input-dropdown";
import { toast } from "react-toastify";
import HTMLEditor from "../../../Components/input/editor";
import ModalDetails from "../../../Components/modal/details";
import Toast from "../../../Components/toast/toast";

const ListProduct = () => {
  const token = getLoginToken();
  const imageBox = useRef(null);

  const initialData = {
    title: "",
    strikePrice: 0,
    price: 0,
    stock: 0,
    image: [],
    rating: 4,
    slug: "",
    active: true,
  };

  const [data, setData] = useState(initialData);

  const [category, setCategory] = useState({ _id: null, title: null });
  const [description, setDescription] = useState("");

  const [uploadedImage, setUploadedImage] = useState([]);
  const [manualSlug, setManualSlug] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProduct = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall("/product", headers);
    if (data && data.status) {
      setProductList(data.data);
      setLoading(false);
    }
  };

  const getCategory = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall("/category/drop-down-list", headers);

    if (data && data.status) {
      setCategoryList(data.data);
    }
  };

  const fileHandler = async (e) => {
    try {
      const files = e.target.files;
      let uploadCount = 0;

      for (let file of files) {
        const headers = {
          authorization: `Bearer ${token}`,
        };
        const body = {
          file: file,
        };
        let uploadStatus = await postFormDataCall("/uploads", headers, body);

        if (uploadStatus.status) {
          setData((prev) => ({
            ...prev,
            image: [...prev.image, uploadStatus.data],
          }));
          setUploadedImage((prev) => [...prev, file]);
          uploadCount++;
        } else {
          toast.error(`${uploadStatus.msg} \nFilename : ${file.name}`);
        }
      }

      toast.success(
        `${uploadCount} image${uploadCount > 1 ? "s" : ""} uploaded`
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ****************** Edit start ******************
  const editOpenHandler = async (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall(`/product/${id}`, headers);

    if (data && data.status) {
      setData({
        id: id,
        title: data.data.title,
        slug: data.data.slug,
        // image: data.data?.image?._id || null,
        active: data.data.isActive,
        price: data.data.price,
        stock: data.data.stock,
        strikePrice: data.data.strikePrice,
      });
      setCategory(data.data.category);
      setDescription(data.data.description);
      // setCurrImage(data.data.image || "");
    }
    setEditOpen(true);
  };

  const editHandler = async (id) => {
    // setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let body = { ...data, description };
    if (!manualSlug) {
      const { slug, ...rest } = data;
      body = { ...rest, description };
    }

    console.log(body);
    // let editStatus = await putCall(`/category/${id}`, headers, body);
    // if (editStatus && editStatus.status) {
    //   toast.success(editStatus.msg);
    //   setData(initialData);
    //   getCategory();
    //   setEditOpen(false);
    // } else {
    //   setLoading(false);
    //   toast.error(editStatus.msg);
    // }
  };

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
    let data = await getCall(`/product/${id}`, headers);

    if (data && data.status) {
      setData({
        // id: id,
        title: data.data.title,
        slug: data.data.slug,
        // image: data.data?.image?._id || null,
        active: data.data.isActive,
        price: data.data.price,
        stock: data.data.stock,
        strikePrice: data.data.strikePrice,
      });
      setCategory(data.data.category);
      setDescription(data.data.description);
      // setCurrImage(data.data.image || "");
    }
    setDetailsOpen(true);
  };

  const detailCloseHandler = () => {
    setData(initialData);
    setCategory({ _id: null, title: null });
    setDescription("");
    setDetailsOpen(false);
  };
  // ****************** Details end ******************

  // ****************** Delete start ******************
  const deleteOpenHandler = async (id) => {
    setData({ id: id });
    setDeleteOpen(true);
  };

  const deleteHandler = async (id) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let deleteStatus = await deleteCall(`/product/${id}`, headers);
    if (deleteStatus && deleteStatus.status) {
      toast.success(deleteStatus.msg);
      setData(initialData);
      getProduct();
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

  useEffect(() => {
    getProduct();
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

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold capitalize">list product</h1>
        </div>

        <div className="w-full pt-4 flex flex-col gap-6 items-center">
          {loading ? (
            <ThreeDotSpinner />
          ) : (
            <>
              <table className="w-full ">
                <thead>
                  <tr className="font-semibold text-lg border-y-2 border-gray-800">
                    <td className="whitespace-nowrap py-2 sm:pl-4 lg:w-[100px]">
                      Sl No.
                    </td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Title</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Category</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">MRP</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Price</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Stock</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Rating</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4 lg:w-[200px]">
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {productList.map((item, index) => (
                    <tr
                      className="font-normal text-md border-b border-gray-500"
                      key={item._id}
                    >
                      {/* <td className="py-1.5 border-r border-gray-500 px-1 sm:px-2"> */}
                      <td className="flex items-center gap-3 py-1.5 pl-2 sm:pl-4">
                        <span
                          className={`size-2 rounded-full ${
                            item.isActive ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        {index + 1}
                      </td>
                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {item.title ?? "N/A"}
                      </td>
                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {item.category.title ?? "N/A"}
                      </td>
                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {item.strikePrice ?? "N/A"}
                      </td>
                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {item.price ?? "N/A"}
                      </td>
                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {item.stock ?? "N/A"}
                      </td>
                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {item.rating ?? "N/A"}
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
                <Pagination />
              </div>
            </>
          )}
        </div>
      </section>

      <ModalDelete
        title="Product"
        open={deleteOpen}
        id={data?.id}
        onClose={deleteCloseHandler}
        onDelete={deleteHandler}
      />

      <ModalEdit
        title="Edit Product"
        open={editOpen}
        setOpen={setEditOpen}
        onSave={editHandler}
        onClose={editCloseHandler}
      >
        <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="title"
              className="font-medium text-md tracking-wide"
            >
              Title
            </label>
            <InputText
              type="text"
              id="title"
              placeholder="Enter product title"
              value={data.title}
              onChange={(e) =>
                setData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="category"
              className="font-medium text-md tracking-wide"
            >
              Category
            </label>
            <InputDropdown
              type="text"
              id="category"
              placeholder="Select product category"
              value={category.title}
              setValue={setCategory}
              option={categoryList}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="strikePrice"
              className="font-medium text-md tracking-wide"
            >
              MRP
            </label>
            <InputText
              type="number"
              id="strikePrice"
              placeholder="Enter product MRP"
              value={data.strikePrice}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  strikePrice: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="price"
              className="font-medium text-md tracking-wide"
            >
              Price
            </label>
            <InputText
              type="number"
              id="price"
              placeholder="Enter product price"
              value={data.price}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="rating"
              className="font-medium text-md tracking-wide"
            >
              Rating
            </label>
            <InputText
              type="number"
              id="rating"
              placeholder="Enter product rating"
              value={data.rating}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  rating: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="stock"
              className="font-medium text-md tracking-wide"
            >
              Stock
            </label>
            <InputText
              type="number"
              id="stock"
              placeholder="Enter product stock"
              value={data.stock}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  stock: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="image"
              className="font-medium text-md tracking-wide"
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
                className="size-full bg-transparent outline-none py-2 px-6 truncate font-medium"
                // value={
                //   data.image.length
                //     ? `${data.image.length} Image${
                //         data.image.length > 1 ? "s" : ""
                //       } Uploaded`
                //     : ""
                // }
                disabled={true}
              />
              <input
                type="file"
                id="img"
                className="hidden"
                onChange={fileHandler}
                multiple={true}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <label
                htmlFor="slug"
                className="font-medium text-md tracking-wide"
              >
                Slug
              </label>
              <InputCheckbox
                value={manualSlug}
                onChange={(e) => setManualSlug(e.target.checked)}
              />
            </div>
            <InputText
              type="text"
              id="slug"
              placeholder="Product slug will be generated automatically"
              value={data.slug}
              onChange={(e) =>
                setData((prev) => ({ ...prev, slug: e.target.value }))
              }
              disabled={manualSlug ? false : true}
              classes={manualSlug ? null : "cursor-not-allowed"}
            />
          </div>
        </div>

        {uploadedImage.length > 0 && (
          <div className="flex flex-wrap gap-6">
            {uploadedImage.map((item, index) => (
              <div className="grid-item relative size-40" key={item.name}>
                <button
                  type="button"
                  className="rounded-full border-2 border-black bg-white p-0.5 absolute right-2 top-2"
                  onClick={() => {
                    setData((prev) => ({
                      ...prev,
                      image: data.image.filter((e, idx) => index !== idx),
                    }));

                    setUploadedImage(
                      uploadedImage.filter((e, idx) => index !== idx)
                    );
                  }}
                >
                  <XMarkIcon className="size-5" />
                </button>
                <img
                  src={item ? URL.createObjectURL(item) : ""}
                  alt="Zixen"
                  className="size-full object-cover border-2 border-black rounded-lg p-0.5"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1 mt-8">
          <label className="font-medium text-md tracking-wide">
            Description
          </label>
          <div className="bg-white">
            <HTMLEditor setValue={setDescription} setContents={description} />
          </div>
        </div>
      </ModalEdit>

      <ModalDetails
        title="Product Details"
        open={detailsOpen}
        setOpen={setDetailsOpen}
        closeFn={detailCloseHandler}
      >
        <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">Title</label>
            <InputText
              type="text"
              placeholder="Enter product title"
              value={data.title}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">
              Category
            </label>
            <InputDropdown
              type="text"
              placeholder="Select product category"
              value={category.title}
              disable={true}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">MRP</label>
            <InputText
              type="number"
              id="strikePrice"
              placeholder="Enter product MRP"
              value={data.strikePrice}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">Price</label>
            <InputText
              type="number"
              placeholder="Enter product price"
              value={data.price}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">Rating</label>
            <InputText
              type="number"
              placeholder="Enter product rating"
              value={data.rating}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">Stock</label>
            <InputText
              type="number"
              placeholder="Enter product stock"
              value={data.stock}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">Image</label>
            <div className="size-full relative flex border-b-2 border-gray-400">
              <label className="border-r-2 border-gray-400 px-6 hover:bg-gray-300 rounded-tl-md flex items-center justify-center cursor-pointer">
                Upload
              </label>
              <input
                type="text"
                className="size-full bg-transparent outline-none py-2 px-6 truncate font-medium"
                // value={
                //   data.image.length
                //     ? `${data.image.length} Image${
                //         data.image.length > 1 ? "s" : ""
                //       } Uploaded`
                //     : ""
                // }
                disabled={true}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <label className="font-medium text-md tracking-wide">Slug</label>
            </div>
            <InputText
              type="text"
              placeholder="Product slug will be generated automatically"
              value={data.slug}
              disabled={true}
            />
          </div>
        </div>

        {uploadedImage.length > 0 && (
          <div className="flex flex-wrap gap-6">
            {uploadedImage.map((item, index) => (
              <div className="grid-item relative size-40" key={item.name}>
                <button
                  type="button"
                  className="rounded-full border-2 border-black bg-white p-0.5 absolute right-2 top-2"
                  onClick={() => {
                    setData((prev) => ({
                      ...prev,
                      image: data.image.filter((e, idx) => index !== idx),
                    }));

                    setUploadedImage(
                      uploadedImage.filter((e, idx) => index !== idx)
                    );
                  }}
                >
                  <XMarkIcon className="size-5" />
                </button>
                <img
                  src={item ? URL.createObjectURL(item) : ""}
                  alt="Zixen"
                  className="size-full object-cover border-2 border-black rounded-lg p-0.5"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="rating" className="font-medium text-md tracking-wide">
            Description
          </label>
          <div className="bg-white border-t border-gray-300">
            <div
              className="rounded-md"
              dangerouslySetInnerHTML={{ __html: description || "" }}
            />
          </div>
        </div>
      </ModalDetails>

      <Toast />
    </>
  );
};

export default ListProduct;
