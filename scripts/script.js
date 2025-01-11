// Pet data
let petData = [];

// Pet Category
let petCategory = [];

// Initially, loading is true
let loading = true;

const showLoader = (isLoading) => {
    if (isLoading) {
        console.log("loading...");
        // Show loader 
        document.getElementById("loader")?.classList?.remove('hidden')

        // Hide Card Container
        document.getElementById("pet-card-container")?.classList?.add('hidden')

        // Hide Error div
        document.getElementById("error-div")?.classList?.add('hidden')

    } else {
        console.log('Loaded!');

        // Hide loader 
        document.getElementById("loader")?.classList?.add('hidden')

        // Show Card Container
        document.getElementById("pet-card-container")?.classList?.remove('hidden')

        // Show Error div
        document.getElementById("pet-card-container")?.classList?.remove('hidden')


    }
};

// Function for getting pet Category tags info
const getAllPetCategory = async () => {
    try {
        // Fetch data
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await res.json();

        petCategory = data.categories;
        // console.log('Fetched Data:', petCategory);
        // Render Pert Category
        renderPetCategory();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const getAllPetData = async () => {
    try {
        // Show loader
        loading = true;
        showLoader(loading);

        // Fetch data
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await res.json();
        // console.log(data);

        // Update petCategory
        setTimeout(() => {
            petData = data.pets;

            // console.log('Fetched Data:', petData);

            // Hide loader
            loading = false;
            showLoader(loading);
            renderPetData();
        }, 2000);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Call the function
getAllPetCategory();
getAllPetData();

// Function for rendering pet category
const renderPetCategory = () => {
    // console.log(petCategory);

    const finalDiv = petCategory.map(singleCategory => {
        return `<div onclick="getCLickedCategoryData('${singleCategory.category}')" id="dog-tag" class="cursor-pointer flex items-center justify-center gap-4 border rounded-2xl py-6 px-10">
                    <img src=${singleCategory.category_icon} alt="">
                    <h1 class="text-2xl font-bold">${singleCategory.category}</h1>
                 </div>`
    })
    // console.log(finalDiv.join(''));
    const petCategoryContainer = document.getElementById('category-container')
    petCategoryContainer.innerHTML = finalDiv.join('');
}

// Function for rendering pet Data (cart)
const renderPetData = () => {
    // console.log(petData);

    if (petData.length<1) {
        console.log("petdata nai");
        const finalDiv = `<div id="error-div" class="flex flex-col justify-center items-center w-full pt-20 object-cover">
                             <img src="./images/error.webp" alt="">
                             <h1 class="text-3xl font-bold mb-2">No information Available</h1>
                             <p class="text-lg font-medium">Checkout other categories</p>
                         </div>`
        const petDataContainer = document.getElementById("error-card-parent-container")
        petDataContainer.innerHTML = finalDiv
        return
    }
    const finalAllCartDiv = petData?.map(singleData => {
        return `<div class="max-w-xs p-6 rounded-md shadow-md bg-white border">
                             <img src=${singleData.image} alt="" class="object-cover object-center w-full rounded-md h-40 border dark:bg-gray-500">
                             <!-- Text and info container -->
                             <div class="mt-6 mb-2">
                                 <h1 class="text-xl font-bold tracking-wide mb-2">${singleData.pet_name ? singleData.pet_name : 'Not Available'}</h1>
                                 <!-- Breed -->
                                 <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                     <img src="./images/bredd-icon.png" alt="">
                                     <p>Breed: ${singleData.breed ? singleData.breed : 'Not Available'}</p>
                                 </div>
                                 <!-- Birth -->
                                 <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                     <img src="./images/birth-icon.png" alt="">
                                     <p>Birth: ${singleData.date_of_birth ? singleData.date_of_birth : 'Not Available'}</p>
                                 </div>
                                 <!-- Gender -->
                                 <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                     <img src="./images/gender-icon.png" alt="">
                                     <p>Gender: ${singleData.gender ? singleData.gender : 'Not Available'}</p>
                                 </div>
                                 <!-- Price -->
                                 <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                     <img src="./images/price-icon.png" alt="">
                                     <p>Price : ${singleData.price ? singleData.price : 'Not Available'}</p>
                                 </div>
                             </div>
     
                             <hr class="mb-4">
                             <!-- Buttons (adopt , details, like) -->
                              <div class="flex justify-between items-center">
                                 <button onclick="" class="btn bg-white text-[#0E7A81] hover:text-white hover:bg-[#0E7A81] hover:border-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>
                                 <button onclick="" class="btn bg-white text-[#0E7A81] hover:text-white hover:bg-[#0E7A81] hover:border-[#0E7A81]">Adopt</button>
                                 <button onclick="" class="btn bg-white text-[#0E7A81] hover:text-white hover:bg-[#0E7A81] hover:border-[#0E7A81]">Details</button>
                              </div>
                 </div>`
    })

    // console.log(finalAllCartDiv.join(''));

    const petDataContainer = document.getElementById("error-card-parent-container")
    // console.log(object);
        const finalAllCardParentDiv = `<div id="pet-card-container" class="grid grid-cols-3 gap-6">
                                            ${finalAllCartDiv.join('')}
                                        </div>`

        petDataContainer.innerHTML = finalAllCardParentDiv;
}

const getCLickedCategoryData = async (category_name) => {
    console.log(category_name.toLowerCase());
    try {
        // Show loader
        loading = true;
        showLoader(loading);

        // Fetch data
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category_name.toLowerCase()}`);
        const data = await res.json();
        console.log(data);

        // Update petCategory
        setTimeout(() => {
            petData = data.data;

            console.log('Fetched Data:', petData);

            // Hide loader
            loading = false;
            showLoader(loading);
            renderPetData();
        }, 2000);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

