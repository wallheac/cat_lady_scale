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
        new Behavior("owns costumes for cats", 5),
        new Behavior("prefers cat to people", 3),
        new Behavior("carries on conversations with cats", 3),
        new Behavior("doesn't know what a lint roller is", -2),
        new Behavior("can name at least three cat breeds", 2)
        // -----------------------------------------------------------------------------------------
        // TODO: CHALLENGE 1
        // add some more behaviors cat lady behaviors here to customize your app!
        // -----------------------------------------------------------------------------------------
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
     var currSum = 5,
          prevSum = 5; // for use in displaying the cat lady scale
    var catLady = {
        behaviors: [],
        addBehavior : function (newBehavior, direction) {
            //--------------------------------------------------------------------------------------
            // TODO: CHALLENGE 2
            // Implement the add behavior function. This function should:
            // 1. add the behavior object to the behaviors list in *this* catLady object (<- that
            //    is a hint)...
            // 2. now that a new behavior is added... update *this* cat lady's status (hint you
            //    should just call a function in this object)
            //--------------------------------------------------------------------------------------
            this.behaviors.push(newBehavior);
            this.updateStatus(newBehavior, direction);
        },
        status: CAT_LADY_SCALE[5], // just the inital status... INDIFFERENT
        updateStatus: function (newBehavior, direction) {
            //--------------------------------------------------------------------------------------
            // TODO: CHALLENGE 8
            // Implement the evaluate function to calculate where on the scale this cat lady
            // is. This function should:
            // 1. Loop through this catLady's behaviors array, to calculate the sum of all behavior
            //    point values. ** when adding up the point values, start the sum at 5 (indifferent)
            //    on the scale.
            //--------------------------------------------------------------------------------------
            //do I need to make this a function? I don't think so
              //var length = this.behaviors.length;
              prevSum = currSum;
              //for(var i = 0; i < length; i++){
              if(direction == 'add'){
                currSum += newBehavior.pointValue;
              }
              if(direction == 'subtract'){
                currSum -= newBehavior.pointValue;
              }
              if(currSum > 10){
                currSum = 10;
              }//account for too much catness
              if(currSum < 0){
                currSum=0;
              }//account for too little catness
            //--------------------------------------------------------------------------------------
            // TODO: CHALLENGE 9
            // Use the pointValue sum to determine where on the scale this cat lady is. Match the
            // sum to a value in the CAT_LADY_SCALE object. Get the Status object, located at the
            // corresponding scale position. And then update this catLady status property.
            //--------------------------------------------------------------------------------------
            this.status = CAT_LADY_SCALE[currSum];
        },
    };
//END OF catLady object
//draw Scale
var scale = $('<div class="scale-display"></div>');
for(var i = 0; i <= 10; i ++){
  $(scale).append('<div class="scale-item"><div class="circle"id=circle-'+
   i +' data-status="'+ CAT_LADY_SCALE[i].title +'"></div><p id=p-'+i+'>'+i+'</p></div>');
}
$('.status-scale').append(scale);

    /*
     * Add Behavior Click Event
     * handles when the user adds a behavior
     */
     //---------------------------------------------------------------------------------------------
     // TODO:
     // Implement the add-behavior event listener. This event listener should use js AND
     // jQuery to update the Cat Lady Scale page upon a user adding a behavior to their cat lady.
     // (see individual challenges below)
     //---------------------------------------------------------------------------------------------
    //$('#add-behavior').click(function(e){
        //------------------------------------------------------------------------------------------
        // TODO: CHALLENGE 4
        // 1. Prevent the default page reload using jquery.
        //------------------------------------------------------------------------------------------
        //event.preventDefault();
        //------------------------------------------------------------------------------------------
        // TODO: CHALLENGE 5
        // 2. Grab the catLadyBehavior index value from the behavior option in the behavior-select
        //    field located in the html. This will be tricky... before you start try selecting
        //    different options in dropdown and observe what happens to the html.
        //------------------------------------------------------------------------------------------
        //var index = $('#behavior-select').find(":selected").val();

        //listen for change on behaviors checkboxes
        $('.new-behavior').on('change', 'input:checkbox', function(){
          event.preventDefault();
          var index = $(this).val();
              direction = 'add';
          if($(this).is(':checked')){
            direction = 'add';
          }
          else{
            direction = 'subtract';
          }


        //------------------------------------------------------------------------------------------
        // TODO: CHALLENGE 6
        // 3. Use the index value from step 2, to get the correct cat lady behavior from the
        //    catLadyBehaviors array.
        // 4. Now add the behavior to the catLady object.
        //------------------------------------------------------------------------------------------
        var behavior = catLadyBehaviors[index];
        catLady.addBehavior(behavior, direction);
        //------------------------------------------------------------------------------------------
        // TODO: CHALLENGE 7
        // 5. Display the newly added behavior with the displayNewBehavior function.
        //------------------------------------------------------------------------------------------
        displayNewBehavior(behavior);
        //------------------------------------------------------------------------------------------
        // TODO: CHALLENGE 10
        // 1. Display the cat lady status, with the displayStatus function;
        //------------------------------------------------------------------------------------------
        displayStatus(catLady.status);
    });

    /*
     * Display New Behavior
     * add the passed in behavior to the display in the behavior list in the html
     */
    function displayNewBehavior(behavior)
    {
        //------------------------------------------------------------------------------------------
        // TODO: CHALLENGE 3
        // Here you should use jquery to to add the correct behavior item div to the behavior-list
        // element (see html file). To do this:
        // 1. get the list item from the behavior object (see the behavior prototype)
        // 2. append the list item to the behavior list element in the html
        //------------------------------------------------------------------------------------------
        var temp = $(behavior.getListItem());//this does return a node
        $(temp).appendTo('.behavior-list');
    }

    /*
     * Update Status Display
     * updates the cat lady status display in the html with the cat status object it was passed
     */
    function displayStatus (catLadyStatus)
    {
        //------------------------------------------------------------------------------------------
        // TODO: CHALLENGE 11
        // Here you should use jquery to to update the Cat Lady Status Display. To do this:
        // 1. update the status image src in the html
        // 2. update the status title in the html
        // ** make sure to checkout the status object for help!
        //------------------------------------------------------------------------------------------
        $('.status-image img').attr('src', catLadyStatus.imagePath());
        $('.status-title').html(catLadyStatus.title);
        //var key = findKey(catLadyStatus);
        //move the indicator button
        $('#circle-'+ prevSum).css('background', 'white');
        $('.circle p-' + prevSum).css('font-weight', 'normal');
        $('#circle-'+ currSum).css('background', 'red');
        $('.circle p-'+currSum).css('font-weight', 'bold');

        $('#circle-'+currSum).hover(
          function(){
            $(this).css('position', 'relative');
            $(this).append('<div class="hover-title"><p>'+CAT_LADY_SCALE[currSum].title+'</p></div>')
          },
          function(){
            $('.hover-title').remove();
          }
        );
    }

    /*
     * Fill Behavior Drop Down
     * adds all behaviors from the catLadyBehaviors array as options in the html dropdown
     */
    function fillBehaviorDropDown ()
    {
        for (var i = 0; i < catLadyBehaviors.length; i++) {
          let newInput = $('<div class="checkbox"></div>');
          $(newInput).append('<p>'+catLadyBehaviors[i].description+'</p>');
          $(newInput).append('<input type="checkbox" name="checkbox" id="checkbox-'+
          i+'" value='+i+'>');

          $('#new-behavior-form').append(newInput);



            //var description = catLadyBehaviors[i].description;
            //var points = catLadyBehaviors[i].pointValue; //why is this here?
            //var option = '<option value="' + i +'">' + description + '</option>';
            //$('#new-behavior-form .behaviors').append(option);
        }
    }
/*ask why this DID NOT WORK
    function findKey(catLadyStatus){
      $.each(CAT_LADY_SCALE, function(index, value){
        console.log(index +': ' + value.title);
        //if(value.title == catLadyStatus.title){
          //return index;
        //}
      });
    }*/

    /*
     * Updates the selected options in the add behavior drop down
     * the current selected option, will have a select attribute associated with it.
     */
  /*  $('body').on('change', 'select', function(){
        $('option[selected]').removeAttr('selected');
        $("option[value=" + this.value + "]").attr('selected', true);
    });*/

    // initial setup
    fillBehaviorDropDown(); // fill drop down
    displayStatus(catLady.status); // display initial cat lady status
});
