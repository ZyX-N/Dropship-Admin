import React, { useEffect, useState } from "react";
import InputText from "../../../Components/input/Input-text";
import ButtonSave from "../../../Components/button/Submit";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import InputDropdown from "../../../Components/input/input-dropdown";
import ThreeDotSpinner from "../../../Components/spinner/Page";
import {
  deleteCall,
  getCall,
  postCall,
  putCall,
} from "../../../services/apiCall";
import { getLoginToken } from "../../../services/token";
import { toast } from "react-toastify";
import Toast from "../../../Components/toast/toast";
import Tooptip from "../../../Components/tool-tip/Tooltip";
import Pagination from "../../../Components/pagination/Pagination";
import ModalDelete from "../../../Components/modal/delete";
import ModalEdit from "../../../Components/modal/edit";
import ModalDetails from "../../../Components/modal/details";

const City = () => {
  const token = getLoginToken();
  const [data, setData] = useState({ name: "" });
  const [editData, setEditData] = useState({ name: "" });
  const [list, setList] = useState([]);
  const [state, setState] = useState({ _id: null, title: null });
  const [editState, setEditState] = useState({ _id: null, title: null });
  const [stateList, setStateList] = useState([]);

  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();

    const headers = {
      authorization: `Bearer ${token}`,
    };

    const payload = {
      ...data,
      state: state._id,
    };

    let createStatus = await postCall("/city", headers, payload);

    if (createStatus.status) {
      setData({ name: "" });
      setState({ _id: null, title: null });
      setLoading(true);
      getCity();
      toast.success(createStatus.msg);
    } else {
      toast.error(createStatus.msg);
    }
  };

  const editHandler = async (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const payload = {
      ...editData,
      state: editState._id,
    };

    let editStatus = await putCall(`/city/${id}`, headers, payload);
    if (editStatus && editStatus.status) {
      toast.success(editStatus.msg);
      editCloseHandler();
      getCity();
    } else {
      toast.error(editStatus.msg);
    }
  };

  const editOpenHandler = async (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall(`/city/${id}`, headers);

    if (data && data.status) {
      setEditData({
        id: data.data._id,
        name: data.data.name,
      });
      setEditState({
        _id: data.data?.state?._id,
        title: data.data?.state?.name,
      });
    }
    setEditOpen(true);
  };

  const getStateDropdown = async () => {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    let list = await getCall("/state", headers);

    if (list.status) {
      setStateList(list.data.map((e) => ({ _id: e._id, title: e.name })));
    }
  };

  const getCity = async () => {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    let list = await getCall("/city", headers);

    if (list.status) {
      setList(list.data);
    }

    setLoading(false);
  };

  const getDateTime = (dt) => {
    let date = new Date(dt);
    return Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const editCloseHandler = () => {
    setEditData({ name: "" });
    setEditState({
      _id: null,
      title: null,
    });
    setEditOpen(false);
  };

  const detailOpenHandler = async (id) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall(`/city/${id}`, headers);

    if (data && data.status) {
      setEditData({
        id: data.data._id,
        name: data.data.name,
      });
      setEditState({
        _id: data.data?.state?._id,
        title: data.data?.state?.name,
      });
    }
    setDetailsOpen(true);
  };

  const detailCloseHandler = () => {
    setEditData({ name: "" });
    setEditState({
      _id: null,
      title: null,
    });
    setDetailsOpen(false);
  };

  const deleteOpenHandler = async (id) => {
    setData({ id: id });
    setDeleteOpen(true);
  };

  const deleteHandler = async (id) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let deleteStatus = await deleteCall(`/city/${id}`, headers);
    if (deleteStatus && deleteStatus.status) {
      toast.success(deleteStatus.msg);
      setData({ name: "" });
      getCity();
      setDeleteOpen(false);
    } else {
      setLoading(false);
      toast.error(deleteStatus.msg);
    }
  };

  const deleteCloseHandler = () => {
    setData({ name: "" });
    setDeleteOpen(false);
  };

  useEffect(() => {
    getCity();
    getStateDropdown();
  }, []);

  return (
    <>
      <Toast />
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold capitalize">City</h1>
        </div>

        <div className="w-full py-4">
          <form
            className="size-full flex flex-col gap-12"
            onSubmit={submitHandler}
          >
            <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="title"
                  className="font-medium text-md tracking-wide"
                >
                  Name
                </label>
                <InputText
                  type="text"
                  id="title"
                  placeholder="Enter city name"
                  value={data.name}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="state"
                  className="font-medium text-md tracking-wide"
                >
                  Select State
                </label>
                <InputDropdown
                  type="text"
                  id="state"
                  placeholder="Select state"
                  value={state.title}
                  setValue={setState}
                  option={stateList}
                />
              </div>
            </div>

            <div>
              <ButtonSave>Save</ButtonSave>
            </div>
          </form>
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold capitalize">list city</h1>
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
                    <td className="whitespace-nowrap py-2 sm:pl-4">Name</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">State</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">
                      Created At
                    </td>
                    <td className="whitespace-nowrap py-2 sm:pl-4 lg:w-[200px]">
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, index) => (
                    <tr
                      className="font-normal text-md border-b border-gray-500"
                      key={item._id}
                    >
                      <td className="flex items-center gap-3 py-1.5 pl-2 sm:pl-4">
                        {index + 1}
                      </td>

                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {item.name ?? "N/A"}
                      </td>

                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {item?.state?.name ?? "N/A"}
                      </td>

                      <td className="py-1.5 border-x border-gray-500 px-1 sm:px-2">
                        {getDateTime(item.createdAt) ?? "N/A"}
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
              {/* <div className="w-full flex justify-end">
                <Pagination />
              </div> */}
            </>
          )}
        </div>
      </section>

      <ModalDelete
        title="City"
        open={deleteOpen}
        id={data?.id}
        onClose={deleteCloseHandler}
        onDelete={deleteHandler}
      />

      <ModalEdit
        title="Edit City"
        open={editOpen}
        setOpen={setEditOpen}
        onSave={editHandler}
        onClose={editCloseHandler}
        id={editData?.id}
      >
        <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-md tracking-wide">
              Name
            </label>
            <InputText
              type="text"
              id="name"
              placeholder="Enter state name"
              value={editData.name}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="state"
              className="font-medium text-md tracking-wide"
            >
              Select State
            </label>
            <InputDropdown
              type="text"
              id="state"
              placeholder="Select state"
              value={editState.title}
              setValue={setEditState}
              option={stateList}
            />
          </div>
        </div>
      </ModalEdit>

      <ModalDetails
        title="Pincode Details"
        open={detailsOpen}
        setOpen={setDetailsOpen}
        closeFn={detailCloseHandler}
      >
        <div className="size-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">Name</label>
            <InputText type="text" value={editData.name} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-md tracking-wide">State</label>
            <InputText type="text" value={editState.title} />
          </div>
        </div>
      </ModalDetails>
    </>
  );
};

export default City;
