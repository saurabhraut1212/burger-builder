import React, {Component} from "react";
import Order from "../../Components/Order/CheckoutSummary/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json').then(res=>{
            const fetchedOrders=[];
            for(let key in res.data){
                fetchedOrders.push({...res.data[key],id:key})
            }
          this.setState({loading:false ,orders:fetchedOrders});
        }).catch(error=>{
            this.setState({loading:false})
        })
    }
    render(){
        return(
          <div>
           {this.state.orders.map(order=>{
               console.log(order)

            return (
            <Order 
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
            />
           )})}
          </div>
        )
    }
}
export default withErrorHandler(Orders,axios);