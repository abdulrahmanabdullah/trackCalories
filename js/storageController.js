const StorageController = (function () {
    const REF_ITEM = "items";

    const hasLocalEmpty = function () {
        if (localStorage.getItem(REF_ITEM) === null) {
            return true;
        }
        return false;
    }
    // public methods 
    return {
        storeItem: function (item) {
            let items;
            // check if any items in local storage 
            if (hasLocalEmpty()) {
                items = [];
                // add new item
                items.push(item);
                // store new item in local storage 
                localStorage.setItem(REF_ITEM, JSON.stringify(items));
            } else {
                items = JSON.parse(localStorage.getItem(REF_ITEM));
                // push the new item 
                items.push(item);
                // reset local storage 
                localStorage.setItem(REF_ITEM, JSON.stringify(items));
            }
        },
        getItemFromLocalStorage: function () {
            let items;
            if (hasLocalEmpty()) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem(REF_ITEM));
            }
            return items;
        },
        updateItemStorage: function (updatedItem) {
            let items = JSON.parse(localStorage.getItem(REF_ITEM));
            items.forEach((item, index) => {
                if (updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem(REF_ITEM, JSON.stringify(items));
        },
        deleteItem: function (id) {
            let items = JSON.parse(localStorage.getItem(REF_ITEM));
            items.forEach((item, index) => {
               if(item.id === id){
                   items.splice(index,1);
               } 
            });
            localStorage.setItem(REF_ITEM, JSON.stringify(items));
        },
        deleteAllItems : function(){
            localStorage.removeItem(REF_ITEM);
        }
    }
})();