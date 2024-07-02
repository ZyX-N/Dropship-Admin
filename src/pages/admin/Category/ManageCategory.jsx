import React, { createContext, useState } from 'react'

const ManageCategoryContext = createContext()



const ManageCategoryProvider = ({children}) => {
    const initialProduct =[
        { 
            title:"moblie",
            slug:"mobile"
        },
        { 
            title:"mouse Zebronic",
            slug:"mouse_zebronic"
        },
        { 
            title:"IPhone 13",
            slug:"IPhone_13"
        },
        { 
            title:"Dell i12",
            slug:"Dell_i12"
        },
        { 
            title:"Android12",
            slug:"Android_12"
        },
    ]


    const [inputArray, setInputArray] = useState(initialProduct)


    return (
     <ManageCategoryContext.Provider value={{ inputArray,setInputArray}} >
        {children}
     </ManageCategoryContext.Provider>
  )
}

export { ManageCategoryContext,ManageCategoryProvider}