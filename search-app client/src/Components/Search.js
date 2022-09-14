import React, { useState, useEffect } from 'react'
import "./Search.css"

export default function Search() {
    const [API_Data, setAPI_Data] = useState([])
    const [filterdata, setfilterdata] = useState([])
    
   
    function lowerCaseString(string) {
        return string.toLowerCase()
      }

    const handleFilter = (e)=>{
        const searchValue = e.target.value
        if(searchValue === ''){
            setfilterdata([])
            // console.log(filterdata);
        }else{
            const result = API_Data.filter((val)=>{
                let myHeadline = lowerCaseString(val.headline)
                let myPrimaryText = lowerCaseString(val.primaryText)
                let myDescription = lowerCaseString(val.description)
                let mySearchVal = lowerCaseString(searchValue)
                return myHeadline.includes(mySearchVal) || myPrimaryText.includes(mySearchVal) || myDescription.includes(mySearchVal)
            })
            setfilterdata(result)
            // console.log(searchValue);
        }
        
    }
    
    const getData = async()=>{
        const res = await fetch("https://search-app-servr.herokuapp.com/")
        const data = await res.json()
        setAPI_Data(data)
        // console.log(data);
    }

    useEffect(() => {
        getData()
    }, [])
   
    
   
  return (
    <>
        <div className='search-div'>
            <h1>Search App</h1>
            <input type="search" placeholder='Search here..' 
                className='search-bar' onChange={handleFilter}/>
        </div>
        <div className='grid-container'>
            {filterdata.map((val, key)=>{
                return (
                    <div className='grid-item' key={key}>
                        <h1 className='centerText heading'>{val.headline}</h1>
                        <h3 className='primarytext'>{val.primaryText}</h3>
                        <img src="https://images.pexels.com/photos/1152830/pexels-photo-1152830.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Pic"></img>
                        <h3 className='description'>{val.description}</h3>
                        <a href={val.companyData[0].url} target="_blank" rel="noreferrer" >{val.CTA}</a>
                    </div>
                )
            })}
        </div>
    </>
  )
}
