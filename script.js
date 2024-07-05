const articleDiv=document.querySelector('.articles');
const inputBox=document.getElementById('inputBox');

window.addEventListener('load',()=> fetchNews('Pakistan'));

async function fetchNews(cat){
    const url = 'https://google-api31.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '31f7225694msh179cc057e09527bp15f5a3jsnd2462a592ca8',
            'x-rapidapi-host': 'google-api31.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            text: cat,
            region: 'wt-wt',
            max_results: 25
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
          console.log(result);
        
        articleDiv.innerHTML='';

        result.news.map((res)=>{
            if(!res.image){return}
    
            const Div=document.createElement('div');
            
            const image=document.createElement('img');
            const imageLink=document.createElement('a');
            const title=document.createElement('h1');
            const date=document.createElement('span');
            const desc=document.createElement('p');
    
            const newDate= new Date(res.date).toLocaleString('en-US',{
                timeZone:'Asia/Jakarta'
            });
            image.src=res.image;
        title.textContent=res.title;
        date.textContent=`${res.source} . ${newDate}`;
        desc.textContent=res.body;
        imageLink.href=res.url;
        imageLink.appendChild(image);
        Div.appendChild(imageLink);
        Div.appendChild(title);
        Div.appendChild(date);
        Div.appendChild(desc);
        
        articleDiv.appendChild(Div);
        imageLink.target="_blank";
   
    });

    } catch (error) {
        console.error(error);
    }
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
