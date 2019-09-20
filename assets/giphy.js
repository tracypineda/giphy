
$(document).ready(function(){

    var animals = ["llamas", "kittens", "chickens", "pigs"];
         // $("button").on("click", function () {
    var animal = "";
             
    function renderButtons() {
                 
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();
        $("#giphy-input").val("");
        
        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {
            
            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("animal");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", animals[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(animals[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(a);
            console.log(animals);
            
        }
    }
    
    $("#add-giphy").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        
        // This line will grab the text from the input box
        animal = $("#giphy-input").val().trim();
        // The movie from the textbox is then added to our array
        animals.push(animal);
        console.log(animals)
        
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    $("#buttons-view").on("click", "button", function () {
        console.log($(this))
        // In this case, the "this" keyword refers to the button that was clicked
        animal = $(this).attr("data-name");
        
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
        console.log(animal);
        
        // Performing our AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
          // After the data comes back from the API
          .then(function (response) {
              // Storing an array of results in the results variable
              var results = response.data;
              
              // Looping over every result item
              for (var i = 0; i < results.length; i++) {
                  
              // Only taking action if the photo has an appropriate rating
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                  // Creating a div for the gif
                  var gifDiv = $("<div>");
                  
                  // Storing the result item's rating
                  var rating = results[i].rating;
                  
                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + rating);
                  
                  // Creating an image tag
                  var animalImage = $("<img>");
                  
                  // Giving the image tag an src attribute of a proprty pulled off the
                  // result item
                  animalImage.attr("src", results[i].images.fixed_height_still.url);
                  
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(animalImage);
                
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
            }
            }
        });
    });
    
    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();
})