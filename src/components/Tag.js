import React, {useState} from 'react';
import '../styles/tag.css';
import ActiveTag from './ActiveTag';

function Tag() {

    const [ tagName, setTagName ] = useState("");
    const [ tagList, setTagList ] = useState([]);

    const addTag = () => {
        setTagList([...tagList, {tag: tagName}])
        setTagName("")
    }

    return (
        <div className="tagContainer">
            <div className="tagBox">
                {tagList.map((data)=>{
                    return <ActiveTag tagName={data.tag}/>
                })}
            </div>
            <input 
                className="tag" 
                type="text" 
                placeholder="Add a tag"
                onChange={(e)=>{
                    setTagName(e.target.value);
                }}
             />
             <button className="addBtn" onClick={addTag}>Add</button>
        </div>
    )
}

export default Tag;
