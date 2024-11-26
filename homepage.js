$("#profileMenuToggle").click(function () {
    $("#profileMenu").toggle();
  });
  
  $("#manageAccount").click(function () {
    window.location.href = "manage_my_account.html";
  });
  
  $("#logout").click(function () {
    alert("Logout clicked");
  });
  
  $(document).click(function (e) {
    if (!$(e.target).closest("#profileMenu, #profileMenuToggle").length) {
      $("#profileMenu").hide();
    }
  });
  var container=$(`#container`)
  var search=$(`#search`)
  search.on("input",function(e){
    container.html("");
    var inputValue=e.target.value
    if(inputValue){
        getProductData(inputValue)
    }

  })
  function createProductItems(data){
    $.each(data,function(index,item){
        var productItem=`
        <div>
            <h2>${item.name}</h2>
            <img src="${item.gallery[0]}" alt="${item.name}" />
            <p>${item.description}</p>
        </div>
    `
    container.append(productItem)
    })
  }
  function getProductData(searchTerm){
    $.get("http://localhost:3000/api/products",{searchTerm:searchTerm},function(response){
        createProductItems(response.products)
    })
  }