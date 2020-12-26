import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import data from '../data';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function HomeScreen() {
  const[products, setproducts] = useState([]);
  const[loading, setloading] = useState(false);
  const[error, setError] = useState(false);
  useEffect(() => { 
    const fetchData = async () => {
      try{
        setloading(true);
        const {data} = await axios.get('/api/products');
        setloading(false);
        setproducts(data);
      }
      catch(err){
        setError(err.message);
        setloading(false);
      }      
    }
    fetchData();
  }, []);
    return (
        <div>
          { loading 
                    ? <LoadingBox></LoadingBox>
                    : error 
                            ? <MessageBox variant="danger">{error}</MessageBox>
                            : (<div className="row center">
                            {
                              products.map(product => (
                                <Product key={product._id} product={product}></Product>
                              ))
                            }
                          </div>)
          }
        </div>
    );
} 

export default HomeScreen
