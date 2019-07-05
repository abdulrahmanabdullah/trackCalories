// Item Controller 
const ItemController = (function () {
    //Pravite constructor and data structor 
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }


    const data = {
        // load items from local storage
        items : new StorageController.getItemFromLocalStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function () {
            return data.items;
        },
        getDate: function () {
            return data;
        },
        addItems: function (name, calories) {
            // Create Id 
            let _id;
            if (data.items.length > 0) {
                _id = data.items[data.items.length - 1].id + 1;
            } else {
                _id = 0;
            }
            // Set calories as a number 
            calories = parseInt(calories);
            //Create new Item  by calling Item constructor . 
            newItem = new Item(_id, name, calories);
            // Push it into a data array 
            data.items.push(newItem);
            console.log("ADD 👍");
            return newItem
        },
        totalCalories: function () {
            let total = 0;
            //Loop through items and add cals .
            data.items.forEach(item => {
                total += item.calories;
            });
            //Set total cal in data structure .
            data.totalCalories = total;
            //Return total cals.
            return data.totalCalories 
        },
        getItemById : function(id){
            let found = null ;
            data.items.forEach( item =>{
                if(item.id === id ){
                    found = item ;
                }
            })
            data.currentItem = found; 
            return found ;
        },
        setCurrentItem : function(item){
            data.currentItem = item; 
        },
        getCurrentItem : function(){
            return data.currentItem ;
        },
        updateItems : (name,calories)=>{
            // Calories to number 
            calories = parseInt(calories);
            let found = null ;
            data.items.forEach( item =>{
                if(item.id === data.currentItem.id){
                    item.name = name ;
                    item.calories = calories ;
                    found = item ;
                }
            }); 
            return found ;
        },
        deleteItem : function(id){
            // get ids .
            const ids = data.items.map( item =>{
                return item.id ;
            });
            // get index 
            const index = ids.indexOf(id);
            // remove item 
            data.items.splice(index,1); 
        },
        clearAllItems : function(){
            data.items = [];
            data.totalCalories = 0 ;
            data.currentItem = null ;
        }
    }
})();