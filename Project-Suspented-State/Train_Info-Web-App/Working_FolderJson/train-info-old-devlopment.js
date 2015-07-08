
array = [];
var masterTimer = 0;
var myTime1;
var myTime2;
var myTime3;
var myTime4;
var myTime5;
var myTime6;
var myTime7;
var myTime8;
var myTime9;
var myTime10;
function myfun() {
		var t = 1;
	    var loadUrl = "http://localhost:8080/NewTrainStatus/TrainStatusServlet?StationCode=NDLS&json=true";
		//var loadUrl = "file:///media/HDD%20500/Current_Working/Train_Info-Web-App/Working_FolderJson/dep1/train.txt";
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
              	  						  					$.each(val, function(k, v){
                  														if(k =="train_number" || k =="train_name" || k =="scheduled_arrival" )
                  														{
	                 														array.push(v);
	                 													}
                  												});
                  					      });
                  					      display_info();
                  		}
                     }
                  catch (error) {
                     			  window.alert("error!");
                                }
                                },
               });
 
         }   
Array.prototype.clear = function()
{
	array.length = 0;
}    			 
function display_info(){
			 l = array.length;
    		 var order = 0;
    		 var div1 = 0;
    		 var div2 = 0;
    		 var div3 = 0;
    		 var div4 = 0;
    		 var div5 = 0;
    		 var div6 = 0;
    		 var div7 = 0;
    		 var div8 = 0;
    		 var div9 = 0;
    		 var div10 = 0;
    		 var v = 1;
    		 var count = 0;
    		 $('#display2').hide();
    		 $('#display3').hide();
    		 $('#display4').hide();
             $('#display5').hide();
             $('#display6').hide();
             $('#display7').hide();
             $('#display8').hide();
             $('#display9').hide();
             $('#display10').hide();
   			 for(var i = 0; i<l; i++)
   			 {
   			 	var vl = array[i];
   			 	
           		if (order < 15)
   			 	{
   			 		if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display1');
           					order++;
           					div1 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display1');
           					order++;
           					div1 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
   			 	}
    			else if (order >= 15 && order < 30)
    			{
    				if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display2');
           					order++;
           					div2 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display2');
           					order++;
           					div2 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
    		    }
    		   else if (order >= 30 && order < 45)
    		    {
    		    	if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display3');
           					order++;
           					div3 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display3');
           					order++;
           					div3 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
    		    }	
    		    else if (order >= 45 && order < 60)
    		    {
   			 		if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display4');
           					order++;
           					div4 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display4');
           					order++;
           					div4 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
   			 	
    		    }	
    		    else if (order >= 60 && order < 75)
    		    {
   			 		if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display5');
           					order++;
           					div5 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display5');
           					order++;
           					div5 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
    		    }	
    		    else if (order >= 75 && order < 90)
    		    {
    		    	if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display6');
           					order++;
           					div6 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display6');
           					order++;
           					div6 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
   			 	 }
    		    else if (order >= 90 && order < 105)
    		    {
    		    	if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display7');
           					order++;
           					div7 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display7');
           					order++;
           					div7 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
    		    }
    		    else if (order >= 105 && order < 120)
    		    {
    		    	if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display8');
           					order++;
           					div8 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display8');
           					order++;
           					div8 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
    				
    		    }
    		    else if (order >= 120 && order < 135)
    		    {
    		    	if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display9');
           					order++;
           					div9 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display9');
           					order++;
           					div9 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
    		    }
    		    else if (order >= 135 && order < 150)
    		    {
    		    	if(v == 1)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column'>"+vl+"</div>").appendTo('#display10');
           					order++;
           					div10 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 2;
           					count = 0;
           				}
   			 		}
   			 		else if(v == 2)
   			 		{
   			 			if(count < 3)
   			 			{
   			 				$("<div class='column1'>"+vl+"</div>").appendTo('#display10');
           					order++;
           					div10 = 2;
           					count++;
   			 			}
   			 			if(count == 3)
           				{
           					v = 1;
           					count = 0;
           				}
   			 		}
    		    }
         }      		 
    	 if(div1 == 2)
    	 {
    	 var myTime1 = setInterval(function(){
                	  $('#display2').hide();
    				  $('#display3').hide();
    			      $('#display4').hide();
             		  $('#display5').hide();
                      $('#display6').hide();
                      $('#display7').hide();
                      $('#display8').hide();
                      $('#display9').hide();
                      $('#display10').hide();
                	  $('#display1').show();
                },30000);	 
 		 }
 		 if(div2 == 2)
 		 {
         var myTime2 = setInterval(function(){
                	  $('#display1').hide();
    				  $('#display3').hide();
    			      $('#display4').hide();
             		  $('#display5').hide();
                      $('#display6').hide();
                      $('#display7').hide();
                      $('#display8').hide();
                      $('#display9').hide();
                      $('#display10').hide();
                	  $('#display2').show();
                },60000);
          }
          if(div3 == 2)
          { 
    	   var myTime3 = setInterval(function(){
    	     		 $('#display1').hide();
    				 $('#display2').hide();
    			     $('#display4').hide();
             		 $('#display5').hide();
                     $('#display6').hide();
                     $('#display7').hide();
                     $('#display8').hide();
                     $('#display9').hide();
                     $('#display10').hide();
                  	 $('#display3').show();
                },90000); 
    	   } 
    	  if(div4 == 2)
    	  {
    	  var myTime4 = setInterval(function(){
    	  			 $('#display1').hide();
    				 $('#display2').hide();
    			     $('#display3').hide();
             		 $('#display5').hide();
                     $('#display6').hide();
                     $('#display7').hide();
                     $('#display8').hide();
                     $('#display9').hide();
                     $('#display10').hide();
                	 $('#display4').show();
                },120000);
           }
           if(div5 == 2)
           {
           var myTime5 = setInterval(function(){	
           			 $('#display1').hide();
    				 $('#display2').hide();
    			     $('#display3').hide();
             		 $('#display4').hide();
                     $('#display6').hide();
                     $('#display7').hide();
                     $('#display8').hide();
                     $('#display9').hide();
                     $('#display10').hide();
                     $('#display5').show();
                },150000);
           }
           if(div6 == 2)
           {
           var myTime6 = setInterval(function(){
           	         $('#display1').hide();
    				 $('#display2').hide();
    			     $('#display3').hide();
    			     $('#display4').hide();
             		 $('#display5').hide();
                     $('#display6').hide();
                     $('#display7').hide();
                     $('#display8').hide();
                     $('#display9').hide();
                     $('#display10').hide();
                	 $('#display6').show();
                },180000);
           } 
           if(div7 == 2)
           {
           var myTime7 = setInterval(function(){	
           	         $('#display1').hide();
    				 $('#display2').hide();
    			     $('#display3').hide();
    			     $('#display4').hide();
             		 $('#display5').hide();
                     $('#display6').hide();
                     $('#display8').hide();
                     $('#display9').hide();
                     $('#display10').hide();
                	 $('#display7').show();
               },210000);
           }
           if(div8 == 2)
           {
           var myTime8 = setInterval(function(){
           	         $('#display1').hide();
    				 $('#display2').hide();
    			     $('#display3').hide();
    			     $('#display4').hide();
             		 $('#display5').hide();
                     $('#display6').hide();
                     $('#display7').hide();
                     $('#display9').hide();
                     $('#display10').hide();
                	 $('#display8').show();
               },240000);
           	}
           	if(div9 == 2)
           	{
            var myTime9 = setInterval(function(){
           		     $('#display1').hide();
    				 $('#display2').hide();
    			     $('#display3').hide();
    			     $('#display4').hide();
             		 $('#display5').hide();
                     $('#display6').hide();
                     $('#display7').hide();
                     $('#display8').hide();
                     $('#display10').hide();
                     $('#display9').show();
                },270000);
           	}
           	if(div10 == 2)
           	{
            var myTime10 = setInterval(function(){
            	     $('#display1').hide();
    				 $('#display2').hide();
    			     $('#display3').hide();
    			     $('#display4').hide();
             		 $('#display5').hide();
                     $('#display6').hide();
                     $('#display7').hide();
                     $('#display8').hide();
                     $('#display9').hide();
                     $('#display10').show();
           		},300000);
           	 }
 }
//refresh
setInterval(function(){
		array.clear();
	    clearInterval(myTime1);
	    clearInterval(myTime2);
	    clearInterval(myTime3);
	    clearInterval(myTime4);
	    clearInterval(myTime5);
	    clearInterval(myTime6);
	    clearInterval(myTime7);
	    clearInterval(myTime8);
	    clearInterval(myTime9);
	    clearInterval(myTime10);
        $('#display1 div').remove();
        $('#display2 div').remove();
        $('#display3 div').remove();
        $('#display4 div').remove();
        $('#display5 div').remove();
        $('#display6 div').remove();
        $('#display7 div').remove();
        $('#display8 div').remove();
        $('#display9 div').remove();
        $('#display10 div').remove();
	    myfun();
	},330000);   	

