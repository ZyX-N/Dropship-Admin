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
    postFormDataCall,
} from "../../../services/apiCall";
import ThreeDotSpinner from "../../../Components/spinner/Page";
import { toast } from "react-toastify";
import HTMLEditor from "../../../Components/input/editor";
import ModalDetails from "../../../Components/modal/details";
import Toast from "../../../Components/toast/toast";
import Search from "../../../Components/search/Search";


const ListPage = () => {
    const token = getLoginToken();
    const imageBox = useRef(null);

    const initialData = {
        id: "",
        title: "",
        image: [],
        slug: "",
        template: "",
        active: true,
    };

    const [data, setData] = useState(initialData);

    const [description, setDescription] = useState("");

    const [uploadedImage, setUploadedImage] = useState([]);
    const [manualSlug, setManualSlug] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [staticList, setStaticList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page ,setPage]=useState(1)

    const getList = async () => {
        try {
            const response = await fetch("http://13.127.50.182:5000/api/admin/static-page", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            let json = await response.json()
            if (json && json.status) {
                setStaticList(json.data)
            } else {
                toast.error("Failed to fetch static page")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getList()
    }, [])

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
        let fetchedData = await fetch(`http://13.127.50.182:5000/api/admin/static-page/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        let parsedData = await fetchedData.json();
        console.log('parsedData ', parsedData)
        if (parsedData && parsedData.status) {
            setData({
                id: parsedData.data._id,
                title: parsedData.data.title,
                slug: parsedData.data.slug,
                active: parsedData.data.isActive,
                image: parsedData.data?.image?._id || null,
            })
            setDescription(parsedData.data.template)
            // setManualSlug(parsedData.manualSlug)
            // setCurrImage(parsedData.data.image || "")
            console.log('data', parsedData.data)
        }
        setEditOpen(true);
    };

    const editHandler = async (id) => {
        try {
            const response = await fetch(`http://13.127.50.182:5000/api/admin/static-page/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...data, template: description })
            })
            let json = await response.json()
            if (json && json.status) {
                setData(initialData);
                toast.success(json.msg)
            } else {
                toast.error(json.msg)
            }
        } catch (error) {
            console.error(error);
        }
        setEditOpen(false);
        getList()
    };

    const editCloseHandler = (id) => {
        setData(initialData);
        setEditOpen(false);
    };
    // ****************** Edit end ******************

    // ****************** Details start ******************
    const detailOpenHandler = async (id) => {
        let fetchedData = await fetch(`http://13.127.50.182:5000/api/admin/static-page/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        let json = await fetchedData.json()
        setData(json.data);
        setDescription(json.data.template)
        setDetailsOpen(true);

    };

    const detailCloseHandler = () => {
        setDetailsOpen(false);
    };
    // ****************** Details end ******************


    // ****************** Delete start ******************
    const deleteOpenHandler = async (id) => {
        setData({ id: id });
        setDeleteOpen(true);

    };

    const deleteHandler = async (id) => {
        try {
            let fetchedData = await fetch(`http://13.127.50.182:5000/api/admin/static-page/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            let parsedData = await fetchedData.json();
            if (parsedData && parsedData.status) {
                toast.success(parsedData.msg)
                getList()
                setData(initialData)
                setDeleteOpen(false)
            } else {
                toast.error(parsedData.msg)
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const deleteCloseHandler = () => {
        setData(initialData);
        setDeleteOpen(false);
    };

    // ****************** Delete end ******************

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
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-2xl font-semibold capitalize">list Static page </h1>
                    <Search />
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
                                        <td className="whitespace-nowrap py-2 sm:pl-4">Slug</td>
                                        <td className="whitespace-nowrap py-2 sm:pl-4 lg:w-[200px]">
                                            Action
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staticList.map((item, index) => (
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
                                            <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                                                {item.title ?? "N/A"}
                                            </td>
                                            <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                                                {item.slug ?? "N/A"}
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
                            {/* <Pagination page={page} setPage={setPage} DataList={staticList} totalCount={totalCount}/> */}

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
                id={data?.id}
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
                        <label className="font-medium text-md tracking-wide">Image</label>
                        <div className="size-full relative flex border-b-2 border-gray-400">
                            <label className="border-r-2 border-gray-400 px-6 hover:bg-gray-300 rounded-tl-md flex items-center justify-center cursor-pointer">
                                Upload
                            </label>
                            <input
                                type="text"
                                className="size-full bg-transparent outline-none py-2 px-6 truncate font-medium"
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
    )
}

export default ListPage;