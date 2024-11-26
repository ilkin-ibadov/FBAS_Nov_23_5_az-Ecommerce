const $container = $('#container');

const createItems = (data) => {
    data.forEach(item => {
        const productItem = `
        <div class="flex flex-col">
            <img class="w-[270px] h-[250px] object-scale-down border p-4 bg-[#F5F5F5]" src="${item.gallery[0]}">
            <p class="mt-[18px]">${item.title}</p>
            <p class="mt-[18px] text-[#DB4444]">${item.currency}${item.price}</p>
        </div>
        `;

        $container.append(productItem);
    });
};

const getData = () => {
    $.get("http://localhost:3000/api/products", (response) => {
        createItems(response.products);
    })
};

getData();


