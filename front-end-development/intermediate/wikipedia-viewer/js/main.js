$(document).ready(function() {
    
  $(".search-btn").click(function () {
      $(".search-results").text("");
      var query = $(".search-query").val();
  
  //https://en.wikipedia.org/w/api.php?action=opensearch&format=jsonfm&search=hello&callback=?
    
    var wikiURL = "https://en.wikipedia.org/w/api.php?";
    var action = "action=opensearch";
    var search = "&search=" + encodeURIComponent(query);
    //var props = "&prop=revisions&rvprop=content";
    var format = "&format=json";
    var callback = "&?callback=?";
    //var wikiURL = endpointURL + action + search + format + callback;

    $.ajax({
    url: wikiURL,

    // The name of the callback parameter
    jsonp: "callback",

    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",


    data: {
      action: "opensearch",
      search: encodeURIComponent(query),
      format: 'json'
    },

    // Work with the response
    success: function( data ) {
          if (data[1].length === 0)
            {
              $(".search-results").append("<div class='panel panel-danger'><div class='panel-heading'>No results found for " + query + "</div></div>");
            }
         else
          for(var i=0; i<data[1].length; i++)
            {
              $(".search-results").append("<div class='panel panel-success'><div class='panel-heading'><a href=" + data[3][i] +" target='_blank'>" + data[1][i] + "</a></div><div class='panel-body'>" + data[2][i] + "</div></div>");    
            }
      }

    });
    
  
	});//end search-btn click
  
});//end document ready
