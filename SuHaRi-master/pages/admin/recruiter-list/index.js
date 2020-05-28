//1. Получить данные всех HR с сервера 
//2. Написать функцию которая принимает с данными о HR и создает HTML элемент
//3. В зависимости от статуса HR добавляем либо в левую либо в правую колонку 

document.addEventListener("DOMContentLoaded", () => {
   const request = document.querySelector('.asideRequest')
   const verified = document.querySelector('.asideVerify')
  
   const createHR = (HRdata) => {
     const {name, company, tel} = HRdata
     const HR = document.createElement('div');
     HR.className = 'student';
     HR.innerHTML = `
     <div class="row hr border rounded mt-3">
                            <div class="hrtxt col-8">
                                <p class="mb-0"><b>Имя:</b> ${name}</p>
                                <p class="mb-0"><b>Компания:</b> <span class="company">${company} </span></p>
                                <p class="mb-0"><b>Телефон:</b>${tel}</p>
                            </div>
                            <div class="col-3"> <img src="../../../img/man.png" alt="" class="photo rounded-circle border w-100"></div>
                        </div>                      
     `;
    return HR;
   };
   const getAllHrs = () => {
    fetch('http://goiteens.club/hse/back/hrs.php')
        .then(data => data.json())
        .then(data => {
        for(let i = 0;i < data.length; i++){
          const newHR = createHR(data[i])
          if(data[i].status === '0'){
            request.append(newHR)
          }else{
           verified.append(newHR)
          }
        }
        })
   }
   getAllHrs();
   function search(evt) {
    const filter = evt.target.value.toUpperCase();
    const hrs = document.querySelectorAll(".hr");
    for (let i = 0; i < hrs.length; i++) {
        const company = hrs[i].querySelector(".company").textContent.toUpperCase();
        let isEqual = true;
        for (let j = 0; j < filter.length; j++) {
            if (company[j] !== filter[j]) {
                isEqual = false
            }


        }

        if (isEqual) {
            hrs[i].style.display = "block";
        } else {
            hrs[i].style.display = "none";
        }
    }
}
const input = document.querySelector(".search-form");
input.addEventListener("keyup", search);

})