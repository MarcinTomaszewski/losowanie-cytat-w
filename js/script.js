/* var url = 'http://api.icndb.com/jokes/random';
var $paragraph = $('#joke');

var $button = $('#get-joke').click(function(){
    getJoke();
});

function getJoke() {    //pobieranie losowego dowcipu
    $.ajax({
        mathod: 'GET',  //metoda GET
        url: url,       //zmienna url zawierająca link do API
        success: function(res) {
            $paragraph.text(res.value.joke);
        }
    });
}*/

/*$.ajax({                //metoda $.ajax()
    dataType: "json",
    url: quoteUrl,
    data: null,
    success: createTweet
});*/

var prefix = "https://cors-anywhere.herokuapp.com/";            //??????????
var tweetLink = "https://twitter.com/intent/tweet?text=";       //link do wysyłania tweetów na Tweetera. Po znaku = będzie dodana treść tweeta.
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";    //link do API Quotes on Design, które pozwala pobierać losowe                                                                                                               cytaty ze swojej bazy.

function getQuote(){   
    $.getJSON(prefix + quoteUrl, createTweet);   //?????????
    $.ajaxSetup({ cache: false });              //???????????
    $.getJSON(quoteUrl, createTweet);   //skrócona metoda $.getJSON() odpowiadająca metodzie $.ajax(). W parametrach nie trzeba podawać                                                                           argumentów dataType i data. Sa one domyślne i mają wartość json i null. 
}                                       //parametr quoteUrl to link, a createTweet to funkcja, która zostanie wykonana przy pomyslnym                                                                                   wykonaniu zapytania

function createTweet(input) {       //funkcja createTweet tworzy linki z tweetami i podpina je pod przycisk do tweetowania.
    var data = input[0];

    var quoteText = $(data.content).text().trim();  //jak sprawdzić co kryje się pod kluczem data.content? Metoda text() pozwala na pobranie zawartości tego klucza. Metoda                                                     trim() ucina niepotrzebne spacje na początku i końcu stringa.
    var quoteAuthor = data.title;
   
    if(!quoteAuthor.length) {       //jeżeli autor cytatu jest pustym stringiem (długość równa 0) to w pole quoteAuthor będzie "Unknown                                                                        author"
                                    //quoteAuthor.length zwróci wartość 0 w przypadku, gdy autor cytatu będzie pusty - JavaScript           interpretuje zerową długość jako po prostu false.
                                    //Wykrzyknik na początku (!quoteAuthor.length) zaneguje wartość fałszu i zrobi z niej prawdę, czyli     jeśli autor cytatu jest pusty, to wejdziemy do treści warunku.
        quoteAuthor = "Unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;  //zmienna przechowujaca wygenerowana tresc tweeta

    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);  //link do generowania nowych tweetó oraz tekst tweeta.
        $('.quote').text(quoteText);                    //ele. w którym wyświetla się treść cytatu
        $('.author').text("Author: " + quoteAuthor);    //ele. w ktorym wyświetla się autor cytatu
        $('.tweet').attr('href', tweet);                //w ele. z klasą tweet modyfikowana jest zawartość atrybutu href na URL tweeta,                                                                                         który jest w zmiennej tweet
    }
}

$(function(){                           //po załadowaniu strony
    getQuote();                         //generuje sie cytat
    $('.trigger').click(function() {    //po kliknięciu w ele. z klasą trigger generuje się cytat
        getQuote();
    })
});            
// do obgadania    

