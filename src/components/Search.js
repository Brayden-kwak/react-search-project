// import { Collapse } from 'react-collapse';
import React, {useState} from 'react';
import useCollapse from 'react-collapsed';

import studentData from '../students.json';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';

import '../styles/search.css';

function Search() {
    const [keywords, setKeywords] = useState("");
    const [found, setFound] = useState(studentData.students);
    const [closeList, setCloseList] = useState(false);

    const [isCategorySelect, setIsCategorySelect] = useState(false);

    const { getCollapseProps, getToggleProps } = useCollapse({ closeList });

    const handleClick = (idx) => {
        isCategorySelect[idx-1]=!isCategorySelect[idx-1];
        setIsCategorySelect(!closeList);
    }

    // const toggle = (e) => {
    //     //e.preventDefault();
    //     setCloseList(data => data ? false : true);
    // }

    

    const filter = (e) => {
        const keyword = e.target.value;

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
            <input 
                className="searchBox" 
                type="text" 
                value={keywords}
                placeholder="Search for name or tags" 
                onChange={filter}
            />
            <div className="container">
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
                                
                                {/* {closeList ? 
                                     <p className="content">
                                     {data.grades.map((grade, index)=> (
                                         <p>Test{index+1}: {grade}%</p>
                                     ))}
                                     </p>
                                     :
                                     false
                                } */}     
                                    <p 
                                    className="content" 
                                    {...getCollapseProps()}
                                    >
                                    {data.grades.map((grade, index)=> (       
                                    
                                    <p>Test{index+1}: {grade}%</p>                 
                                       
                                    ))}
                                    </p>  
                            </div>
                            <div className="fourth-container">
                                {/* <button 
                                onClick={toggle}
                                >
                                    +
                                </button> */}

                                <button
                                    {...getToggleProps({
                                        onClick: () => setCloseList((prev) => !prev),
                                    })}  
                                    className="colBtn"
                                >
                                    {closeList ?  <FaMinus size={40} className="mr-3"/> : <FaPlus size={40}/>}
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
