var bookmarkNameInput = document.getElementById('nameInput');
var bookmarkUrlInput = document.getElementById('urlInput');

if (localStorage.getItem('bookmarks') != null){
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    displayUserBookmarks();
}

var bookmarks = [];



function addNewLink(){

    var validateUserInputs = validateInputs();


    if( validateUserInputs == true){
        var userURL = bookmarkUrlInput.value;

        if (!userURL.startsWith('http://') && !userURL.startsWith('https://')) {
            userURL = 'https://' + bookmarkUrlInput.value;
        }
    
        bookmarkUser = {
            name: bookmarkNameInput.value,  
            url: userURL,
        }
    
        bookmarks.push(bookmarkUser);
    
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    
        clearForm();
    
        console.log(bookmarks);
        displayUserBookmarks();
    }
    else{
        // alert(validateUserInputs);
        document.getElementById("modalMessage").innerHTML =  validateUserInputs;
        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        myModal.show();
    }
}


function clearForm(){
    bookmarkNameInput.value = '';
    bookmarkUrlInput.value = '';
}


function displayUserBookmarks(){
    var htmlContent = '';

    for( var i =0 ; i < bookmarks.length; i++){
        htmlContent+=
        `           <tr>
                        <td>
                           ${i+1}                            
                        </td>
                        <td class="">${bookmarks[i].name}</td>
                        <td>
                            <a target="_blank" href="${bookmarks[i].url}">
                                <button class="btn px-4 btn-visit-color text-white"><i class="fa-solid fa-eye text-white"></i> 
                                    Visit
                                </button>
                            </a>
                        </td>
                        <td>
                            <button onclick="deleteURL(${i})" class="btn px-3 bg-danger text-white"><i class="fa-solid fa-trash text-white"></i> Delete</button>
    
                        </td>
                    </tr>

        `
    }

    document.getElementById('bookmarkLinks').innerHTML = htmlContent
}



function deleteURL(idx){

    bookmarks.splice(idx, 1)

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    displayUserBookmarks();
}

function validateInputs() {
    var nameRegex = /^(?!\s*$).+/;
    if (!nameRegex.test(bookmarkNameInput.value)) {
        return 'Website name is required.<br>Please enter a non-empty name.';
    }

    var urlRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
    if (!urlRegex.test(bookmarkUrlInput.value)) {
        return 'Invalid website URL format.<br>Use a format like example.com or example.com/page.';
    }

    return true;
}
