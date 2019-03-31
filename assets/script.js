$(document).ready(function() {
  //click event handler added to the add interest button
  $(".addBtn").on("click", function() {
    //input equals an object with the parameters name and searchTerm
    var input = {
      name: $(".form-control").val(),

      searchTerm: $(".form-control")
        .val()
        .trim()
    };

    console.log(input);
    //pushes the user input to the interests array
    interests.push(input);

    console.log(interests);
    //calls the add buttons function to add buttons for the interests array
    addBtns(interests);
  });
  //interests array of objects, each object will be made a button
  var interests = [
    { name: "Doggo", searchTerm: "Dog" },
    { name: "Andy Dwyer", searchTerm: "Andy Dwyer" },
    { name: "Meow", searchTerm: "cat" },
    { name: "Life, Uhh, Finds A Way", searchTerm: "life finds a way" }
  ];
  //defines our addBtns function which first removes existing buttons and then makes new buttons for every object in the array that is passed to it as a parameter
  function addBtns(array) {
    //removes buttons, necessary so we don't get duplicates
    $(".button").remove();
    //iterator set to -1 so that it will equal 0 during the 1st iteration of the forEach() jQuery function below
    var i = -1;

    //iterates through the array and adds buttons with the text of the name property
    array.forEach(function() {
      i++;
      //var is declared equal to a new button and the text of the name prop.
      var button = $("<button>").text(array[i].name);

      console.group(button);

      //var button is appended to the .buttonContainer div, adds classes and the searchTerm parameter to each button
      $(".buttonContainer").append(
        button
          .addClass("button btn-primary btn")
          .attr("data-searchTerm", array[i].searchTerm)
      );
    });
    //event handler for the buttons to call the getResult funciton when any one of the buttons are clicked on
    $(".button").on("click", getResult);
  }
  // defines variables relative to which button is clicked and makes the Asynchronous JavaScript query (allows us to make a request to the GIPHY server without interfering with the rest of the code)
  function getResult() {
    //term is equal to the button's searchTerm parameter, .this refers to the button
    var term = $(this).attr("data-searchTerm");

    //console.log(this)

    //console.log(term)

    //the queryURL that will be passed to the ajax query, dynamic to change to the buttons searchTerm parameter
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      term +
      "&api_key=Nf1OoSvl227FDKOch0nXoK0SDl5Szz0V";

    //console.log(queryURL);
    var gifArray = [];
    //adds a click event handler on gifs

    $.ajax({
      method: "GET",
      url: queryURL
      //promise which runs after we get a response from the GIPHY server
    }).then(function(response) {
      console.log(response);

      response.data.forEach(function(element) {
        //creating our gif var w/ the data attributes we will need
        var gif = $("<img>").attr({
          src: element.images.fixed_height.url,
          "data-animated": true,
          "data-src": element.images.fixed_height.url,
          "data-stillsrc": element.images.fixed_height_still.url
        });

        //accesses the gifs rating from giphy
        var rating = element.rating.toUpperCase();

        //prepending a div to the result class in our html file
        $(".results")
        .prepend(
          $("<div>")
          .addClass("container")
            //appending the gif and adding the class "gif"
            .append(gif.addClass("gif"),
          //appending <p> with the rating var interpolated to the new div container (not the img tag, can't do that, struggled with that one for awhile)
          $("<p>").text("Rating: " + rating)))
        
      });
      console.log(gifArray);

      //adding a click event listener to all items in the document with the class "gif"
      $(document).on("click", ".gif", function() {
        // console.log(this)
        // console.log(this.dataset.animated)
        // console.log(this.dataset.src)

        //if the animated attr of our clicked .gif element is equal to true
        if (this.dataset.animated === "true") {
          //console.log(this);
          //then set the source url to the still img and the animated attr to false, this pauses our gif
          $(this).attr({
            src: this.dataset.stillsrc,
            "data-animated": false
          });
        } else {
          $(this).attr({
            src: this.dataset.src,
            "data-animated": true
          });
          animated = true;
        }
      });
    });
  }
  addBtns(interests);
});
