 export function Wishlist(item){
    fetch("https://shopflow-wkvz.onrender.com/wishlist",{
        method:"POST",
        headers:{"Content-Type":"application/json","authorization":"Bearer "+localStorage.getItem("token")},
        body:JSON.stringify({

productid:item.id,
name:item.title,
price:item.price,
image:item.thumbnail,

        })
    })
        .then(function(response){
            return response.json()
        })
         .then(function(data){
           console.log(data)
        })
    }
    export default Wishlist;