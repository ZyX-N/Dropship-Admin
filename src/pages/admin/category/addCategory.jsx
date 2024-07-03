import React, { useMemo, useState } from "react";
import InputText from "../../../Components/input/Input-text";
import InputCheckbox from "../../../Components/input/Input-checkbox";
import ButtonSave from "../../../Components/button/Submit";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AddCategory = () => {
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
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold capitalize">add category</h1>
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
                className="font-medium text-lg tracking-wide"
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
            <div className="flex items-end gap-4 row-start-3 md:row-start-auto">
              <label
                htmlFor="title"
                className="font-medium text-lg whitespace-nowrap"
              >
                Enter slug manually
              </label>
              <InputCheckbox
                value={manualSlug}
                onChange={(e) => setManualSlug(e.target.checked)}
              />
            </div>
            {data.image && (
              <div className="grid-item relative size-72">
                <button type="button" className="rounded-full border-2 border-black bg-white p-0.5 absolute right-2 top-2" onClick={()=>setData((prev)=>({...prev,img:null}))}>
                  <XMarkIcon className="size-5" />
                </button>
                <img
                  src={data.image ? URL.createObjectURL(data.image) : ""}
                  alt="Zixen"
                  className="size-full object-cover border-2 border-black rounded-lg p-0.5"
                />
              </div>
            )}
          </div>
          <div>
            <ButtonSave>Save</ButtonSave>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCategory;
