const container = $("#container");
const showMoreButton = $("#showMore");

let allProducts = [];
let visibleProducts = 8;

function createProductItems(data) {
    container.html("");
    const productsToShow = data.slice(0, visibleProducts);

    productsToShow.forEach((item) => {
        const productItem = `
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
        container.append(productItem);
    });

    if (data.length > visibleProducts) {
        showMoreButton.removeClass("hidden");
    }
}

function getData() {
    $.get("http://localhost:3000/api/products", (response) => {
        allProducts = response.products;
        createProductItems(allProducts);
    });
}

showMoreButton.on("click", function () {
    if (visibleProducts === 8) {
        visibleProducts = allProducts.length;
        showMoreButton.text("Show Less");
    } else {
        visibleProducts = 8;
        showMoreButton.text("Show More");
    }
    createProductItems(allProducts);
});

getData();


