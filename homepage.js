const container = $("#container");
const showMoreButton = $("#showMore");
const modal = $("#searchModal");
const modalContainer = $("#modalContainer");
const search = $('#search');
const scrollToTopButton = $("#scrollToTop");

$("#profileMenuToggle").click(function () {
    $("#profileMenu").toggle();
});

$("#manageAccount").click(function () {
    window.location.href = "manage_my_account.html";
});

$("#logout").click(function () {
    alert("Logout clicked");
});

$("#shopping").click(function () {
    alert("Shopping clicked");
});

$(document).click(function (e) {
    if (!$(e.target).closest("#profileMenu, #profileMenuToggle").length) {
        $("#profileMenu").hide();
    }
});

let pageSize = 8;
let currentPage = 1;
let allProducts = [];

function createProductItems(data) {
    data.forEach((item) => {
        const productItem = `
            <div class="flex flex-col relative group">
                <div class="relative">
                    <img class="w-[270px] h-[250px] object-scale-down border p-4 bg-[#F5F5F5] product-image" src="${item.gallery[0]}" alt="${item.title}">
                    <button class="add-to-basket absolute bottom-0 left-0 w-[270px] px-6 py-2 bg-black text-white rounded-none opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-300">
                        Add to Basket
                    </button>
                </div>
                <p class="mt-[18px]">${item.title}</p>
                <p class="mt-[18px] text-[#DB4444]">${item.currency}${item.price}</p>
            </div>
        `;
        container.append(productItem);
    });
}

// 
const tech = $("#categoryTech");
const fashion = $("#categoryFashion");
const furniture = $("#categoryFurniture")

tech.on("click", function () {
    container.html("")
    getCategoryData("tech")
})

fashion.on("click", function () {
    container.html("")
    getCategoryData("fashion")
})

furniture.on("click", function () {
    container.html("")
    getCategoryData("furniture")
})

function getCategoryData(category) {
    $.get(`http://localhost:3000/api/products?category=${category}`, (response) => {
        allProducts = response.products;
        createProductItems(allProducts);
    })
    showMoreButton.addClass("hidden")
}

// 
function getData(page = 1) {
    $.get(`http://localhost:3000/api/products?page=${page}&pageSize=${pageSize}`, (response) => {
        allProducts = response.products;
        createProductItems(allProducts);
        
        if (allProducts.length === pageSize) {
            showMoreButton.removeClass("hidden");
        } else {
            showMoreButton.addClass("hidden");
        }
    })
}

showMoreButton.on("click", function () {
    currentPage++;
    getData(currentPage);
    scrollToTopButton.removeClass("hidden");
});

scrollToTopButton.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
})

getData(currentPage);


search.on("input", function (e) {
    var inputValue = e.target.value;
    if (inputValue) {
        getProductData(inputValue);
        modal.removeClass("hidden");
    }
});

$("#closeModal").click(function () {
    modal.addClass("hidden");
});

$(document).click(function (e) {
    if (!$(e.target).closest("#searchModal, #search").length && !$(e.target).is("#search")) {
        modal.addClass("hidden");
    }
});

function createModalItems(data) {
    modalContainer.html("");
    if (data.length > 0) {
        $.each(data, function (index, item) {
            var productItem = `
                <div class="flex flex-col relative group">
              <div class="relative">
                  <img class="w-[270px] h-[250px] object-scale-down border p-4 bg-[#F5F5F5] product-image" src="${item.gallery[0]}" alt="${item.title}">
                  <button class="add-to-basket absolute bottom-0 left-0 w-[270px] px-6 py-2 bg-black text-white rounded-none opacity-0 z-10 group-hover:opacity-100 transition-opacity duration-300">
                      Add To Basket
                  </button>
              </div>
              <p class="mt-[18px]">${item.title}</p>
              <p class="mt-[18px] text-[#DB4444]">${item.currency}${item.price}</p>
          </div>
            `;
            modalContainer.append(productItem);
        });
    } else {
        modalContainer.html("<p class='text-center text-gray-500'>No results found</p>");
    }
}

function getProductData(searchTerm) {
    $.get("http://localhost:3000/api/products", { searchTerm: searchTerm }, function (response) {
        createModalItems(response.products);
    });
}

