function myfun() {
		var t = 1;
		var loadUrl = "http://localhost:8080/NewTrainStatus/TrainStatusServlet?StationCode=NDLS&json=true";
        $.ajax({
                  type: "GET",
      	          url: loadUrl,
                  dataType: "json",
                  data: {},
                  success: function (data) {          
                  try {

                        if (data != null) {
                        				  var i = 0;
              	  						  $.each(data, function(key, val){
              	  						  						var row =$("<div class='row'></div>");
              	  						  				        $.each(val, function(k, v){
                  														if(k =="train_number" || k =="train_name" || k =="scheduled_arrival" )
                  														{
	                 														$("<div class='column'>"+v+"</div>").appendTo(row);
	                 														
                  														}
                  												});
                  												if(i == 5)
                  												{
                  												
                  												}
                  												function sec()
                  												{
                  													setTimeout(function(){
                  													$('#display').empty();
                  													},5000)
                  												}
                  												row.appendTo('#display');
                  											    i++;
                  							});
                  		}
                     }
                  catch (error) {
                        	
                      $("#td1").html("0");
                      $("#td2").html("0");
                            
                                }
                                },
                                
                  error: function (req, status, error) {
				      //debugger;
                      $("#td1").html("01");
                      $("#td2").html("0");
                                }
            });
 
        }
  
