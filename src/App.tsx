/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react'
import './App.css'
import FolderStructure from './folderStructure'


function randomString() {
  return (Math.random()*10).toString(36).slice(2)
}


function insertFileFolderHandlerHelper({ data, id, raw }: { data: any, id: any, raw: any }) {
  if (id === raw.id) {
    raw.children.unshift(data)
    return raw;
  }
  const nestesteArr =raw?.children?.length ? raw?.children?.map((val: any) => insertFileFolderHandlerHelper({ data, id, raw: val })):[]
  console.log(nestesteArr,'nestesteArr')
  console.log(raw,'nestesteArr')
  return { ...raw, children: nestesteArr }
}

const rawsourceData = {
  name: "root",
  isFolder: true,
  children: [
    {
      name: "app.js",
      isFolder: false,
      id: randomString()
    },
    {
      name: "component",
      isFolder: true,
      children: [
        {
          name: "header.js",
          isFolder: false,
          id: randomString()
        }
      ],
      id: randomString()
    }
  ],
  id: randomString()
}

function App() {

  const [sourceData, setSourceData] = useState(rawsourceData);


  function insertFileFolderHandler({ data, id }: { data: any, id: any }) {
    console.log(id,data)
    const updatedArr = insertFileFolderHandlerHelper({ data, id, raw: sourceData })
    console.log(updatedArr,'updateArr')
    setSourceData(updatedArr)
  }


  return (
    <div className='childNode'>
      <FolderStructure data={sourceData} pushDataToSource={insertFileFolderHandler} />
    </div>
  )
}

export default App
