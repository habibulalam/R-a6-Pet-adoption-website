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

// Call the function
getAllPetCategory();
getAllPetData();

// Function for rendering pet category
const renderPetCategory = () => {
    // console.log(petCategory);

    const finalDiv = petCategory.map(singleCategory => {
        return `<div onclick="getCLickedCategoryData('${singleCategory.category}') , functionForActiveCategory(this)"  class="category-cards cursor-pointer flex items-center justify-center gap-4 border rounded-2xl py-6 px-10 duration-700">
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

    if (petData.length < 1) {
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
                                 <button onclick="renderLikedPetImage('${singleData.image}')" class="btn bg-white text-[#0E7A81] hover:text-white hover:bg-[#0E7A81] hover:border-[#0E7A81]"><i class="fa-regular fa-thumbs-up"></i></button>
                                 <button onclick="adoptionCountDown(this)" class="btn bg-white text-[#0E7A81] hover:text-white hover:bg-[#0E7A81] hover:border-[#0E7A81]">Adopt</button>
                                 <button onclick="showDetailsModalFunction('${singleData.petId}')" class="btn bg-white text-[#0E7A81] hover:text-white hover:bg-[#0E7A81] hover:border-[#0E7A81]">Details</button>
                              </div>
                 </div>`
    })

    // console.log(finalAllCartDiv.join(''));

    const petDataContainer = document.getElementById("error-card-parent-container")
    // console.log(object);
    const finalAllCardParentDiv = `<div id="pet-card-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
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


const renderLikedPetImage = (imgUrl) => {

    const finalDiv = `<div class="flex justify-center items-center p-1 border border-gray-400 rounded-2xl h-fit">
                        <img src="${imgUrl}" class="rounded-xl" alt="">
                    </div>`

    const likedParentContainer = document.getElementById('liked-images-container')
    likedParentContainer.innerHTML += finalDiv;
}


const functionForActiveCategory = (e) => {
    const categoryList = document.getElementsByClassName('category-cards');
    console.log(e)


    // Convert HTMLCollection to an array using Array.from()
    Array.from(categoryList).forEach(card => {
        // Remove 3 specific classes from each card
        // console.log(card)
        // card.classList('class1', 'class2', 'class3');
        card.style.removeProperty('border-radius')
        card.style.removeProperty('background-color')
        card.style.removeProperty('border')
    });

    e.style.backgroundColor = "#0E7A811A";
    e.style.border = "1px solid #0E7A81";
    e.style.borderRadius = "120px";

}

// function for sorting with price
const sortByPriceInDescendingOrder = () => {
    // const sortedPetsData = petData.sort((a, b) => console.log(a.pet_name,b.pet_name));
    const sortedPetsData = petData.sort((a, b) => b.price - a.price);
    // console.log(sortedPetsData);

    // Set the sorted data in petData variable
    petData = sortedPetsData;

    // Call the showLoader function and set it true
    loading = true;
    showLoader(loading);



    // Call the petData rendering function
    setTimeout(() => {
        loading = false;
        showLoader(loading);

        renderPetData();
    }, 2000);

}

// function for showing details modal
const showDetailsModalFunction = (data) => {
    console.log(data);

    const filterClickedData = petData.find(singleData => singleData.petId == data)
    // console.log(filterClickedData);
    // console.log(filterClickedData.category);

    // final div for modal
    const modalDiv = `<dialog id="my_modal_5" class="modal modal-middle">
            <!-- <div class="bg-white rounded-xl p-5 overflow-y-scroll h-[700px]"> -->
            <div class="modal-box lg:w-[50%] lg:max-w-3xl md:w-[80%] ">
                <!-- Content -->
                <div class=" p-6 rounded-md shadow-md bg-white border">
                    <div class="h-full w-full">
                        <img src="${filterClickedData.image}" alt="image of ${filterClickedData.pet_name}"
                            class="w-full h-full rounded-md border dark:bg-gray-500">
                    </div>
                    <!-- Text and info container -->
                    <div class="mt-6 mb-2">
                        <h1 class="text-2xl font-bold tracking-wide mb-3">${filterClickedData.pet_name}</h1>
                        <!-- Info container -->
                        <div class="grid gap-x-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                            <!-- Breed -->
                            <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                <img src="./images/bredd-icon.png" alt="">
                                <p><span class="font-medium">Breed : </span> ${filterClickedData.breed ? filterClickedData.breed : 'Not Available'}</p>
                            </div>
                            <!-- Birth -->
                            <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                <img src="./images/birth-icon.png" alt="">
                                <p><span class="font-medium">Birth : </span> ${filterClickedData.date_of_birth}</p>
                            </div>
                            <!-- Gender -->
                            <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                <img src="./images/gender-icon.png" alt="">
                                <p><span class="font-medium">Gender : </span> ${filterClickedData.gender}</p>
                            </div>
                            <!-- Price -->
                            <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                <img src="./images/price-icon.png" alt="">
                                <p><span class="font-medium">Price : </span> ${filterClickedData.price}</p>
                            </div>
                            <!-- Gender -->
                            <div class="flex gap-2 items-center text-[#131313B3] mb-2">
                                <i class="fa-solid fa-virus"></i>
                                <p><span class="font-medium">Vaccinated status : </span> ${filterClickedData.vaccinated_status}</p>
                            </div>
                        </div>
                    </div>

                    <hr class="mb-4">

                    <!-- Details info container -->
                    <div>
                        <h1 class="text-[#131313] font-semibold">Details Information</h1>
                        <p class="max-w-[630px]">${filterClickedData.pet_details}</p>
                    </div>

                    <!-- Cancel btn -->
                    <div class="modal-action">
                        <form method="dialog" class="w-full">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn w-full bg-[#0E7A811A] text-[#0E7A81]">Close</button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>`

        console.log(modalDiv);

    const getParentModalDiv = document.getElementById('dynamic-modal-section')
    getParentModalDiv.innerHTML = modalDiv;

    my_modal_5.showModal();
}

// function for adoption countdown
const adoptionCountDown = (btn) => {
    // console.log(btn);

    // Open the modal
    my_modal_1.showModal();

    // disable the button
    btn.disabled=true
    btn.textContent= "Processing...";
    
    let countdown = 3; // Use let instead of const for a mutable countdown variable
    
    const countDownTimerId = document.getElementById('count-down-timer');
    countDownTimerId.innerHTML = '<span class="loading loading-dots loading-lg"></span>'; // Update the timer text in the modal

    // Update the timer every second and close the modal when countdown reaches 0
    const interval = setInterval(() => {
        countDownTimerId.textContent = countdown; // Update the timer text in the modal
        countdown--; // Decrement countdown

        // When countdown finishes, close the modal and clear the interval
        if (countdown < 0) {
            my_modal_1.close();
            
            // set button text to adopted
            btn.textContent= 'Adopted';
            clearInterval(interval);
        }
    }, 1000);
};
