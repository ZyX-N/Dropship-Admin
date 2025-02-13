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
import { getCall, postCall } from "../../../services/apiCall";
import ThreeDotSpinner from "../../../Components/spinner/Page";
import InputDropdown from "../../../Components/input/input-dropdown";
import { toast } from "react-toastify";
import HTMLEditor from "../../../Components/input/editor";
import ModalDetails from "../../../Components/modal/details";
import Toast from "../../../Components/toast/toast";
import { getDateTime } from "../../../services/helper";
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const token = getLoginToken();
  const navigate = useNavigate();

  const currentSlug = window.location.search;

  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  const getOrderDetails = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = await getCall(`/order/details/${orderId}`, headers);

    if (data && data.status) {
      setOrder(data.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!currentSlug || !currentSlug.includes("?q=")) {
      window.alert("Invalid order ID");
      navigate("/admin/order-list");
      return null;
    }

    setOrderId(currentSlug.replaceAll("?q=", ""));
  }, []);

  useEffect(() => {
    if (orderId) {
      getOrderDetails();
    }
  }, [orderId]);

  // return (
  //   <>
  //     <section className="flex flex-col gap-4">
  //       <div className="flex flex-col gap-4">
  //         <h1 className="text-2xl font-semibold capitalize">Order Details</h1>
  //       </div>

  //       <div className="w-full pt-4 flex flex-col gap-6 items-center">ll</div>
  //     </section>

  //     <Toast />
  //   </>
  // );

  // orderFrom
  // totalMrp


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Order Header */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Order: {order.orderId}
          </h2>
          <p className="text-sm text-gray-500">
            Last Updated: {new Date(order.updatedAt).toLocaleString()}
          </p>
        </div>
        {order.isOrderCancelAble && (
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Cancel Order
          </button>
        )}
      </div>

      {/* Payment & Shipping Info */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-white shadow-md rounded-md">
          <h3 className="text-md font-semibold text-gray-700">Payment</h3>
          <p className="text-sm text-gray-500">Method: {order.paymentMethod}</p>
          <p className="text-sm text-gray-500">Status: {order.paymentStatus}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md">
          <h3 className="text-md font-semibold text-gray-700">Shipping</h3>
          <p className="text-sm text-gray-500">
            Method: {order.shippingMethod}
          </p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-md">
          <h3 className="text-md font-semibold text-gray-700">Total</h3>
          <p className="text-lg font-bold text-green-600">
            ₹{order.totalAmountToPay}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-6 bg-white shadow-md rounded-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Products</h3>
        {order?.productDetails?.map((product, index) => (
          <div key={index} className="flex items-center gap-4 border-b py-4">
            <img
              src={
                order.userInfo.find((img) => img._id === product.image[0])?.path
              }
              alt={product.title}
              className="w-16 h-16 object-cover rounded-md border"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{product.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product?.description || "",
                  }}
                />
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-green-600">
                  ₹{product.price}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.strikePrice}
                </span>
              </div>
            </div>
            <span className="text-gray-600">Qty: {product.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
