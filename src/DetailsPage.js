import React, { useState ,useEffect} from "react";


function DetailsPage(props){
    let [orders,setOrders] = useState([]);
    let [order,setOrder] = useState("");
    async function getOrderDetails(){

        let res = await fetch('http://localhost:8010/get-order',{
            method : 'GET',
            headers : { "Content-Type": "application/json" , "Authorization" : `Bearer ${props.jwtToken}`}
        })

        let resJson = await res.json();
        setOrders(resJson.data.orders);

    }

    useEffect(()=>{
        getOrderDetails();
    },[])

    async function handleAdd(e){
        e.preventDefault();
        let res = await fetch('http://localhost:8010/add-order',{
            method : 'POST',
            headers : { "Content-Type": "application/json" , "Authorization" : `Bearer ${props.jwtToken}`},
            body : JSON.stringify({
                sub_total : order
            })
        })
        getOrderDetails();
        setOrder("");
    }
    return (

        <div>
              <div style={{border:'1px solid', padding:'5px',borderRadius:'5px'}}>
                <h1>Your orders</h1>
                {orders.map((order)=>{
                    return (<div style={{margin:5}} key={order._id}>
                        <span>{order.sub_total}</span>
                    </div>)
                })}
              </div>
              <br/>
              <div>
              <h2>Add order</h2>
                <form onSubmit={(e)=>{handleAdd(e)}}>
                    <input type="number" placeholder="Sub Total" onChange={(e)=>setOrder(e.target.value)} value={order} required/>
                    <button type="submit"> Add </button>
                </form>
              </div>  
        </div>    

    )
}


export default DetailsPage;