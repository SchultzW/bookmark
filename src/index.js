class Bookmarker
{
   
    constructor()
    {
        //create bookmarks and put into local storage
        
        
        this.bookmarks= JSON.parse(localStorage.getItem('BOOKMARKS'));
    
        if(!this.bookmarks)
        {
            this.bookmarks=[{description:"I'm a description",image:"",link:"I am a URL",title:"I am a URL"}];
        }
        
        
        this.generateHtml=this.generateHtml.bind(this);
        this.fillBookmarks=this.fillBookmarks.bind(this);
        this.deleteBookmark=this.deleteBookmark.bind(this);
        this.fillBookmarks();
        this.addBookmark=this.addBookmark.bind(this);
        let addBtn=document.getElementById("add");
        addBtn.onclick=this.addBookmark.bind(this);

        /*
         Add a onsubmit handler to the form in the constructor.  
        It should call addBookmark.  You must bind this to the class because this will be the form
        when the submit handler is called if you don't.
        */
    }
    generateHtml(bookmark,index)
    {
        /*
            -   Add the generateBookmarkHtml method
        -   This method returns a template literal containing the html for ONE bookmark in the array.
            It gets called in fillBookMarksList.  It has 2 parameters a bookmark and an index.
        -   CUT the html for ONE bookmark from your html page into the body of your method.
        -   Enclose the html in ``.
        -   Replace the hardcoded description, image, link and title (of the sample bookmark) 
            with template strings that use the properties of the bookmark object
        -   Return the template literal
        */
       return `
            <li class=" container ">
            <div class="row wrapper">
                <div class="col-md-2 box">
                    <div img src=${bookmark.image}>image</div>
                </div>
                <div class="list-group-item col-md-8" id="link">
                    <a href=" ${bookmark.link}"> ${bookmark.title}</a>;
                </div>
                <div class="list-group-item col-md-8" id="desc">
                    ${bookmark.description}
                </div>
                <div class="col-md-1 delete-icon-area">
                    <a class="" href="/" onclick="bookmarker.deleteBookmark(event,${index})"><i id="deleteBookmark" class="delete-icon glyphicon glyphicon-trash"></i></a>             
                </div>
            </div>
            </li>
            `
        

       
    }
    fillBookmarks()
    {
        localStorage['BOOKMARKS']=JSON.stringify(this.bookmarks);
        //localStorage.setItem('BOOKMARKS',JSON.stringify.this.bookmarks);
        let bookmarkHtml=this.bookmarks.reduce
        ((html,bookmark,index)=>html+=this.generateHtml(bookmark,index),'')
        document.getElementById("bookmarks-list").innerHTML=bookmarkHtml;
        
        /*
        -   Add the fillBookmarksList method.  It has bookmarks as its parameter.
        -   Save the bookmarks to local storage
        -   Create a variable bookmarkHtml and set it equal to the
            the return value for each of the individual tasks combined
            You can do this by calling the reduce method on the array
            It manipulates each element of an array to produce ONE result.  From the ToDoList:
                let tasksHtml = this.tasks.reduce(
                    (html, task, index) => html += this.generateTaskHtml(task, index), 
                    '');
        -   Set contents of the bookmarks-list element on the page to the bookmarkHtml variable
        );
        */
    }
    deleteBookmark(event,index)
    {
        /*
             PART 2 - Delete a bookmark
    -   Add the deleteBookmark method.  It has 2 parameters, event and index
        -   prevent the default action of the anchor tag using the event parameter
        -   delete the bookmark from the list based on the index
        -   call fillBookmarksList
    -   Add an onclick handler to the delete icon
        The handler should call the deleteBookmark method with event 
        and index (template string) as its parameters
        */
       event.preventDefault();
       this.bookmarks.splice(index,1);
       this.fillBookmarks();
    }
    addBookmark(event)
    {
        event.preventDefault();
        let parentUrl=document.getElementById('url').parentElement;
        let parentDesc=document.getElementById('description').parentElement;
        let inputUrl=document.getElementById('url').value;
        let inputDesc=document.getElementById('description').value;
        if(inputUrl==="")
        {
            parentUrl.classList.add('has-error');
        }
        else if(inputDesc==="")
        {
            parentDesc.classList.add('has-error');
        }
        else
        {
            parentDesc.classList.remove('has-error');
            parentUrl.classList.remove('has-error');
            let newBookmark={description:inputDesc,image:"",link:inputUrl,title:inputUrl};
            this.bookmarks.push(newBookmark);
            document.getElementById('url').value='';
            document.getElementById('description').value='';
            this.fillBookmarks();
        }
        /*
        Add the function addBookmark.  It has event as its parameter.
        -   Because the textboxes for entering bookmark info are in a form, you will
            need to prevent the form from being submitted (which is the default behavior)
            like you prevented the delete link in ToDoList from going to a new page.  
        -   get the url and the description from the form and create a bookmark object. 
            Use the url for both the link and the title.  Leave the image blank.
        -   add the new bookmark to the list
        -   call fillBookmarksList
        -   clear the form on the UI
    -   Add a onsubmit handler to the form in the constructor.  
        It should call addBookmark.  You must bind this to the class because this will be the form
        when the submit handler is called if you don't.
        */

    }
}
/*


    EXTRA CREDIT: 
    -   Do something on the page to draw attention to the form when you enter and leave 
        the form.  See my screen shot and the styles in the css file to an idea.

*/

let bookmarker;
window.onload=()=>(bookmarker=new Bookmarker());

