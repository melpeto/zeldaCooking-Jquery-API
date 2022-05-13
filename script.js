// make namespace
const cookApp = {}

// need variable to access the final array defined in "cookApp.getCookableItemsArray"
//(It took me forever to make this work so, sorry if this is not the proper way! Feedback welcome :))
let reducedArray = []

// cache the selector for html elements
cookApp.$dropdown = $('#userEffectSelection');
cookApp.$unorderedList = $('.unorderedList');
cookApp.$listItem = $('.listItem');
cookApp.$name = $('.name');
cookApp.$effect = $('.effect');
cookApp.$image = $('.itemImage');
cookApp.$description = $('.descriptionText');

// make API call for all items in the game (equipment, treasure, creatures, materials, monsters) 
// THEN call fn to reduce data to only the arrays of cookable items
cookApp.getAllItems = () => {
    $.ajax({
        url: 'https://botw-compendium.herokuapp.com/api/v2/all',
        method: 'GET',
        dataType: 'json',
    }).then((result) => {
        cookApp.getCookableItemsArray(result);
    });
}

// From all data, get 2 arrays of cookable items (creatures and materials), then combine those into one reduced array to work with
cookApp.getCookableItemsArray = (wholeObject) => {
    const materialsArray = wholeObject.data.materials;
    const creaturesArray = wholeObject.data.creatures.food;
    reducedArray = [...materialsArray, ...creaturesArray];
}

//listen for the user's selection from the dropdown 'select' element
cookApp.userSelection = () => {
    cookApp.$dropdown.on('change', () => {
        cookApp.$unorderedList.empty();
        chosenEffect = $('option:selected').val();
        cookApp.filterIt(reducedArray, chosenEffect);
    })
}

// Filter array of items - get only items with the user's chosen cooking_effect:
cookApp.filterIt = (array, choice) => {
    const arrayOfItemsWithDesiredEffect = array.filter( (object) => object.cooking_effect === choice);
    cookApp.displayItems(arrayOfItemsWithDesiredEffect);
}

//Display items on the page, including item name, effect, image and description
cookApp.displayItems = (itemArray) => {
    itemArray.forEach( (item) => {
        const effect = item.cooking_effect;
        const name = item.name;
        const img = item.image;
        const description = item.description;
        const newHtml = `
        <li class="listItem">
            <h3 class="name">${name}</h3>
            <p class="effect">${effect}</p>
            <div class="imageContainer">
                <img src="${img}" alt="${name}" class="itemImage">
            </div>
            <div class="descriptionContainer">
                <h4>Description:</h4>
                <p class="descriptionText">${description}</p>
        </div>
    </li>`;
        cookApp.$unorderedList.append(newHtml);
    })
}

// Initializer function
cookApp.init = () => {
    cookApp.getAllItems();
    cookApp.userSelection();
}

//Document ready function
$(function() {
    cookApp.init();
})