
    var modal = $("#searchModal");
    var modalContainer = $("#modalContainer");

   
    $("#search-btn").click(function () {
        var searchTerm = $("#search").val().trim();
        if (searchTerm) {
            getProductData(searchTerm); 
            modal.removeClass("hidden"); 
        }
    });

   
    $(document).click(function (e) {
        if ($(e.target).is("#searchModal")) {
            modal.addClass("hidden");
        }
    });

   
    $("#closeModal").click(function () {
        modal.addClass("hidden");
    });

   
    function createModalItems(data) {
        modalContainer.html("");
        if (data.length > 0) {
            $.each(data, function (index, item) {
                var productItem = `
                    <div class="flex flex-col relative group">
                        <div class="relative">
                            <img 
                                class="w-[270px] h-[250px] object-scale-down border p-4 bg-gray-100 product-image" 
                                src="${item.gallery[0]}" 
                                alt="${item.title}">
                            <button 
                                class="add-to-cart absolute bottom-0 left-0 w-full px-6 py-2 bg-black text-white opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-300">
                                Add To Cart
                            </button>
                        </div>
                        <p class="mt-2">${item.title}</p>
                        <p class="mt-1 text-red-500">${item.currency}${item.price}</p>
                    </div>
                `;
                modalContainer.append(productItem);
            });

            $(".product-item").on("click", function() {
                const productId = $(this).data("product-id"); // productId'yi alıyoruz
                window.location.href = `product-details.html?productId=${productId}`; // Detay sayfasına yönlendiriyoruz
            });



        } else {
            modalContainer.html("<p class='text-center text-black'>No products found.</p>");
        }
    }




    
    function getProductData(searchTerm) {
        $.get("http://localhost:3000/api/products", { searchTerm: searchTerm }, function (response) {
            createModalItems(response.products);
        });
    }
    
    




    $(document).ready(function () {

        $(document).on('click', '.group', function () {
            var productId = $(this).data('product-id');  
            if (productId) {
          
                window.location.href = `/product-details?productId=${productId}`;
            }
        });
    });
    

    

$(document).ready(function () {
    const productId = new URLSearchParams(window.location.search).get("productId");
    
    
    $.ajax({
        url: `http://localhost:3000/api/products/${productId}`,
        method: 'GET',
        success: function (product) {
          
            $('#productTitle').text(item.name);
            $('#productPrice').text(`$${item.price}`);
            $('#productDescription').text(item.description);
            $('#productStock').text(item.stock > 0 ? 'In Stock' : 'Out of Stock');
            $('#mainImage').html(`<img src="${item.imageUrl}" alt="Product Image" class="w-full h-[300px] object-contain border p-4 bg-gray-100">`);
            
           
            let imageGallery = '';
            item.images.forEach(image => {
                imageGallery += `<img src="${image}" alt="Thumbnail" class="w-full h-[80px] object-contain border cursor-pointer">`;
            });
            $('#imageGallery').html(imageGallery);
            
   
            const category = product.category;
            $.ajax({
                url: `http://localhost:3000/api/products?category=${category}&pageSize=4`, 
                method: 'GET',
                success: function (relatedProducts) {
                    let relatedItemsHTML = '';
                    relatedProducts.forEach(relatedProduct => {
                        relatedItemsHTML += `
                            <div class="bg-white border p-4 rounded-lg shadow-md">
                                <img src="${relatedProduct.imageUrl}" alt="${relatedProduct.name}" class="w-full h-[200px] object-contain mb-4">
                                <h3 class="text-lg font-semibold">${relatedProduct.name}</h3>
                                <p class="text-gray-600 mt-2">$${relatedProduct.price}</p>
                                <button class="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg" data-product-id="${relatedProduct._id}" onclick="addToBasket('${relatedProduct._id}')">Add to Basket</button>
                            </div>
                        `;
                    });
                    $('#relatedItems').html(relatedItemsHTML);
                }
            });
        }
    });


    

    // Etme
    function addToBasket(productId) {
        const quantity = $('#quantity').val();
        const accessToken = document.cookie.split(';')[0].split('=')[1];
        const refreshToken = document.cookie.split(';')[1].split('=')[1];

       
        $.ajax({
            url: 'http://localhost:3000/api/baskets/add',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Refresh-Token': refreshToken
            },
            data: {
                productId: productId,
                quantity: quantity
            },
            success: function (response) {
                alert('Product added to basket!');
            },
            error: function (error) {
                alert('Error adding product to basket!');
            }
        });
    }

    
    function refreshAccessToken() {
        const refreshToken = document.cookie.split(';')[1].split('=')[1];

        $.ajax({
            url: 'http://localhost:3000/api/auth/refresh',
            method: 'POST',
            data: { refreshToken: refreshToken },
            success: function (data) {
                
                document.cookie = `accessToken=${data.accessToken}; path=/`;
            },
            error: function (error) {
                alert('Error refreshing token!');
            }
        });
    }

    
    $('#increaseQuantity').on('click', function () {
        let quantity = $('#quantity').val();
        $('#quantity').val(++quantity);
    });

    $('#decreaseQuantity').on('click', function () {
        let quantity = $('#quantity').val();
        if (quantity > 1) {
            $('#quantity').val(--quantity);
        }
    });

    

    
    $('#closeModal').on('click', function () {
        $('#searchModal').addClass('hidden');
    });
});

