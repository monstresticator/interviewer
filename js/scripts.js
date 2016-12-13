$(document).ready(function() {
  //alert("Connected");
  var questions = [
    "Do you know what a nukuler panner plant safety person does?",
    "How often do you sleep on the job?",
    "Do you know how to disconnect the security cameras?",
    "Have you ever caused a nuclear meltdown?"
  ];

  var answers = [
    // A1
    "Less than 1 year",
    "Between 1 and 5 years",
    "More than 5 years",
    "No experience",

    // A2
    "Sure do!",
    "Not really.",
    "What is a nukuler panner plant?",
    "It's pronounced \"nuclear power\".",

    // A3
    "Never!",
    "Whenever I can get away with it.",
    "Only after lunch.",
    "Right after I clock in.",

    // A4
    "Uh, no. That's a felony. You can go to prison for that.",
    "Of course! It's easy!",
    "Is this a trick a question?",
    "Usually I just connect a laptop with a looping image. They don't suspect a thing.",

    // A5
    "Just once.",
    "2 or 3 times. That's why I was fired last time.",
    "Not yet, but I hear that red button is tempting.",
    "No! That's insane!"
  ];

  var responses = [
    // R1
    "Good! I can teach you the 'right' way to do things around here.",
    "Oh so you have a not bad idea about what we do here. Good.",
    "Oh so you think you're better than me, huh? Well, we'll just see aobut that!",
    "That's ok. When I got hired I didn't even know what a nukuler panner plant was.",

    // R2
    "Greeeaaat! Moving on ...",
    "Well, we ... monitor safety ... for the safety of being safe ... in a safe way.",
    "What's a nukuler panner plant? I'll ask the questions around here.",
    "Don't tell me how to say stuff or I'll bust you down to safety inspector!",

    // R3
    "Oh well look at Mr. Goody Two Shoes! I don't sleep on the joooob. Pffft! Loser.",
    "Me too! As soon the boss walks away, I'm out like a light.",
    "Yeah, I'm super tired after lunch. Sometimes, I'm late getting back because I fall asleep too long in my car.",
    "Oh that's a good time, but I'd wait till the boss comes by first. After that, you don't seem him again unless you're in trouble.",

    // R4
    "Uhhhhh yeahhhh ... felony. So good thing that you would never do that ... okay, then.",
    "It really is! You just unscrew the little deely in the back of the camera and no one's the wiser.",
    "Uhhhh yeah ... I was just joking. Heh heh heh. Next question.",
    "Ohhhh that's smart! Why didn't I think of that! You have to show me!",

    // R5
    "Only once?! I've done it many times.",
    "Me too! It's so easy, right!",
    "Oh yeah, it is. The first time I pressed it just to see what would happen. Maaaan that was embarassing. The other times were accidents.",
    "Well excuse meeeee, Mr. Perfect!"
  ];

  // Hide dialogue box and questions
  //$("#interview").hide();

  // Get candidate's name
  $("#get-name").on("click", function() {
    login();
  });

  // Post the submitted answer and response in the dialogue box
  $("#send-reply").on("click", function() {
     getQA();
  });

  // Keep dialogue in window visible
  $("#outer-dial").scrollTop($(this)[0].scrollHeight);

  function login() {
    var getFName = $("#fname").val();
    var getLName = $("#lname").val();
    var chooseJob = $("select option:selected").val();
    var chosenJob = "";
    // Validation messages
    var info = [
      "Please enter your first name",
      "Please enter your last name",
      "Please choose a job position"
    ];

    var notHiring;
    var newFontColor = "red";
    if (getFName === "") {
      $("#welcome").hide();
      $("#alert-msg").text(info[0])
         .css("color", newFontColor);
      $("#fname").focus();
    } else if (getLName === "") {
      $("#welcome").hide();
      $("#alert-msg").text(info[1])
         .css("color", newFontColor);
      $("#lname").focus();
    } else if (chooseJob === 0) {
      $("#welcome").hide();
      $("#alert-msg").text(info[2])
         .css("color", newFontColor);
    // Get candiate's job choice
    } else if (chooseJob == 1) {
      chosenJob = "Web Development";
      notHiring = "We're sorry, the " + chosenJob + " department is currently not hiring. Please choose another job. Thank you.";
      newFontColor = "navy";
      $("#alert-msg").text(notHiring).css("color", newFontColor);
    } else if (chooseJob == 2) {
      chosenJob = "Programming";
      notHiring = "We're sorry, the " + chosenJob + " department is currently not hiring. Please choose another job. Thank you.";
      newFontColor = "navy";
      $("#alert-msg").text(notHiring).css("color", newFontColor);
    } else if (chooseJob == 3) {
      chosenJob = "Nuclear Power Plant Safety Inspector";

      // Hide the info form and alert and show welcome heading and interview form
      $("#info").hide();
      $("#interview").show();
      $("#alert-msg").hide();
      $("#welcome").show();
      $("#show-name").text(getFName + " " + getLName);
      $("#heading").hide();

      // Initial interviewer response
      $("#inner-dial").html("Homer: Hello, " + getFName + ". I see that you're interested in our " + chosenJob + " position. So let's get started.<br /><br />");
      // Initial interview question
      $("#question").text("How many years of " + chosenJob.toLowerCase() + " experience do you have?");

      // Initial answer choices that display under the initial question
      getQAnswers("#a", 0, 0);
      getQAnswers("#b", 1, 0);
      getQAnswers("#c", 2, 0);
      getQAnswers("#d", 3, 0);
    }
  }

  var qCount = 0;
  var aCount = 4;
  var bCount = 5;
  var cCount = 6;
  var dCount = 7;
  function getQA() {
    if (qCount <= 4) {
      if ($("input:radio[name=answer]")[0].checked === true) {
        getResponse(aCount - 4);
        getDialogueAnswers(aCount - 4);
      } else if ($("input:radio[name=answer]")[1].checked === true) {
        getResponse(bCount - 4);
        getDialogueAnswers(bCount - 4);
      } else if ($("input:radio[name=answer]")[2].checked === true) {
        getResponse(cCount - 4);
        getDialogueAnswers(cCount - 4);
      } else if ($("input:radio[name=answer]")[3].checked === true) {
        getResponse(dCount - 4);
        getDialogueAnswers(dCount - 4);
      } else if ($("input:radio[name=answer]")[0].checked === false &&
                 $("input:radio[name=answer]")[1].checked === false &&
                 $("input:radio[name=answer]")[2].checked === false &&
                 $("input:radio[name=answer]")[3].checked === false) {
        alert("Please choose an answer");
        return;
      }

      nextQuestion(qCount);
      getQAnswers("#a", aCount, 1000);
      getQAnswers("#b", bCount, 1000);
      getQAnswers("#c", cCount, 1000);
      getQAnswers("#d", dCount, 1000);

      // Increment the variables
      qCount++;
      aCount += 4;
      bCount += 4;
      cCount += 4;
      dCount += 4;
      clearAnswers();

      // For variable testing
      /*console.log(questions[qCount] + " " + qCount);
      console.log(answers[aCount] + " " + aCount);
      console.log(answers[bCount] + " " + bCount);
      console.log(answers[cCount] + " " + cCount);
      console.log(answers[dCount] + " " + dCount);*/

    }

    if (qCount === 5) {
      //alert("You've reached the end of the test");
      $("#send-reply").prop("disabled", true);
      $("input[type=radio]").prop("disabled", true);

      getResults();
    }
  } // End function

  var q; // Get next question
  function nextQuestion(q) {
    // Set delay for next question to display
    setTimeout(function() {
      $("#question").text(questions[q]);
    }, 1000);
  }

  function clearAnswers() {
    $("input:radio[name=answer]")[0].checked = false;
    $("input:radio[name=answer]")[1].checked = false;
    $("input:radio[name=answer]")[2].checked = false;
    $("input:radio[name=answer]")[3].checked = false;
  }

  var a = ""; // Get next set of question answers
  var qa;
  var seconds;
  function getQAnswers(a, qa, seconds) {
    setTimeout(function() {
      $(a).text(answers[qa]);
    }, seconds);
  }

  var da; // Get dialogue answers
  function getDialogueAnswers(da) {
      $("#inner-dial").append($("#fname").val() + ": " + answers[da].fontcolor("navy") + "<br />");
  }

  var r;
  function getResponse(r) {
    // Set delay for response
    setTimeout(function() {
      $("#inner-dial").append("Homer: " + responses[r].fontcolor("darkgreen") + "<br />");
    }, 1500);
  }

  function getResults() {
    // Temp result placeholder
    setTimeout(function() {
      var newWin = window.open("", "", "toolbar=no,scrollbars=no,resizable=no,fullscreen=no,top=80,left=500,width=400,height=400");
      newWin.document.write("<h2 style=\"text-align='center'\">You completed the interview!</h2>" +
      "<h3>Management will contact you in a few days. If you do not hear from us that means you totally sucked at the interview and you will be barred from ever applying again. <br>Thank you.</h3>");
    }, 2500);
  }

/******* CURRENTLY UNDER TESTING *******/
  // If no response for 5 seconds, start taunting candidate
  function noResponse(seconds) {
    var taunts = [
      "Are you sleeping?",
      "I know it's a hard question, but c'mon!",
      "Hellooooo!",
      "Today! Einstein!",
      "You're wasting precious beer time!"
    ];

    setTimeout(function() {
      $("#inner-dial").append("Homer: " + taunts.fontcolor("red") + "<br />");
    }, seconds);
  }
});
