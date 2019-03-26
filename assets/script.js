$(document).ready(function(){
  //click event handler added to the add interest button
  $(".addBtn").on("click", function(){
   //input equals an object with the parameters name and searchTerm
    var input = {

      name:$(".form-control").val(),

      searchTerm:$(".form-control").val().trim()

  }

    console.log(input)
    //pushes the user input to the interests array
    interests.push(input)

    console.log(interests)
    //calls the add buttons function to add buttons for the interests array
    addBtns(interests)
  })
  //interests array of objects, each object will be made a button
  var interests =[
    { name: "Doggo", searchTerm:"Dog"},
    { name: "Andy Dwyer", searchTerm:"Andy Dwyer"},
    { name: "Meow", searchTerm:"cat"},
    { name: "Life, Uhh, Finds A Way", searchTerm:"life finds a way"}
  ];
  //defines our addBtns function which first removes existing buttons and then makes new buttons for every object in the array that is passed to it as a parameter
  function addBtns(array){
    
    //removes buttons, necessary so we don't get duplicates
    $(".button").remove();
    //iterator set to -1 so that it will equal 0 during the 1st iteration of the forEach() jQuery function below
    var i = -1;
    
    //iterates through the array and adds buttons with the text of the name property
    array.forEach(function(){
      i++
      //var is declared equal to a new button and the text of the name prop.
      var button = $("<button>").text(array[i].name);
      
      console.group(button);

      //var button is appended to the .buttonContainer div, adds classes and the searchTerm parameter to each button
      $(".buttonContainer")
      .append(button.addClass("button btn-primary btn")
      .attr("data-searchTerm", array[i].searchTerm
      ));
      
    })
    //event handler for the buttons to call the getResult funciton when any one of the buttons are clicked on 
    $(".button").on("click",getResult)
  }
// defines variables relative to which button is clicked and makes the Asynchronous JavaScript query (allows us to make a request to the GIPHY server without interfering with the rest of the code)
  function getResult(){
    //term is equal to the button's searchTerm parameter, .this refers to the button
    var term = $(this).attr("data-searchTerm")

    //console.log(this)

    //console.log(term)
    
    //the queryURL that will be passed to the ajax query, dynamic to change to the buttons searchTerm parameter
    var queryURL="https://api.giphy.com/v1/gifs/search?q=" +term+ "&api_key=Nf1OoSvl227FDKOch0nXoK0SDl5Szz0V";
    
    //console.log(queryURL);
    
    $.ajax({
    
      method:"GET",
      url:queryURL
      //promise which runs after we get a response from the GIPHY server
    }).then(function(response){
      console.log(response);
      //adds a click event handler on gifs
      $(".gif").on("click",function(){

        if(state===animated){
          $(this).attr("src", urlStill)
        }
      })

      var i = -1;
      

      response.data.forEach(function(){
        
        i++
        //random number
        var random = Math.floor(Math.random()*19);
        //array to hold random numbers in order
        var randomArray = [];
        //push method random number to random array
        randomArray.push(random);
        console.log(randomArray[i])

        var urlAnimatedArray=[];

        var urlStillArray=[];

        var urlAnimated = response.data[randomArray[i]].images.fixed_height.url;

        urlAnimatedArray.push(urlAnimated);

        var urlStill = response.data[i].images.fixed_height_still.url;

        urlStillArray.push(urlStill);

        var rating = response.data[i].rating
        console.log(rating)


        
        var gif = $("<img>").attr({
          "src":response.data[randomArray[i]].images.fixed_height.url,
          "animated":true,
          "location":i
        }).addClass("gif");

        $(".gif").append($("<p>").text("Rating: " + rating));

        $(".results").prepend(gif);

        

        $(".gif").on("click",function(){

          if(this.animated === true){

            $(this).attr("src", urlStillArray[this.location])

            this.animated = false;

            console.log(this)
          }
          else if(this.animated === false){

            $(this).attr("src", urlAnimated)

            animated = true;
          }
        })
      })
    })
  }
  addBtns(interests);
})