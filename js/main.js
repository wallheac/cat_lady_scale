// Main JS File for Cat Lady Scale

$(document).ready(function(){

    /*
     * Behavior Class
     * constructor - needs the description and pointValue to construct
     * listItem function - returns the behavior as an html string
     */
    function Behavior (description, pointValue) {
        this.description = description;
        this.pointValue = pointValue;
    }
    Behavior.prototype = {
        getListItem: function () {
            return '<div class="behavior-item">' +
                '<div class="description">' + this.description + '</div>' +
                '<div class="points">' + this.pointValue + '</div>' +
                '</div>';
        },
    }

    /*
     * Status Class
     * constructor - needs the title for the status and a corresponding image
     * imagePath function - returns local path to the image (for using in the src attr)
     */
    function Status (title, image) {
        this.title = title;
        this.image = image;
    }
    Status.prototype = {
        imagePath: function (){
            return 'images/' + this.image;
        }
    }

    /*
     * Cat Lady Behaviors
     * list of all possible behaviors to fill the drop down form
     */
    var catLadyBehaviors = [
        new Behavior("agrees that there's a cat gif for everything", 3),
        new Behavior("own one dog", -2),
        new Behavior("own one cat", 2),
        new Behavior("own more than one cat", 5),
        new Behavior("own more than one dog", -5),
        new Behavior("takes selfies with cats", 4),
        // TODO: add some more behaviors cat lady behaviors here to customize your app!
    ];

    /*
     * Cat Lady Scale
     * description: the cat lady scale is indexed by the number on the scale. Each
     * scale number has an object with a title and image name associated with it.
     */
    var CAT_LADY_SCALE = {
        10: new Status("Cat-sylum", 'cat_lady.jpg' ),
        9: new Status("ALL OF THE CATS", 'all_kittens.jpg' ),
        8: new Status("Takin Selfies With Cats", 'cat_selfie.jpg' ),
        7: new Status("A One-Cat Kind of Human", 'one_cat.jpg' ),
        6: new Status("Cat Gifs Are...Alright", 'grumpy.jpg' ),
        5: new Status("Indifferent", 'cat_dog_friends.jpg' ),
        4: new Status("Ehh, Dogs Greater...", 'cat_backseat.jpg' ),
        3: new Status("Dogs are where it's at", 'dogs.jpg' ),
        2: new Status("I wish I were allergic", 'allergic.jpg' ),
        1: new Status("Cats...like, the musical?", 'cats.jpg' ),
        0: new Status("What's a cat? Never heard of 'em", 'dog_heaven.jpg' ),
    };

    /*
     * Cat Lady Object
     * behaviors - array of behavior objects
     * addBehavior - function that adds behavior and updates cat lady object as necessary
     * status - the current cat lady status object
     * updateStatus - function that updates the cat lady objects status
     */
    var catLady = {
        behaviors: [],
        addBehavior : function (newBehavior) {
            //--------------------------------------------------------------------------------------
            // TODO: Implement the add behavior function. This function should:
            // 1. add the behavior object to the behaviors list in *this* catLady object (<- that
            //    is a hint)...
            // 2. now that a new behavior is added... re-calculate the cat lady status
            //--------------------------------------------------------------------------------------
            this.behaviors.push(newBehavior);
            this.updateStatus();
        },
        status: CAT_LADY_SCALE[5], // just the inital status... INDIFFERENT
        updateStatus: function () {
            //--------------------------------------------------------------------------------------
            // TODO: Implement the evaluate function to calculate where on the scale this cat lady
            // is. This function should:
            // 1. Loop through this catLady's behaviors array, to calculate the sum of all behavior
            //    point values. ** when adding up the point values, start the sum at 5 (indifferent)
            //    on the scale.
            // 2. Update this cat lady's status
            //--------------------------------------------------------------------------------------
            var pointSum = 5;
            for (var i = 0; i < this.behaviors.length; i++){
                pointSum += this.behaviors[i].pointValue;
            }

            var catLadyLevel;
            if (CAT_LADY_SCALE[pointSum] != undefined){
                catLadyLevel = CAT_LADY_SCALE[pointSum];
            } else if ( pointSum > 10 ) {
                catLadyLevel = CAT_LADY_SCALE[10];
            } else if ( pointSum < 0 ) {
                catLadyLevel = CAT_LADY_SCALE[10];
            }

            this.status = catLadyLevel;
        },
    };

    /*
     * Add Behavior Click Event
     * handles when the user adds a behavior
     */
    $('#add-behavior').click(function(e){
        //------------------------------------------------------------------------------------------
        // TODO: Implement the add-behavior event listener. This event listener should use js AND
        // jQuery to update the Cat Lady Scale page upon a user adding a behavior to their cat lady.
        // This event handler should:
        // 1. Prevent the default page reload using jquery.
        // 2. Grab the catLadyBehavior index value from the behavior option in the behavior-select
        //    field located in the html. This will be tricky... before you start try selecting
        //    different options in dropdown and observe what happens to the html.
        // 3. Use the index value from step 2, to get the correct cat lady behavior from the
        //    catLadyBehaviors array.
        // 3. Now add the behavior to the catLady object.
        // 4. Display the newly added behavior with the displayNewBehavior function.
        // 4. Display the cat lady status, with the displayStatus function;
        //------------------------------------------------------------------------------------------
        e.preventDefault();

        // grab behavior from html
        var option = $('#behavior-select option:selected');
        var index = $(option).attr('value');
        var newBehavior = catLadyBehaviors[index];

        catLady.addBehavior(newBehavior); // adds to cat lady
        displayNewBehavior(newBehavior); // show behavior on HTML

        displayStatus(catLady.status); // update catLady status
    });

    /*
     * Display New Behavior
     * add the new behavior to the display behavior list in the html
     */
    function displayNewBehavior (behavior)
    {
        // TODO: this should do:
        // 1. get the list item from the behavior
        // 2. append the list item to the behavior list in the html
        var behaviorItem = behavior.getListItem();
        $('.behavior-list').append(behaviorItem);
    }

    /*
     * Update Status Display
     * updates the cat lady status display in the html with the cat status object it was passed
     */
    function displayStatus (catLadyStatus)
    {
        // TODO:
        // 1. update the status image src in the html
        // 2. update the status title in the html
        var imagePath = catLadyStatus.imagePath();
        $('.status-display .status-image img').attr('src', imagePath);
        $('.status-display .status-title').text(catLadyStatus.title);

    }

    /*
     * Fill Behavior Drop Down
     * adds all behaviors from the catLadyBehaviors array as options in the html dropdown
     */
    function fillBehaviorDropDown ()
    {
        for (var i = 0; i < catLadyBehaviors.length; i++) {
            var description = catLadyBehaviors[i].description;
            var points = catLadyBehaviors[i].pointValue;
            var option = '<option value="' + i +'">' + description + '</option>';
            $('#new-behavior-form .behaviors').append(option);
        }
    }

    /*
     * Updates the selected options in the add behavior drop down
     * the current selected option, will have a select attribute associated with it.
     */
    $('body').on('change', 'select', function(){
        $('option[selected]').removeAttr('selected');
        $("option[value=" + this.value + "]").attr('selected', true);
    });

    // initial setup
    fillBehaviorDropDown(); // fill drop down
    displayStatus(catLady.status); // display initial cat lady status
});
