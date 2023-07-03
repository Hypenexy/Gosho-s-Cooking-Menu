const search = document.getElementsByTagName("input")[0];

const categoriesElement = document.getElementsByClassName("categories")[0];

const categories = categoriesElement.getElementsByTagName("div");

search.onfocus = function(){
    foreachDelayed(categories, function(item){
        item.classList.add("transition");
    }, 50, true)
}
search.onblur = function(){
    foreachDelayed(categories, function(item){
        item.classList.remove("transition");
    }, 50, true)
}

function openPage(category){
    const documentTitle = document.title
    document.title = category + " on " + documentTitle;
    window.history.pushState('', category + " on " + documentTitle, document.URL + "?page=" + category); // Can't figure out how these work properly.
    const page = document.createElement("div");
    page.classList.add("page");
    page.classList.add("transition");

    function closePage(popstate){
        const documentTitle = document.title
        document.title = documentTitle.split(" on ")[1];
        if(popstate == true){
            window.history.replaceState('', documentTitle.split(" on ")[1], document.URL.split("?")[0]);
        }
        else{
            window.history.pushState('', documentTitle.split(" on ")[1], document.URL.split("?")[0]);
        }
        page.classList.add("transition");
        setTimeout(() => {
            page.remove();
        }, 300);
    }

    window.onpopstate = function(){
        closePage(true);
    }

    const h1 = document.createElement("h1");
    h1.innerHTML = "Gosho's Cooking Menu <div></div>";
    ButtonEvent(h1, closePage)
    page.appendChild(h1);
    const h2 = document.createElement("h2");
    h2.innerText = category;
    page.appendChild(h2);

    document.body.appendChild(page);
    setTimeout(() => {
        page.classList.remove("transition");
    }, 10);

    h1.focus();
}

for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    ButtonEvent(element, openPage, element.innerText);
}

// openPage("Drinks");