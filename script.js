let container=document.querySelector('.row');
let j=0,k=0;
async function getPosts(){
  const response=await fetch('https://jsonplaceholder.typicode.com/posts');
  const data=await response.json();
    console.log(data);
    j=data.length+1;
    for(i=0;i<data.length;i++){
        container.innerHTML+=`
        <div class="col-sm-6 col-lg-4 mb-4 g-lg-5">
          <div class="card h-100">
            <div class="card-body d-flex flex-column">
            <div class="h-95">
              <h5 class="card-title title">${data[i].title}</h5>
              <p class="card-text id">${data[i].userId}</p>
              <p class="card-text">${data[i].id}</p>
              <p class="card-text body">${data[i].body}</p>
              </div>
              <div class="text-center h-5 mt-auto">
              <a href="#" class="edit btn btn-success m-2">Update</a>
              <a href="#" class="del btn btn-danger m-2">Delete</a>
              </div>
            </div>
            </div>
        </div>`        
    }
  }
getPosts();
let create=document.querySelector(".create");
let details=document.querySelector(".details");
let containerr=document.querySelector(".container");
let submit=document.querySelector(".submit");
let update=document.querySelector(".update");
let x=document.querySelector(".fa-xmark");

let title=document.getElementById('title');
let content=document.getElementById('content');
let cardTitle;
let cardContent;
document.querySelector('.row').addEventListener('click', (event) => {
  if (event.target.classList.contains('edit')) {
      console.log("first");
      
      details.style.display='block';
      containerr.style.display='none';
      update.style.display='block';
      submit.style.display='none';
      const card = event.target.closest('.card');
        cardTitle = card.querySelector('.title');
         cardContent = card.querySelector('.body');
        let id = card.querySelector('.id').textContent;

        title.value = cardTitle.textContent;
        content.value=cardContent.textContent;
        console.log(cardTitle.textContent)
        console.log(cardContent.textContent)
      update.addEventListener('click',(e)=>{
        e.preventDefault();
        console.log(id)
        editPost(id)
        console.log("clicked") 
      })
  }
  if (event.target.classList.contains('del')) {
    let f=confirm("Do you want to delete this post?");
    if(f){
    const card = event.target.closest('.card');
    let id = card.querySelector('.id').textContent;
    card.remove();
    deletePost(id)
    }
  }
});
create.addEventListener('click',()=>{
  title.value=''
  content.value=''
  details.style.display='block';
  containerr.style.display='none';
  update.style.display='none';
  submit.style.display='block';
})
x.addEventListener('click',()=>{
  containerr.style.display='block';
  details.style.display='none';
})
update.addEventListener('click',()=>{
  containerr.style.display='block';
  details.style.display='none';
})


async function editPost(id){
  const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
    method:"PUT",
    body:JSON.stringify({
      id:j,
      title:title.value,
      body:content.value,
    }),
    headers:{
      "Content-type":"application/json"
    }
  });
  const data = await response.json();
  console.log(data)
  cardTitle.textContent=data.title;
  cardContent.textContent=data.body;
  document.querySelector('.updated').classList.remove('d-none');
  setTimeout(() => {
    document.querySelector('.updated').classList.add('d-none');
  }, 5000);

}
async function deletePost(id){
  const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
    method:"DELETE",
  });
  console.log(response);
}
async function createPost(event) {

  const response=await fetch('https://jsonplaceholder.typicode.com/posts',{
    method:"POST",
    body:JSON.stringify({
      userId:j,
      id:j,
      title:title.value,
      body:content.value
    }),
    headers:{
      "Content-type":"application/json; charset=UTF-8"
    }}
    
    )
    const data = await response.json();
    
      console.log(data);
          container.innerHTML+=`
          <div class="col-sm-6 col-lg-4 mb-4 g-lg-5">
            <div class="card h-100">
              <div class="card-body d-flex flex-column">
              <div class="h-95">
              <h5 class="card-title">${data.title}</h5>
              <p class="card-text">${data.id}</p>
                <p class="card-text">${data.userId}</p>
                <p class="card-text">${data.body}</p>
                </div>
                <div class="text-center h-5 mt-auto">
                <a href="#" class="btn btn-success m-2">Update</a>
                <a href="#" class="btn btn-danger m-2">Delete</a>
                </div>
              </div>
              </div>
          </div>`        
  
  document.querySelector('.created').classList.remove('d-none');
  setTimeout(() => {
    document.querySelector('.created').classList.add('d-none');
  }, 3000);
}

submit.addEventListener('click',(e)=>{
  e.preventDefault();

  createPost();
  j=j+1;
  k=j;
  details.style.display='none';
  containerr.style.display='block';
  title.value=''
  content.value=''
})