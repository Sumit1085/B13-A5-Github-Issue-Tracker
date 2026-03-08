async function loadAllIssue() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    displayLoadAllIssue(data.data)
}  
loadAllIssue()

async function displayLoadAllIssue(datas){
const cardContainer = document.getElementById('cards-container')
    datas.forEach(data => {
       const div = document.createElement('div');
       div.innerHTML = `
        <div class="card bg-base-100 shadow-lg h-full ml-5 mt-5">
                    <div class="card-body ">
                        <div class="card-status flex items-center">
                            <img class="" src="./assets/Open-Status.png" alt="">
                            <p class="text-right text-[#EF4444]">${data.priority}</p>
                        </div>
                        <h2 class="card-title text-sm font-semibold">${data.title}</h2>
                        <p class="text-[12px] text-[#64748B]">${data.description}</p>
                        <div class="card-actions justify-start grid grid-cols-4 text-center">
                            <p class="bg-[#FEECEC] flex items-center text-[#EF4444] p-1 rounded-4xl"><i class="fa-solid text-[#EF4444] fa-bug"></i> Bug</p>
                            <p class="bg-[#FEECEC] w-[112px] p-1 text-[#D97706] rounded-4xl"><i class="fa-regular text-[#D97706] fa-life-ring"></i></i> help wanted</p>
                        </div>
                        <hr class="text-[#bdc3c7] mt-3">
                        <p class="text-[#64748B]"><span># ${data.id}</span> by ${data.author}</p>
                        <p class="text-[#64748B]">1/15/2024</p>
                    </div>
                </div>
       `
        cardContainer.append(div)
    });

}