import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async()=>{
    let response  = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
     response = await response.json();
      setFoodCat(response[1]);
      setFoodItem(response[0]);
      //console.log(response[0], response[1])
  }

  useEffect(()=>{
    loadData()
  }, [])

 

  return (
    <div>
        <div><Navbar/></div>
        <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
  <div className="carousel-inner" style={{maxHeight: '90vh'}}>
    <div className='carousel-caption' style={{zIndex: "10"}}>
    <div class="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyDcH_MxdsTsK6KMVon-Ybfa2WiT-R70ZjWw&s" alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://recipesblob.oetker.in/assets/d8a4b00c292a43adbb9f96798e028f01/1272x764/pizza-pollo-arrostojpg.jpg" alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyDcH_MxdsTsK6KMVon-Ybfa2WiT-R70ZjWw&s" alt="Third slide"/>
    </div>
  </div>
  {/* <Link className="carousel-control-prev" to="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </Link>
  <Link className="carousel-control-next" to="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </Link> */}
</div>
        </div>
        <div className='container'>
          {
            foodCat != [] ? foodCat.map((data)=>{
              return (
                <div className='row mb-3'>
                  <div key ={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItem != [] ? foodItem.filter((item)=> (item.CategoryName === data.CategoryName) && 
                    (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems =>{
                      return (
                        <div key = {filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem = {filterItems}
                            options ={filterItems.options[0]}
                            
                          ></Card>
                        </div>
                      )
                    })
                    : <div>No such data</div>
                  }
                </div>
              )
            }): <div>...</div>
          }
          
        </div>
        <div><Footer/></div>
    </div>
  )
}
