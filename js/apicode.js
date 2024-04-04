// Susana Cajavilca Turco - # 200553998

// Links to the tutorial and documentation pages that I followed to create my assignment*****************
// https://developers.google.com/books
// https://developers.google.com/books/docs/v1/getting_started
// https://developers.google.com/books/docs/v1/using
// https://www.googleapis.com/books/v1/volumes?q=search+terms
// https://developers.google.com/books/docs/v1/using#WorkingVolumes
// https://developers.google.com/books/docs/v1/using#PerformingSearch



// this assignment has 2 API calls , and shows 6 values of each record from the API call: 1 image and 5 Strings

// declaring the constants to use in the assignment*****************

// my API key that I got from Google
const keyApi = "AIzaSyB4kANLe4qFmdOvIOj44T67RE8eGXVGoUU";
// not only did I need to generate it, I also had to enable the Google Book API service

// The URL for the Book Google Search API
const baseURL = "https://www.googleapis.com/books/v1/volumes";

//declaring empty variables
let url1;  // for searching by title
let url2;  // for searching by author

// notes
// https://www.googleapis.com/books/v1/volumes?q=search+terms
//fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&key=${apiKey}`)
//fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorName}&key=${apiKey}`)

//constant to display my name and ID
const nameIdStudent = document.querySelector("#studentId");

//constant to display the image
const apiImage = document.querySelector("#image");

//constants to grab input by user

//form 1 - search by tittle
const searchTittle = document.querySelector("#titleInput"); // user can type the input
const searchOptionTittle = document.querySelector("#titleOption"); // user can select one from the 11 predefined options
const submitBtn1 = document.querySelector("#bt1");

//form 1 - search by author
const searchAuthor = document.querySelector("#authorInput"); // user can type the input
const searchOptionAuthor = document.querySelector("#authorOption"); // user can select one from the 11 predefined options
const submitBtn2 = document.querySelector("#bt2");

//to display results for the 2 search options, there are 2 section results
const resultsSec1 = document.querySelector("#result1");
const resultsSec2 = document.querySelector("#result2");

//adding an image at the top, dinamycally using a javascript***********************
const image = document.createElement("img");
image.setAttribute("src","images/api_orange.png")
apiImage.appendChild(image);


//adding event listeners***********************************************
submitBtn1.addEventListener("click",fetchResults1);
submitBtn2.addEventListener("click",fetchResults2);

//https://www.googleapis.com/books/v1/volumes?q=search+terms
//fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&key=${apiKey}`)
//fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorName}&key=${apiKey}`)

//creating functions*****************************************************

// function to display my name dinamically on a paragraph
function displayMyData(number){
    nameIdStudent.textContent= "Susana Cajavilca Turco - # 200553998";
    if(number===1)
        nameIdStudent.style.backgroundColor = "lightblue"; // title search
    if(number===2)
        nameIdStudent.style.backgroundColor = "lightgreen"; // author search
}

// function to fetch results from the 1st search option: title
function fetchResults1(event){
    // Use preventDefault() to stop the form submitting
    event.preventDefault();
    
    //if there is no input, then it shows an alert message
    if(searchTittle.value === "" && searchOptionTittle.value === "" ){
        alert("Please either enter a value or select a predefined one");
        resultsSec1.textContent="";
        
    }
    if(searchTittle.value !== ""){
        // this encodeURIComponent() function was needed because I wanted to alow whitespaces inside my input
        var encodedSearchTerm = encodeURIComponent(searchTittle.value);
        url1 = `${baseURL}?q=intitle:${encodedSearchTerm}&key=${keyApi}`;
        searchTittle.value ="";
        image.setAttribute("src","images/api_blue.jpg");
        displayMyData(1);

       // Use fetch() to pass the URL that we built as a request to the API service, 
       // then pass the JSON to the displayResults() function
       fetch(url1).then(response =>{
                       return response.json();
                }).then(json => displayResults1(json)); 


    }
    if(searchOptionTittle.value !== ""){
        var encodedSearchTerm = encodeURIComponent(searchOptionTittle.value);
        url1 = `${baseURL}?q=intitle:${encodedSearchTerm}&key=${keyApi}`;
        searchOptionTittle.value ="";
        image.setAttribute("src","images/api_blue.jpg");
        displayMyData(1);

       // Use fetch() to pass the URL that we built as a request to the API service, 
       // then pass the JSON to the displayResults() function
       fetch(url1).then(response =>{
                        return response.json();
               }).then(json => displayResults1(json)); 
        
    }
    
  
   console.log(url1);

}

// function to display results from the 1st search option: title
function displayResults1(json){
    
    // cleaning results when there is a new search
    resultsSec1.textContent="";

    json.items.forEach(item => {
        // getting the object and store it on book
        const book = item.volumeInfo;

        // 6 Values retrieved: title, authors, # of pages, description, cover image, published Date
        const title = book.title;
        const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
        const pages = book.pageCount;
        const description = book.description || 'No description available';
        // I am using as default image an ice scream image from Lab04 if there is no cover image, since it is already on GitHub
        const thumbnailImage = book.imageLinks ? book.imageLinks.thumbnail : "https://susanacajavilca.github.io/COMP1073-SEC03_LAB_04/images/ice-cream-xtra1.svg"; 
        const publishedDate = book.publishedDate || 'Unknown published date';

        // I found a different way to create tags and attaching them to a constant
        // it works with the innerHTML metod
        const bookElement = 
               `<div class="bookResult">
                <img src="${thumbnailImage}" alt="Book Cover">
                <h2>${title}</h2>
                <p><strong>Author(s):</strong> ${authors}</p>
                <p><strong>Pages:</strong> ${pages}</p>
                <p><strong>Published Date:</strong> ${publishedDate}</p>
                <p>${description}</p>
                <p>**************************************************</p>
            </div>`
        ;
        
        //adding the entry to the result section
        resultsSec1.innerHTML += bookElement;
    });
    
}

// function to fetch results from the 2nd search option: author
function fetchResults2(event){
        // Use preventDefault() to stop the form submitting
        event.preventDefault();
        
        //if there is no input, then it shows an alert message
        if(searchAuthor.value === "" && searchOptionAuthor.value === "" ){
            alert("Please either enter a value or select a predefined one");
            resultsSec2.textContent="";
        }
        if(searchAuthor.value !== ""){
            // this encodeURIComponent() function was needed because I wanted to alow whitespaces inside my input
            var encodedSearchTerm = encodeURIComponent(searchAuthor.value);
            url2 = `${baseURL}?q=inauthor:${encodedSearchTerm}&key=${keyApi}`;
            searchAuthor.value ="";
            image.setAttribute("src","images/api_green.png");
            displayMyData(2);

            // Use fetch() to pass the URL that we built as a request to the API service, 
            // then pass the JSON to the displayResults() function
           fetch(url2).then(response =>{
                            return response.json();
                    }).then(json => displayResults2(json)); 

        }
        if(searchOptionAuthor.value !== ""){
            var encodedSearchTerm = encodeURIComponent(searchOptionAuthor.value);
            url2 = `${baseURL}?q=inauthor:${encodedSearchTerm}&key=${keyApi}`;
            searchOptionAuthor.value ="";
            image.setAttribute("src","images/api_green.png");
            displayMyData(2);

            // Use fetch() to pass the URL that we built as a request to the API service, 
            // then pass the JSON to the displayResults() function
            fetch(url2).then(response =>{
                         return response.json();
                     }).then(json => displayResults2(json)); 


        }
        
       console.log(url2);


}

// function to display results from the 2nd search option: author
function displayResults2(json){

     // cleaning results when there is a new search
     resultsSec2.textContent="";

     json.items.forEach(item => {
         // getting the object and store it on book
         const book = item.volumeInfo;
 
         // 6 Values retrieved: title, authors, # of pages, description, cover image, published Date
         const title = book.title;
         const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
         const pages = book.pageCount;
         const description = book.description || 'No description available';
         // I am using as default image an ice scream image from Lab04 if there is no cover image, since it is already on GitHub
         const thumbnailImage = book.imageLinks ? book.imageLinks.thumbnail : "https://susanacajavilca.github.io/COMP1073-SEC03_LAB_04/images/ice-cream-xtra1.svg"; 
         const publishedDate = book.publishedDate || 'Unknown published date';
 
         // I found a different way to create tags and attaching them to a constant
         // it works with the innerHTML metod
         const bookElement = 
                `<div class="bookResult">
                 <img src="${thumbnailImage}" alt="Book Cover">
                 <h2>${title}</h2>
                 <p><strong>Author(s):</strong> ${authors}</p>
                 <p><strong>Pages:</strong> ${pages}</p>
                 <p><strong>Published Date:</strong> ${publishedDate}</p>
                 <p>${description}</p>
                 <p>**************************************************</p>
             </div>`
         ;
         
         //adding the entry to the result section
         resultsSec2.innerHTML += bookElement;
     });

}


//***instructions notes*****************************************************
//  Dynamically add your student id and name somewhere on the index page using a p tag and JavaScript.
//  Choose a Web app or service that offers a friendly API with good documentation. If you are unsure whether your choice is appropriate, ask your professor.
//  Find within the documentation, a simple “getting started” section that shows how to obtain a key for the API, how to connect, and how to use it to obtain data.
//  Follow the documentation to create your own demonstration page on a Web server, using your own API key.
//  Learn how to make one or more calls to the API.
//  Output some data or information from the Web service to your page to demonstrate that it is working.
//  Include a link to the tutorial or documentation page that you followed to create your page (very important – this demonstrates academic integrity).

//***rubric notes*****************************************************
// folder structure: html, css, js, images in folder
// comments and structure for each section
// basic functionality done
// variables constans used at the start of script
// student id & name are shown in proper p tag on click button
// api connection:page is able to successfully connect to the api
// api call: there are one or more calls to the API that succesfully access data and present it visually on the page
// data from api:more than 4 values/data shown to the user from the API
// CSS: css file is linked, at least one style present
// additional display: api data is displayed using more than one outputs, e.g. text , images
//*** 



