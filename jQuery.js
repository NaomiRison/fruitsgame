/*
	 click on start reset button check if we are
	 playing
	 if we are playing reload page
	 If we are playing 1)show trials left
	 2)change button text, "reset game"
	 3)creat random fruit
	 4) move fruit down one step every 30 sec
	 Is the fruit too low?
	 no--- repeat 2
	 yes-- ask any trials left?
	 yes:repeat 1 and no: show game over and 
	 start game text on button

	 we are slicing food, have sound when that happens


*/var playing=false;
   var score;
   var trialsLeft;
   var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
   var step;
   var action;

$(document).ready(function(){

   // jQuery methods go here...
   

   $('#startreset').on('click',function(){
   		// click on start reset button
   		//if we are playing no longer false
   		if(playing == true){
//    			playing==true means is playing equal to true or not? It will return true if that is the case or false otherwise.

// playing = true means: let's set the value of playing to true.
   			location.reload();
   		}
   		// if not playing....,
   		else{
   			
   			// game starts with playing=true
   			 playing = true; 
   			 score=0;
   			 
   			 // access span element with id and
   			 //html method and set it to var score
   			 $('#scorevalue').html(score);

   			 // make box appear
   			 $('#trialsLeft').show();
   			 trialsLeft=3;
   			 // 3 hearts at beginning for hearts
   			 // every time we go inside 4 loop
   			 // addHearts(); 
         $('#trialsLeft').empty();
   			 for(i=0;i<trialsLeft;i++){
//    		// add heart to traislleft box
//    		// each time we go into loop
//    	 	// instead of hearts start with X
				 
          $('#trialsLeft').append(' <img src="images/hearts.png" class="life"> ');

            }

            // hide game over box when we click to
            //start game
            $('#gameOver').hide();
   			 $('#startreset').html('Reset Game');
   			 startAction();

   		}


   });
   //hover over fruit and make sounds. it also slices
   $('#fruit1').mouseover(function(){
        score++;
        $('#scorevalue').html(score);
        // javscript selectotr for ids=getElementById
        document.getElementById("sliceSound").play();
        /*  while hovering,
        now exploding fruits
        have to make stop going down
        and hide it

        After that send new fruit
        call startAction

        stop fuit from moving with clearInterval
        hide()st parameter the animation and
        second is time 5ms
        

        */
        
        clearInterval(action);
        // to get explode animation with
        // hide works with jquery ui cdn
        $('#fruit1').hide('explode',500);

        /*
          The setTimeout() method calls a function or 
          evaluates an expression after a specified number 
          of milliseconds.

        Tip: 1000 ms = 1 second.

        */
        setTimeout(startAction,800);
        

   });
   
}); 

// function addHearts(){
// 	for(i=0;i<trialsLeft;i++){
//    		// add heart to traislleft box
//    		// each time we go into loop
//    	 	// instead of hearts start with X
// 		$('#trialsLeft').append(' <img src="images/hearts.png"> ');
//  		// go back to video 123 to placr
//    		//for loop in function called add Hearts()

//    	}

// }
//below sending fruits
 function startAction(){
 	 
 	 // $('#fruitsContainer').append('<img src="images/apple.png" class="fruit">');
    $('#fruit1').show();
    // use jQuery to get src attribute below
    chooseFruit();
    // random left  position below
    $('#fruit1').css({'left':Math.round(550*Math.random()) ,'top':-50});
    
    // go for random step so all fruits hve random speed
    //random steps images move between 1px-6px
    step=1+Math.round(5*Math.random());
    // will get whole number betwwn 0 and 5
    //we dont want 0 so +1
    // move images 1 step every 10 ms sec with below
    action=setInterval(function(){
      /* set interval takes parameter:
      function to excute and duration
      
      css('top',$('#fruit1').position().top + step);
      move fruit down by random step . to do this access top 
      property with css method. 
      second parameter is the
      new value of top property is: old value  of top propertt
      to access that we then use method
      position() returns object and we use its top
      property to get original top value
       now add step
       more steps the slower image moves down
      */
      $('#fruit1').css('top',$('#fruit1').position().top + step);
            /*
              check if fruit is too low
              if top property or
              top position of fruit is greater 
              than height of container
            */
            if($('#fruit1').position().top>
                  $('#fruitsContainer').height()){
                // check if any trials left
                if(trialsLeft>1){
                    // generate new fruit, new position, and
                    //new step
                    $('#fruit1').show();
    
                    chooseFruit();
                    //random left horizontal position
                    $('#fruit1').css({'left':
                    Math.round(550*Math.random()) ,'top':-50});
                   //random step
                    step=1+Math.round(5*Math.random());
                // once we generate 1 fruit, hearts  decreases by 1
                trialsLeft--;
                $('#trialsLeft').empty();
                 for(i=0;i<trialsLeft;i++){
                  // add heart to traislleft box
                 // each time we go into loop
                 // instead of hearts start with X
                 // empty trialsLeft box html
                  
                  $('#trialsLeft').append(' <img src="images/hearts.png" class="life"> ');
                    // if trialsLeft is 3 you have 2  trials left
                    // and  for loop prints 2 hearts and so on... until else statement
            }
                //now populate trails left
                }else{
                  //game over because no trials left
                  // set to false becuase not playing anymore
                  playing=false;
                  $('#startreset').html('Start Game');
                  $('#gameOver').show();
                  $('#gameOver').html('<p>Game over!</p><p>Your score is '
                    + score +'</p>');
                    // hide extra heart, which is 1 trail left
                    $("#trialsLeft").hide();
                  stopAction();
                }

            }// else  back to action=setInterval(function(){...}
            


    }, 10);
 }

 // stop dropping fruits
 function stopAction(){
  // Use clearInterval() to stop time from setInterval
  clearInterval(action);
  $('#fruit1').hide();
 }

 // generates a random fruit
 function chooseFruit(){
   // access id and get the attr with attr();
   //to get random image in second parameter
   //we will create array above. fruits[0] is apple
   /*
       want number to be randomly chosen between 0-8
       use Math.random() which gives a number betwwen
       0 and 1 and multiply by 8
       use Math.round to get whole number
   */
   $('#fruit1').attr('src','images/'+ fruits[Math.round(8*Math.random())] + '.png')
   // need to position fruit randomly horizontally
   //verticallly place it above fruit container
   // when it appears 
   // also want left  position( horizontal) to be random so use same Math methods
   // use the { }becuase  setting 2 property


    
 }  
