
info = [];
slide = [];
//parsing json data;
function myfun() {
	    //var loadUrl = "http://localhost:8080/NewTrainStatus/TrainStatusServlet?StationCode=NDLS&json=true";
		var loadUrl = "file:///media/HDD%20500/Current_Working/Train_Info-Web-App/Working_FolderJson/dep1/train.txt";
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
	                 														info.push(v);
	                 													}
                  												});
                  					      });		     
                  		}
                     }
                  catch (error) {
                     			// window.alert("error!");
                                }
                                display_info();	
                  },
               });
         }   
//format the data to display; 			 
function display_info(){
			 l = info.length;
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
    		 $('#display1').show();
    		 $('#display2').hide();//data hidden;
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
   			 	var vl = info[i];	 	
           		if (order < 21)//adjusting slide;
   			 	{
   			 		if(v == 1)
   			 		{
   			 			if(count < 3)//swapping css styles;
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
    			else if (order >= 21 && order < 42)
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
    		   else if (order >= 42 && order < 63)
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
    		    else if (order >= 63 && order < 84)
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
    		    else if (order >= 84 && order < 105)
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
    		    else if (order >= 105 && order < 126)
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
    		    else if (order >= 126 && order < 147)
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
    		    else if (order >= 147 && order < 168)
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
    		    else if (order >= 168 && order < 189)
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
    		    else if (order >= 189 && order < 210)
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
         if(div1 == 2){slide.push("#display1");}//collecting needed divs;
         if(div2 == 2){slide.push("#display2");}
         if(div3 == 2){slide.push("#display3");}
         if(div4 == 2){slide.push("#display4");}
         if(div5 == 2){slide.push("#display5");}
         if(div6 == 2){slide.push("#display6");}
         if(div7 == 2){slide.push("#display7");}
         if(div8 == 2){slide.push("#display8");}
         if(div9 == 2){slide.push("#display9");}
         if(div10 == 2){slide.push("#display10");}
         show(); 
 }
//display slides;  
function show(){
				ln = slide.length;
				var old;
				var check = 1;
				var n = 0;
				var myTime = setInterval(function(){
				if(check < 10)
				{	
					if(n<ln)
					{
						$('#display1').hide();//data hidden;
    					$('#display2').hide();
    					$('#display3').hide();
    					$('#display4').hide();
        				$('#display5').hide();
        				$('#display6').hide();
        				$('#display7').hide();
        				$('#display8').hide();
       	 				$('#display9').hide();
				    	$('#display10').hide();
						$(old).hide();
						a = slide[n];
						old = a;
						$(a).show();
						n++;
						check++;
					}
					else
					{
						n = 0;
					}
				}				
			    else
				{		//refresh;
						clearInterval(myTime);
						check = 1;
						n = 0;
						info.splice(0, info.length);
						slide.splice(0, slide.length);
	  					$('#display1 div').remove();//old data clearing;
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
				}
				},30000);//display timing adjust;
			}
//end