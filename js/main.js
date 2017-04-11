// Main JS File for Cat Lady Scale

// TODO:
// add cat lady scale images
// implement the add behavior function
// brain storm other functionality you could add to this...
// update the document with the order of challenges...
// add a remove button to the behavior list
// add a displayed cat lady scale... or have then do this...

$(document).ready(function(){

    // Cat Lady Behaviors
    // description: list of all possible behaviors to fill the drop down form
    var catLadyBehaviors = [
        { behavior: "agrees that there's a cat gif for everything", pointValue: 3 },
        { behavior: "own one dog", pointValue: -2 },
        { behavior: "own one cat", pointValue: 2 },
        { behavior: "own more than one cat", pointValue: 5 },
        { behavior: "own more than one dog", pointValue: -5 },
        { behavior: "takes selfies with cats", pointValue: 4 },
        // TODO: add some more behaviors here with a description and a pointValue associated with it...
    ];

    // Cat Lady Scale
    // description: the cat lady scale is indexed by the number on the scale. Each
    // scale number has an object with a title and image name associated with it.
    var catLadyScale = {
        10: {title: "Cat-sylum", image: 'cat_lady.jpg' },
        9: {title: "ALL OF THE CATS", image: 'all_kittens.jpg' },
        8: {title: "Takin Selfies With Cats", image: 'cat_selfie.jpg' },
        7: {title: "A One-Cat Kind of Human", image: 'one_cat.jpg' },
        6: {title: "Cat Gifs Are...Alright", image: 'grumpy.jpg' },
        5: {title: "Indifferent", image: 'cat_dog_friends.jpg' },
        4: {title: "Ehh, Dogs Greater...", image: 'cat_backseat.jpg' },
        3: {title: "Dogs are where it's at", image: 'dogs.jpg' },
        2: {title: "I wish I were allergic", image: 'allergic.jpg' },
        1: {title: "Cats...like, the musical?", image: 'cats.jpg' },
        0: {title: "What's a cat? Never heard of 'em", image: 'dog_heaven.jpg' },
    };

    // Cat Lady Object
    var catLady = {
        behaviors: [],
        addBehavior : function (behavior, pointValue) {
            // TODO: implement the Add Behavior function
            // description: this function should add the passed in behavior and pointValue to
            // the behaviorList array and return the new behvior object
        },
        level: function () {
            // TODO: implement this function to calculate where on the cat lady scale this cat lady is
            // descrition: this function should loop through the behaviors associated with this cat lady
            // and return the calculated cat lady level (the sum of all behavior point values)
            // the pointValue should start at 5 (indifferent on the cat lady scale.. then add behaviors to that)
            // hint: you will have to use this. to access the behaviors array
            var pointSum = 5;
            return pointSum; // TODO: do I want this to return the object or the number?
        },
    }

    // Add Behavior to Behavior History
    $('#add-behavior').click(function(){
        // TODO: implement this function
        // description: this event handler should do:
        //   1) get behavior information (behavior text and pointValue) from the form
        //   2) add a behavior the behavior to the cat lady object
        //   3) display the new behavior in the behavior-list (html)
        //   4) update the displayed cat lady level image and title
        //   5) clear the add behavior form
    });

    function fillBehaviorDropDown ()
    {
        for (var i = 0; i < catLadyBehaviors.length; i++) {
            var behavior = catLadyBehaviors[i].behavior;
            var points = catLadyBehaviors[i].pointValue;
            var option = '<option value="">' + behavior + '</option>';
            console.log(option);
            $('#new-behavior-form .behaviors').append(option);
        }
    }

    fillBehaviorDropDown();
});
