const totalIssue = document.getElementById('totalIssue');

async function loadAllIssue() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    displayLoadAllIssue(data.data)
}  
loadAllIssue()

async function displayLoadAllIssue(datas){
const cardContainer = document.getElementById('cards-container')
cardContainer.innerHTML =''
totalIssue.innerText = datas.length
let cardClass = ''
    datas.forEach(data => {
        if(data.status === 'open'){
        cardClass = 'border-t-4 border-[#00A96E]'
        }else if(data.status=== 'closed'){
            cardClass = 'border-t-4 border-[#A855F7]'   
}
       const div = document.createElement('div');
       div.innerHTML = `
        <div onclick="singleProblem(${data.id})" class="card bg-base-100 shadow-lg h-full mx-2 overflow-hidden">
                    <div class="card-body ${cardClass}">
                        <div class="card-status flex items-center">
                            <img class="" src="${data.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="">
                            <p class="text-right text-[#EF4444]">${data.priority}</p>
                        </div>
                        <h2 class="card-title text-sm font-semibold">${data.title}</h2>
                        <p class="text-[12px] text-[#64748B]">${data.description}</p>
                        <div class="card-actions flex justify-start text-center">
                            ${createElement(data.labels)}
                        </div>
                        <hr class="text-[#bdc3c7] mt-3">
                        <p class="text-[#64748B]"><span># ${data.id}</span> by ${data.author}</p>
                        <p class="text-[#64748B]">${new Date(data.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
       `
        cardContainer.append(div)
//  signleProblem(data.status)
        
    });
    

}



const createElement = (arr) => {
    const htmlElement = arr.map(element => {

        let icon = '';

        if (element === 'bug') {
            icon = 'fa-bug  text-red-500';
        } 
        else if (element === 'help wanted') {
            icon = 'fa-handshake-angle';
        } 
        else if (element === 'good first issue') {
            icon = 'fa-arrow-trend-up';
        } 
        else if (element === 'documentation') {
            icon = 'fa-readme';
        } 
        else {
            icon = 'fa-tag';
        }

        return `
        <span class="bg-[#FEECEC] w-fit px-2 text-[#D97706] rounded-4xl">
            <i class="fa-solid ${icon}"></i> ${element}
        </span>
        `;
    });

    return htmlElement.join('');
}

function buttonClick(name){
    const button = document.querySelectorAll('.buttons button')
    button.forEach(btn=>{
        btn.classList.remove('btn-primary')
    })
    name.classList.add('btn-primary')
    // console.log(name.innerText)
    if(name.innerText==='Open'){
        loadOpenIssue()
    }
    else if(name.innerText==='Closed'){
        loadCloseIssue()
    }else if(name.innerText==='All'){
        loadAllIssue()
    }
    
}

async function loadOpenIssue() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const openData = data.data.filter(err => err.status === 'open')
    displayLoadAllIssue(openData)
}  
async function loadCloseIssue() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    const closeData = data.data.filter(err => err.status === 'closed')
    displayLoadAllIssue(closeData)
}  

async function singleProblem(id){
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res = await fetch(url);
    const data = await res.json()
    displaysingleProblem(data.data)
}

function displaysingleProblem(data){
    console.log(data)
    const detailBox = document.getElementById('detail-container');
    detailBox.innerHTML =  `
        <h2 class='text-2xl font-bold'>${data.title}</h2>
                <div class='flex justify-start items-center gap-5 my-2'>
                    <p class="bg-[#00A96E] px-2 py-1 rounded-full w-[62px] text-center text-white">${data.status}</p>
                    <p>Opened by ${data.author}</p>
                    <p>${new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
                <div class=''>
                    <p>${createElement(data.labels)}</p>
                </div>
                
                <p class='text-[16px] text-[#64748B] my-6'>${data.description}</p>

                <div class='bg-[#F8FAFC] p-5 flex justify-between'>
                    <div>
                        <p class='text-[#64748B] text-[16px]'>Assignee:</p>
                        <p class='font-semibold'>${data.assignee}</p>
                    </div>
                    <div>
                        <p class='text-[#64748B] text-[16px]'>Priority:</p>
                        <p class='font-semibold'>${data.priority}</p>
                    </div>

                </div>    
    `
    document.getElementById('word_modal').showModal();
}


