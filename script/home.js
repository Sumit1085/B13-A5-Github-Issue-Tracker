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
        <div class="card bg-base-100 shadow-lg h-full mx-2 overflow-hidden">
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
        btn.classList.add('btn-primary')
    })
    name.classList.remove('btn-primary')
}


const buttons = document.querySelectorAll('#buttons button')
function buttonclick(){
    
}