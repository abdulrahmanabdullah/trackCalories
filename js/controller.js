const AppController = (function (itemController, uiController, storageController) {
    // Get  selectors 
    let uiSelectors = uiController.getUISelectors();
    // Load event listenre 
    const loadEventListener = function () {
        document.querySelector(uiSelectors.addBtn).addEventListener('click', addItemSubmit);
        //Disable submit when press enter 
        document.addEventListener('keypress', e => {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
        document.querySelector(uiSelectors.listItem).addEventListener('click', itemEditClick);
        document.querySelector(uiSelectors.updateBtn).addEventListener('click', updateItemSubmit);
        document.querySelector(uiSelectors.deleteBtn).addEventListener('click', deleteItemListener);
        document.querySelector(uiSelectors.clearBtn).addEventListener('click', clearAllItemsListener);
    }
    // Add item submitted 
    const addItemSubmit = function (e) {
        // Get form input from UIController 
        const inputs = uiController.getItemInput();
        if (inputs.name !== '' && inputs.calories !== '') {
            const newItem = itemController.addItems(inputs.name, inputs.calories);
            // Call UIController to create li for newItem and add it in list.
            uiController.createNewItem(newItem);
            //Get total calories 
            const totalCalories = itemController.totalCalories();
            //Add totalCalories to UI 
            uiController.showTotalCalories(totalCalories);
            // store items in storage . 
            storageController.storeItem(newItem);
            // Clear inputs 
            uiController.clearInputs();
        }
        e.preventDefault();
    }

    /**
     * @param {e} event listener 
     * get event by class name then 
     * get id, Seperate id name to two parts 
     * send id to model.js and get the item object 
     * after that set current item and load current item into form .
     */
    const itemEditClick = function (e) {
        // if(e.target.nodeName === "I"){
        //     console.log("clicked");
        // }
        if (e.target.classList.contains('edit-item')) {
            let listId = e.target.parentNode.parentNode.id; // id =item-0, item-1 and so on .
            //Breaking into an array and getting numbers 
            let listIdArr = listId.split('-'); // this it's => ['item', '0']
            // Get the actual id 
            let id = parseInt(listIdArr[1]); // get the last element in array 
            //Get item
            let currentItem = itemController.getItemById(id);
            // repleace null current item in data in model.js with currentItem 
            // itemController.setCurrentItem(currentItem);
            //Load currentItem to form 
            uiController.loadCurrentItemToFrom(currentItem);
        }
        e.preventDefault();
    }

    // update item submit 
    const updateItemSubmit = function (e) {
        // Get inputs values 
        const inputs = uiController.getItemInput();
        // update item in Structure model.js.
        const updatedItem = itemController.updateItems(inputs.name, inputs.calories);
        // update item in UI view.js .
        uiController.udpateListItem(updatedItem);
        // store item after updated ... 
        storageController.updateItemStorage(updatedItem);
        //Get total calories 
        const totalCalories = itemController.totalCalories();
        //Add totalCalories to UI 
        uiController.showTotalCalories(totalCalories);
        // hide update,delete and back buttons 
        uiController.clearEditState();
        e.preventDefault();
    }
    // Back button event 
    document.querySelector(uiSelectors.backBtn).addEventListener('click', e => {
        uiController.clearEditState();
        e.preventDefault();
    })
    // Delete button event 
    const deleteItemListener = function(e){
        let currentItem = itemController.getCurrentItem();
        //delete from data structure 
        itemController.deleteItem(currentItem.id);
        // delete from UI
        uiController.deleteItem(currentItem.id);
        // delete current item from storage 
        storageController.deleteItem(currentItem.id);
        //Get total calories 
        const totalCalories = itemController.totalCalories();
        //Add totalCalories to UI 
        uiController.showTotalCalories(totalCalories);
        // hide update,delete and back buttons 
        uiController.clearEditState();
        e.preventDefault();
    }
    //Clear all items event 
    const clearAllItemsListener = function(e){
        // delete all items from data structure .
        itemController.clearAllItems();
        // delete all items from UI 
        uiController.clearAllItems();
        // delete all items from storage 
        storageController.deleteAllItems();
        // get total calories 
        const totalCalories = itemController.totalCalories();
        // add totalCalories to UI 
        uiController.showTotalCalories(totalCalories);
        // hide ul list 
        uiController.hideListItem();

        e.preventDefault();
    }
    //Public methods
    return {
        init: function () {
            //Hide a three buttons , update,delete and back .
            uiController.clearEditState();
            let items = itemController.getItems();
            // when no any items 
            if (items.length === 0) {
                uiController.hideListItem();
            } else {
                //Send all items to HTML UI .
                uiController.populateListItem(items);
            }
            //Load event listener 
            loadEventListener();
        }
    }
})(ItemController, UIController, StorageController);