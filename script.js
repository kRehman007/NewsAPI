const articleDiv=document.querySelector('.articles');
const inputBox=document.getElementById('inputBox');
const api="d90ae4cc1df1430d899f9147b603631f";
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=> fetchNews('India'));

async function fetchNews(query){
    const response=await fetch(`${url}${query}&apiKey=${api}`);
    const data=await response.json();
    const result=data.articles;
    console.log(result);

    articleDiv.innerHTML='';

    result.map((res)=>{
        if(!res.urlToImage){return}

        const Div=document.createElement('div');
        
        const image=document.createElement('img');
        const imageLink=document.createElement('a');
        const title=document.createElement('h1');
        const date=document.createElement('span');
        const desc=document.createElement('p');

        const newDate= new Date(res.publishedAt).toLocaleString('en-US',{
            timeZone:'Asia/Jakarta'
        });

        image.src=res.urlToImage;
        title.textContent=res.title;
        date.textContent=`${res.source.name} . ${newDate}`;
        desc.textContent=res.description;
        imageLink.href=res.url;
        imageLink.appendChild(image);
        Div.appendChild(imageLink);
        Div.appendChild(title);
        Div.appendChild(date);
        Div.appendChild(desc);
        
        articleDiv.appendChild(Div);
        imageLink.target="_blank";
   
    });
}

let list=document.querySelectorAll('li');

function LoadingScreen(id){
    for(li of list){
    li.style.color='black';}
    document.getElementById(id).style.color='blue';
    fetchNews(id);
}

function ShowScreen(){
    if(inputBox.value==''){return}

    for(li of list){
        li.style.color='black';}
    fetchNews(inputBox.value);
    
}