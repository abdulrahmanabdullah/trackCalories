// UI Controller 
const UIController = (function () {
    const UISelectors = {
        listItem: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        mealNameInput: '#meal-name-input',
        caloriesInput: '#calories-input',
        totalCalories: '.total-calories'
    }

    return {
        populateListItem: function (items) {
            let output = '';
            items.forEach(item => {
                output += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}</strong><em>${item.calories}</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>
            `;
            });
            // Insert item into html 
            document.querySelector(UISelectors.listItem).innerHTML = output;
        },
        // Get all selectors 
        getUISelectors: function () {
            return UISelectors;
        },
        // Get input fields 
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.mealNameInput).value,
                calories: document.querySelector(UISelectors.caloriesInput).value
            }
        },
        // Create new list item 
        createNewItem: function (item) {
            // Make list item visible.
            document.querySelector(UISelectors.listItem).style.display = 'block';
            // Create li element 
            const li = document.createElement("li");
            // add class and id 
            li.className = "collection-item";
            li.id = `item-${item.id}`;
            // make li element accepting arabic language .
            li.dir = 'rtl';
            // add html 
            li.innerHTML = `
                <strong>${item.name}:\t</strong><em>${item.calories} calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            `;
            // Insert item 
            document.querySelector(UISelectors.listItem).insertAdjacentElement('beforeend', li);
        },
        clearInputs: function () {
            document.querySelector(UISelectors.mealNameInput).value = '';
            document.querySelector(UISelectors.caloriesInput).value = ''
        },
        // hide item list when it's empty . 
        hideListItem: function () {
            document.querySelector(UISelectors.listItem).style.display = 'none';
        },
        showTotalCalories: function (total) {
            document.querySelector(UISelectors.totalCalories).textContent = total;
        },
        clearEditState: function () {
            // clear inputs and hide a three buttons - update,delete and back
            UIController.clearInputs();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';

        },
        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';

        },
        loadCurrentItemToFrom: function (item) {
            // document.querySelector(UISelectors.mealNameInput).value =ItemController.getCurrentItem().name ; 
            // document.querySelector(UISelectors.caloriesInput).value =ItemController.getCurrentItem().calories ; 
            document.querySelector(UISelectors.mealNameInput).value = item.name;
            document.querySelector(UISelectors.caloriesInput).value = item.calories;
            UIController.showEditState();
        },
        udpateListItem: (item) => {
            let listItem = document.querySelectorAll(UISelectors.listItems);
            // turn list item into array 
            listItem = Array.from(listItem);
            listItem.forEach(value => {
                const itemId = value.getAttribute('id');
                if (itemId === `item-${item.id}`) {
                    document.querySelector(`#${itemId}`).innerHTML = `
                        <strong>${item.name}:\t</strong><em>${item.calories} calories</em>
                        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                    `;
                }
            });
        },
        deleteItem: (id) => {
            const itemId = `#item-${id}`;
            const item = document.querySelector(itemId);
            item.remove();
        },
        clearAllItems: function () {
            let listItem = document.querySelectorAll(UISelectors.listItems);
            if (listItem !== null) {
                // trun list item into array 
                listItem = Array.from(listItem);
                // through all node in list item 
                listItem.forEach(item => {
                    item.remove();
                });
            } else {
                alert("You don't add any foods ");
            }
        }
    }
})();