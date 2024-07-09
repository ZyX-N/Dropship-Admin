import React, { useMemo, useState } from "react";
import InputText from "../../../Components/input/Input-text";
import InputCheckbox from "../../../Components/input/Input-checkbox";
import ButtonSave from "../../../Components/button/Submit";
import { XMarkIcon } from "@heroicons/react/24/outline";
import InputDropdown from "../../../Components/input/input-dropdown";
import HTMLEditor from "../../../Components/input/editor";

const AddProduct = () => {
  const [data, setData] = useState({
    title: "",
    hindiTitle: "",
    hindiDescription: "",
    mrp: 0,
    price: 0,
    stock: 0,
    image: [],
    rating: 4,
  });

  const option = [
    { _id: 1, title: "Household" },
    { _id: 2, title: "Electronic" },
    { _id: 3, title: "Kitchen" },
    { _id: 4, title: "Cloths" },
    { _id: 5, title: "Shoes" },
  ];

  const [category, setCategory] = useState({ _id: null, title: null });
  const [description, setDescription] = useState("");
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
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold capitalize">add product</h1>
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
                className="font-medium text-lg tracking-wide"
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
                htmlFor="hindi-title"
                className="font-medium text-lg tracking-wide"
              >
                Hindi Title
              </label>
              <InputText
                type="text"
                id="hindi-title"
                placeholder="Enter hindi product title"
                value={data.title}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, hindiTitle: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="image"
                className="font-medium text-lg tracking-wide"
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

            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="font-medium text-lg tracking-wide"
              >
                Category
              </label>
              <InputDropdown
                type="text"
                id="category"
                placeholder="Select product category"
                value={category.title}
                setValue={setCategory}
                option={option}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="mrp"
                className="font-medium text-lg tracking-wide"
              >
                MRP
              </label>
              <InputText
                type="number"
                id="mrp"
                placeholder="Enter product MRP"
                value={data.mrp}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, mrp: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="price"
                className="font-medium text-lg tracking-wide"
              >
                Price
              </label>
              <InputText
                type="number"
                id="price"
                placeholder="Enter product price"
                value={data.price}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="stock"
                className="font-medium text-lg tracking-wide"
              >
                Stock
              </label>
              <InputText
                type="number"
                id="stock"
                placeholder="Enter product stock"
                value={data.stock}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, stock: e.target.value }))
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="rating"
                className="font-medium text-lg tracking-wide"
              >
                Rating
              </label>
              <InputText
                type="number"
                id="rating"
                placeholder="Enter product rating"
                value={data.rating}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, rating: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="rating"
              className="font-medium text-lg tracking-wide"
            >
              Description
            </label>
            <div className="bg-white">
            <HTMLEditor />
            </div>
          </div>

          <div>
            <ButtonSave>Save</ButtonSave>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
