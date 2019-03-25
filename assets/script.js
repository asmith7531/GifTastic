$(document).ready(function(){
  
  $(".addBtn").on("click", function(){
   
    var input = {
      name:$(".form-control").val(),
      searchTerm:$(".form-control").val().trim()
  }

    console.log(input)
    interests.push(input)

    console.log(interests)
    addBtns(interests)
  })

  var interests =[
    { name: "Doggo", searchTerm:"Dog"},
    { name: "Andy Dwyer", searchTerm:"Andy Dwyer"},
    { name: "Meow", searchTerm:"cat"},
    { name: "Life, Uhh, Finds A Way", searchTerm:"life finds a way"}
  ];
  

  function addBtns(array){
    
    //removes buttons so we don't get duplicates
    $(".button").remove();
    
    var i = -1;
    
    //iterates through the array and adds buttons with the text of the name property
    array.forEach(function(){
      i++
      //var is declared equal to a new button and the text of the name prop.
      var button = $("<button>").text(array[i].name);
      
      console.group(button);
      //var button is appended to the .buttons div

      $(".buttonContainer")

      .append(button.addClass("button btn-primary btn")
      .attr(
        "data-searchTerm", array[i].searchTerm
      ));
      
    })

    $(".button").on("click",getResult)
  }

  function getResult(){

    var term = $(this).attr("data-searchTerm")

    console.log(this)

    console.log(term)

    var queryURL="http://api.giphy.com/v1/gifs/search?q=" +term+ "&api_key=Nf1OoSvl227FDKOch0nXoK0SDl5Szz0V&limit=5";
    
    console.log(queryURL);
    
    $.ajax({
    
      method:"GET",
      url:queryURL
      
    }).then(function(response){
      console.log(response);
      
      var i = -1;

      response.data.forEach(function(){
        
        i++

        var url = response.data[i].images.fixed_height.url;

        var gif = $("<img>").attr("src",url).addClass("gif")

        $(".results").prepend(gif);

        console.log(url)
      })
      

     

      
    })
    
  }
  
  
  addBtns(interests);
  
})