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
import { postCall } from "../../../services/apiCall";
import ThreeDotSpinner from "../../../Components/spinner/Page";
import InputDropdown from "../../../Components/input/input-dropdown";
import { toast } from "react-toastify";
import HTMLEditor from "../../../Components/input/editor";
import ModalDetails from "../../../Components/modal/details";
import Toast from "../../../Components/toast/toast";
import { getDateTime } from "../../../services/helper";

const OrderList = () => {
  const token = getLoginToken();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrderList = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await postCall(`/order/list`, headers);

    if (data && data.status) {
      setOrders(data.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold capitalize">Order List</h1>
        </div>

        <div className="w-full pt-4 flex flex-col gap-6 items-center">
          {loading ? (
            <ThreeDotSpinner />
          ) : (
            <>
              <table className="w-full">
                <thead>
                  <tr className="font-semibold text-lg border-y-2 border-gray-800">
                    <td className="whitespace-nowrap py-2 sm:pl-4">Sl No.</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Order ID</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">User</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Status</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Price</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Products</td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">
                      Order Date
                    </td>
                    <td className="whitespace-nowrap py-2 sm:pl-4">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order, index) => (
                      <tr
                        className="font-normal text-md border-b border-gray-500"
                        key={order._id}
                      >
                        {/* Serial Number */}
                        <td className="px-1 sm:px-2 py-1.5 pl-4">
                          {index + 1}
                        </td>

                        {/* Order ID */}
                        <td className="border-x border-gray-500 px-1 sm:px-2 py-1.5">
                          {order.orderId}
                        </td>

                        {/* User Info */}
                        <td className="border-x border-gray-500 px-1 sm:px-2 py-1.5">
                          <p className="trucate">
                            {order.userInfo?.name}
                            {/* {order.userInfo?.isVerified ? (
                              <span className="text-red-600 font-bold"></span>
                            ) : (
                              ""
                            )} */}
                            {/* ({order.userInfo?.email}) */}
                          </p>
                        </td>

                        {/* Payment Status */}
                        <td className="border-x border-gray-500 px-1 sm:px-2 py-1.5 capitalize text-center">
                          <span
                            className={`font-semibold ${
                              order.paymentStatus === "paid"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>

                        {/* Total Price */}
                        <td className="border-x border-gray-500 px-1 sm:px-2 py-1.5">
                          ₹ {order.totalPrice}
                        </td>

                        {/* Products */}
                        <td className="border-x border-gray-500 px-1 sm:px-2 py-1.5">
                          {order.productDetails.map((product, idx) => (
                            <div key={idx}>
                              {product.title} (x{product.quantity})
                            </div>
                          ))}
                        </td>

                        {/* Products */}
                        <td className="border-x border-gray-500 px-1 sm:px-2 py-1.5">
                          {getDateTime(order.updatedAt)}
                        </td>

                        {/* Actions */}
                        <td className="py-1.5 border-l border-gray-500 pl-2 sm:pl-4">
                          <span className="flex items-center gap-4">
                            <Tooptip message="View">
                              <button
                                type="button"
                                // onClick={() => detailOpenHandler(item._id)}
                              >
                                <EyeIcon className="size-6 text-green-800" />
                              </button>
                            </Tooptip>

                            <Tooptip message="Edit">
                              <button
                                type="button"
                                // onClick={() => editOpenHandler(item._id)}
                              >
                                <PencilSquareIcon className="size-6 text-blue-700" />
                              </button>
                            </Tooptip>

                            <Tooptip message="Delete">
                              <button
                                type="button"
                                // onClick={() => deleteOpenHandler(item._id)}
                              >
                                <TrashIcon className="size-6 text-red-600" />
                              </button>
                            </Tooptip>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-4 text-center">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="w-full flex justify-end">
                <Pagination />
              </div>
            </>
          )}
        </div>
      </section>

      <Toast />
    </>
  );
};

export default OrderList;
