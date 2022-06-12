const cookApp = {}

let reducedArray = []

cookApp.$dropdown = $('#userEffectSelection');
cookApp.$unorderedList = $('.unorderedList');
cookApp.$listItem = $('.listItem');
cookApp.$name = $('.name');
cookApp.$effect = $('.effect');
cookApp.$image = $('.itemImage');
cookApp.$description = $('.descriptionText');

cookApp.getAllItems = () => {
    $.ajax({
        url: 'https://botw-compendium.herokuapp.com/api/v2/all',
        method: 'GET',
        dataType: 'json',
    }).then((result) => {
        cookApp.getCookableItemsArray(result);
    });
}

cookApp.getCookableItemsArray = (wholeObject) => {
    const materialsArray = wholeObject.data.materials;
    const creaturesArray = wholeObject.data.creatures.food;
    reducedArray = [...materialsArray, ...creaturesArray];
}

cookApp.userSelection = () => {
    cookApp.$dropdown.on('change', () => {
        cookApp.$unorderedList.empty();
        chosenEffect = $('option:selected').val();
        cookApp.filterIt(reducedArray, chosenEffect);
    })
}

cookApp.filterIt = (array, choice) => {
    const arrayOfItemsWithDesiredEffect = array.filter( (object) => object.cooking_effect === choice);
    cookApp.displayItems(arrayOfItemsWithDesiredEffect);
}

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

cookApp.init = () => {
    cookApp.getAllItems();
    cookApp.userSelection();
}

$(function() {
    cookApp.init();
})