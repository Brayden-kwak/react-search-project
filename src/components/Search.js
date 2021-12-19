import React, {useState, useEffect} from 'react';
import useCollapse from 'react-collapsed';
import studentData from '../students.json';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import Tag from './Tag.js';
import '../styles/search.css';

function Search() {
    const [keywords, setKeywords] = useState({titleValue:"", tagValue:""});
    const [found, setFound] = useState(studentData.students);
    const [tagWord, setTagWord] = useState("");

    const [closeList, setCloseList] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ closeList });

    useEffect(() => {
        setKeywords(keywords);
    },[keywords]);

    const filters = (e) => {
        const keyword = e.target.value;
        console.log(keywords.tagValue);
        if(keyword !== ''){
            const results = studentData.students.filter((user)=>{
                return user.firstName.toLowerCase().startsWith(keyword.toLowerCase()) || user.lastName.toLowerCase().startsWith(keyword.toLowerCase());
            });  
            setFound(results);
        }else{
            setFound(studentData.students);
        }
        setKeywords(keyword);
    }

    return (
        <div className='searchContainer'>
            <div className="container">
                <input 
                    className="searchBox" 
                    type="text" 
                    name="titleValue"
                
                    placeholder="Search by name" 
                    onChange={filters}
                />  
                <input 
                    className="searchBox" 
                    type="text" 
                    name="tagValue"
                    
                    placeholder="Search by tag" 
                    onChange={filters}
                />  
                {found && found.length > 0 ? (
                     found.map((data, index)=>(
                        <div key={index} className="second-container">
                                <img className="images" src={data.pic} alt=""/>
                            <div className="third-container">
                                <h1>{data.firstName} {data.lastName}</h1>
                                <p>Email: {data.email}</p>
                                <p>Company: {data.company}</p>
                                <p>Skill: {data.skill}</p>
                                <p> Average: {data.grades.reduce((a, c)=> parseInt(a)+parseInt(c)) / data.grades.length}%</p>  
                                <p 
                                className="content" 
                                {...getCollapseProps()}
                                >
                                {data.grades.map((grade, index)=> (       
                                
                                <p>Test{index+1}: {grade}%</p>                 
                                   
                                ))}
                                </p> 
                                <Tag value={tagWord} onChange={(e)=> setTagWord(e.target.value)}/>                        
                            </div>
                            <div className="fourth-container">
                                <button
                                    {...getToggleProps({
                                        onClick: () => setCloseList((prev) => !prev),
                                    })}  
                                    className="colBtn"
                                >
                                    {closeList ?  <FaMinus size={40}/> : <FaPlus size={40}/>}
                                </button>
                
                            </div>
                        </div>
                    ))
                ):
                <h1 className="notFound">No results found!</h1>
            }
            </div>
        </div>
    )
}

export default Search;
