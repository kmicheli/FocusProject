
//attribute to newsapi.org
//AFFINN analysis of google news articles
//pulls in 50 articles per request


//Sentiment analysis is perhaps one of the most popular applications of NLP,analyzing sentiments
//The key aspect of sentiment analysis is to analyze a body of text for understanding the opinion expressed by it. 
//Typically, we quantify this sentiment with a positive or negative value, called polarity. 
//The overall sentiment is often inferred as positive, neutral or negative from the sign of the polarity score.

//Usually, sentiment analysis works best on text that has a subjective context than on text with only an objective context. 
//Objective text usually depicts some normal statements or facts without expressing any emotion, feelings, or mood. 
//While subjective text contains text that is usually expressed by a human having typical moods, emotions, and feelings, 

//to understand its reception by the people and what they think of it based on their opinions or, you guessed it, sentiment!

//AFFINN is a premade list of words ofEnglish words that are assigned a score. 
//The words have been manually labeled by Finn Årup Nielsen in 2009-2011. 
//The file is tab-separated -> found and used a converted .tsv into a json data file 


var words;
var articles;
var dataIncoming;
let joinedContent = "";
var articleContent = [];
var scoredwords = [];
var totalScore = 0;
var api = 'https://newsapi.org/v2/everything?q=';
var apiKey = '&pageSize=50&apiKey=0082388d71eb417a8c8baa802a658874';

function setup() {
  afinn = loadJSON('afinn111.json');
  noCanvas();
  background(0,0,0);
  noStroke();
  fill(255,255,255);
}


//clears out previous search, resets values
function clearFunc(){
  input.value = "";
  articleContent.length = 0;
  scoredwords = [];
  totalScore = 0;
  words = 0;
}

function returnData() {
  var input = document.getElementById("input").value; //gets value from user input
  console.log(input);  //display the user input
  
  dataIncoming = api + input + apiKey; //creates full search url 
  loadJSON(dataIncoming, gotData); //loads json data

function gotData(data){ //data is from the api

document.getElementById("input").value = "";
articles = data.articles; //finds the articles
//console.log(articles);
  for (var i = 0; i < articles.length; i++){  //loops through array
      articleContent.push(articles[i].content); //only adds the content of the articles
  }
    joinedContent.length = 0;
    //console.log(articleContent);
    joinedContent = join(articleContent, " ");
    console.log(joinedContent);

  words = joinedContent.split(/\W/);
    // console.log(words);

  for (var i = 0; i < words.length; i++) {
    word = words[i].toLowerCase();
    if (afinn.hasOwnProperty(word)) {
      var score = afinn[word];
      // console.log(word, score);
      totalScore += Number(score);
      scoredwords.push(word + ': ' + score + ' ');

    }
  }
    
    console.log(totalScore);
      
      if (1000 >= totalScore && totalScore > 40) {
      document.getElementById("display").innerHTML = 'With a score of '+ totalScore + ', it appears that the web is very pleased with ' + input + '.';
      //color change
document.getElementsByTagName("body")[0].style.background ="Gold";

    }
    else if (40 >= totalScore && totalScore > 31) {
      document.getElementById("display").innerHTML = 'With a score of '+ totalScore +', it appears the web is fairly pleased with ' + input + '.';
    //color change
    document.getElementsByTagName("body")[0].style.background ="pink";

    }
    else if (30 >= totalScore && totalScore > 21) {
      document.getElementById("display").innerHTML = 'With a score of '+ totalScore +', it appears that the web is conflicted with ' + input + '.';
    //color change
document.getElementsByTagName("body")[0].style.background ="Teal";
    }
    else if (20 >= totalScore && totalScore > 11) {
      document.getElementById("display").innerHTML = 'With a score of '+ totalScore +', it appears the web is not pleased with ' + input + '.';
    //color change
    document.getElementsByTagName("body")[0].style.background ="DarkRed";
    }
    else {
      document.getElementById("display").innerHTML = 'With a score of '+ totalScore +', it appears the web is definitely not pleased with ' + input + '.';
    //color change    // input = 0; 
    document.getElementsByTagName("body")[0].style.background ="Black";

    }
}
}


function draw(){

}
