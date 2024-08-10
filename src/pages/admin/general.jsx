import React, { useRef, useState } from 'react'
import Toast from '../../Components/toast/toast'
import InputText from '../../Components/input/Input-text'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ButtonSave from '../../Components/button/Submit'


const General = () => {
  const [data, setData] = useState({
    title: "",
    Logo: null,
    LogoId: "",
    contact: "",
    email: "",
    instagram: "",
    Twiter: "",
    facebook: "",
    whatsapp: "",

  })
  const imageBox = useRef(null)

  const submitHandler = async (e) => {
    e.preventDefault()
  }

  const fileHandler = (e) => {
    const file = e.target.files[0]
    setData((prev) => ({ ...prev, Logo: file }))
  }
  return (
    <>
      <Toast />
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold capitalize">General settings</h1>
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
                  Title
                </label>
                <InputText
                  type="text"
                  id="title"
                  placeholder="Enter page title"
                  value={data.title}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>


              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Contact"
                  className="font-medium text-md tracking-wide"
                >
                  Contact Number
                </label>
                <InputText
                  type="number"
                  id="ContactNumber"
                  placeholder="Enter Contact Number"
                  value={data.contact}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, contact: e.target.value }))
                  }
                />
              </div><div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="font-medium text-md tracking-wide"
                >
                  Email
                </label>
                <InputText
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={data.email}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div><div className="flex flex-col gap-1">
                <label
                  htmlFor="Address"
                  className="font-medium text-md tracking-wide"
                >
                  Address
                </label>
                <InputText
                  type="text"
                  id="address"
                  placeholder="Enter address"
                  value={data.address}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, address: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="whatsapp"
                  className="font-medium text-md tracking-wide"
                >
                  WhatsApp
                </label>
                <InputText
                  type="number"
                  id="whatsapp"
                  placeholder="Enter WhatsApp number"
                  value={data.whatsapp}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, whatsapp: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="instagram"
                  className="font-medium text-md tracking-wide"
                >
                  Instagram
                </label>
                <InputText
                  type="text"
                  id="instagram"
                  placeholder="Enter instagram"
                  value={data.instagram}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, instagram: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="FB"
                  className="font-medium text-md tracking-wide"
                >
                  Facebook
                </label>
                <InputText
                  type="text"
                  id="fb"
                  placeholder="Enter Facebook"
                  value={data.facebook}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, facebook: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Twiter"
                  className="font-medium text-md tracking-wide"
                >
                  Twiter
                </label>
                <InputText
                  type="text"
                  id="Twiter"
                  placeholder="Enter Twiter id "
                  value={data.Twiter}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, Twiter: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="logo"
                  className="font-medium text-md tracking-wide"
                >
                  Logo
                </label>
                <div className="size-fit  relative flex border-b-2 border-gray-400">
                  <label
                    htmlFor="img"
                    className="border-r-2 border-gray-400 px-6 hover:bg-gray-300 rounded-tl-md flex items-center justify-center cursor-pointer "
                  >
                    Upload
                  </label>
                  <input
                    type="text"
                    className="size-fit  outline-none py-2 px-6 truncate"
                    value={data.Logo?.name || ""}
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

                </div>
              </div>
              <div>
                {data.Logo && (
                  <div className=" w-72 h-72 p-1 rounded-xl ">
                    <img src={data.Logo ? URL.createObjectURL(data.Logo) : ""} alt="logo" className="size-full object-cover border-2 border-black rounded-lg p-0.5"

                    />
                  </div>
                )}
              </div>

            </div>
            <div>
              <ButtonSave > Save </ButtonSave>
            </div>

          </form>
        </div>
      </section>


    </>
  )
}

export default General