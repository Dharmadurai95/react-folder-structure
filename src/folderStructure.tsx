/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";


type FileNode = {
    name: string;
    isFolder: boolean;
    children?: any; // Optional if 'isFolder' is true
    id: any;
};


const FolderStructure = ({ data, pushDataToSource }: { data: FileNode, pushDataToSource: any }) => {
    const [showChild, setShowChild] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [checkFolder, setFolder] = useState<string>('')
    const [name, setName] = useState('')
    function showInputHandler(e: any, value: any, fileType = '') {
        e.stopPropagation();
        setShowInput(value)
        setFolder(fileType)
    }
    return (data.isFolder ? <div key={data.id}> <div className="folder"  onClick={(e) => {
        e.stopPropagation();
        setShowChild(!showChild)
    }}>
        <div>📁 {data?.name}
        </div>
        <button className="button" onClick={(e) => showInputHandler(e, true, 'Folder')}>Folder</button>
        <button className="button" onClick={(e) => showInputHandler(e, true, 'file')}>file</button>

    </div>
        {showInput && <input type="text" autoFocus onBlur={(e) => showInputHandler(e, false)}
            onChange={(e) => {
                e.stopPropagation()
                setName(e.target.value)
            }
            }
            onKeyDown={(e) => {
                e.stopPropagation()
                if (e.key === "Enter") {
                    pushDataToSource({
                        data: {
                            name,
                            isFolder: checkFolder === 'Folder' ? true : false,
                            id: new Date().getMilliseconds(),
                            children: []
                        },
                        id: data.id
                    });
                    setShowInput(false)
                }
            }}
        ></input>}

        {showChild && (data?.children?.length) && data?.children.map((item: any) => <div className="childNode"> <FolderStructure pushDataToSource={pushDataToSource} data={item} /></div>)}
    </div > : <div className="fileName">📂 {data?.name}</div>)




    // })
}

export default FolderStructure