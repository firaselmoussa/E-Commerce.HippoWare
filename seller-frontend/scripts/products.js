window.onload = () => {
    console.log(localStorage)
    const categorySelect= document.getElementById("category-select")
    const addCategory= document.getElementById("add-category")
    const addProduct= document.getElementById("add-product")
    const products= document.getElementById("products")
    const displayedProducts=document.getElementsByClassName("product-card")
    const deleteModal= document.getElementById("deletion-modal")
    const deleteItem= document.getElementById("delete-item")
    const cancelDelete= document.getElementById("cancel-delete")
    const trashBin=document.querySelectorAll(".trash-bin")
    
    console.log(typeof(trashBin))

    //display all products
    if (categorySelect.value== 'none'){
        displaybyCategroy('0')
    }

    categorySelect.onchange=(e)=>{
        products.innerHTML=''
        const categorySelected=e.target.value
        displaybyCategroy(categorySelected)
    }

    function displaybyCategroy(categorySelected){
        let payload = {search:"0",
        category:categorySelected}
        let config = {
            headers: {'Authorization': localStorage.jwt}
        }
        let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/products.php',payload,config).then(
            function (response) {
                for (data of response.data){
                    displayProducts(data) 
                }
                console.log(trashBin.length)
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    function displayProducts(data){
        let productCard = 
            `<div class="product-card">
                <img src="../../assets/jacket2.jfif" class="jacket"> 
                <div class="product-details">
                    <div>Name : ${data.name}</div>
                    <div>Color: ${data.color} </div>
                    <div>Size: ${data.size}</div>
                    <div>Revenue: ${data.revenue}</div>
                    <div>Price: ${data.price}</div>
                    <img src="../../assets/trash.png" class="trash-bin">
                </div>
            </div>`
            products.innerHTML+=productCard
    }
    
    
    // let payload = {search:"0", category:'0'}
    // let config = {
    //     headers: {'Authorization': localStorage.jwt}
    // }
    // let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/products.php',payload,config).then(
    //     function (response) {
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    
   
    // function deleteProduct(){
    //     displayedProducts.onclick=(e)=>{
    //         if (e.target)
    //     }
    // }


    



    
    

    // for (let displayedProduct of displayedProducts){
    //     displayedProduct.onclick=(e)=>{
    //         console.log('Here')
    //         if (trashBin.includes(e.target)){
    //             console.log('yessss')
    //         }
    //     }
    // }
   
    
    // for (let i=0; i<displayedProducts.length;i++){
    //     trashBin[i].onclick=()=>{
    //         myModal.style.display='Block'
    //         deleteItem.onclick=()=>{
    //             displayedProducts[i].remove()
    //             myModal.style.display='none'
    //         }    
    //     }
    //     cancelDelete.onclick=()=>{
    //         myModal.style.display='none'
    //     }
    // }
    
    //Storing Categories
    let categories=[]
    payload = {}
    config = {
        headers: {'Authorization': localStorage.jwt}
    };
    res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/categories.php',payload,config).then(
        function (response) {
        categories=[]
        for (let i=0;i<response.data.length;i++){
            categories.push(response.data[i].name)
        }
        if ('categories' in localStorage){
           
            localStorage.removeItem('categories')
        }

        localStorage.setItem('categories',categories.toString())
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    })
    categories=localStorage.getItem('categories').split(',')
    localStorage.removeItem('categories')
    console.log(localStorage)
   
    for (let category of categories){
        let option=`<option value=${category}>${category}</option>`
        categorySelect.innerHTML+=option
    }

    //adding categories

    const dropDownContents=document.getElementById('drop')
    const categoryOptions=document.getElementsByClassName('category-options')
    const customizeCategory=document.getElementById('customize-category')
    addCategory.onmouseover=()=>{
        dropDownContents.style.display="Block"
    }
    dropDownContents.onmouseleave=()=>{
        dropDownContents.style.display="none"
    }

    let categoryArray=['Men','Women','Children']
    dropDownContents.onclick=(e)=>{
        let clickedCategory=e.target.innerHTML
        console.log(clickedCategory)
        if (categoryArray.includes(clickedCategory)){
            let payload = {category: clickedCategory }
            let config = {
                headers: {'Authorization': localStorage.jwt}
            };
            let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/add-category.php',payload, config).then(
                function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
    customizeCategory.onkeyup=(e)=>{
        if (e.key==='Enter'){
            console.log(customizeCategory.value)
            let payload = {category: customizeCategory.value }
            let config = {
                headers: {'Authorization': localStorage.jwt}
            };
            let res = axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/add-category.php',payload, config).then(
                function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }



    // let categoryArray=[]
    // for (let option of categoryOptions.children){
    //     categoryArray.push(option.value)
    // }
    // console.log(categoryArray)
    // addCategory.onmouseover=()=>{
    //     document.getElementById('drop').style.display="Block"
    //     dropDownContents.onclick=(e)=>{
    //         console.log(e.target.innerHTML)
    //         if (categoryArray.includes(e.target.innerHTML) ){
    //             window.alert('Category already exits')
    //         }
    //         else{
    //             let option=`<option>${e.target.innerHTML}</option>`
    //             categoryOptions.innerHTML+=option
    //         }
    //     }
    //     document.getElementById('drop').onmouseleave=()=>{
    //         document.getElementById('drop').style.display="none"
    //     }
    // }

    addProduct.onclick=()=>{  }


    const logOut=document.getElementById('log-out')
    const logoutModal=document.getElementById('logout-modal')
    const cancelLogout=document.getElementById("cancel-logout")
    const confirmLogout=document.getElementById("confirm-logout")
    logOut.onclick=()=>{
        logoutModal.style.display='Block'
        cancelLogout.onclick=()=>{logoutModal.style.display='none'}
        confirmLogout.onclick=()=>{
            window.location.replace("home_page.html")
            localStorage.clear()
        }
    }
    

}
       