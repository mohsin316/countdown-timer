//connecting to the dom

const currentHour= document.querySelector('.currenthour');
const currentMinute = document.querySelector('.currentminute');
const currentSecond = document.querySelector('.currentsecond');

const form = document.querySelector('form')
const error = document.querySelector('.error');


const countdownHour= document.querySelector('.countdownhour');
const countdownMinute = document.querySelector('.countdownminute');
const countdownSecond = document.querySelector('.countdownsecond');


const now = new Date()
let wholeDate;

//setting up the users specified time

form.addEventListener('submit', e=> {
    e.preventDefault()

    let hour = Number(form.hour.value)
    let minute = Number(form.minute.value)
    let second = Number(form.second.value) + 1

    if (!check(hour)){
        error.textContent = 'Please enter a valid number.'
        hour = '00'
    }else if (!check(minute)){
        error.textContent = 'Please enter a valid number.'
        minute = '00'
    }else if (!check(second-1)){
        error.textContent = 'Please enter a valid number.'
        second = '00'
        form.second.value = second
        second++
    }else{
        error.textContent = ''
    }

    if (hour >= 24){
        hour = 00
        form.hour.value = hour
    }
    if (minute >= 60){
        minute = 00
        form.minute.value = minute
    }
    if (second >= 60){
        second = 00
        form.second.value = second
        second++
    }

    if (hour === ''){
        hour = 00
    }
    if (minute === ''){
        minute = 00
    }
    

    form.hour.value = ('0' + hour).slice(-2);
    form.minute.value = ('0' + minute).slice(-2);
    if(form.second.value == 0){
        form.second.value = '00'
    }else{
        form.second.value = ('0' + (second - 1) ).slice(-2);
    }

    const date = now.getDate();
    const month = now.toLocaleString('default', {month:'long'});
    const year = now.getFullYear();
    const time = `${hour}:${minute}:${second}`
    wholeDate = `${date} ${month} ${year} ${time}`

    //adding to local storage 
    localStorage.setItem('time', wholeDate)
    localStorage.setItem('hour', hour)
    localStorage.setItem('minute', minute)
    localStorage.setItem('second', second)

})

//regex for checking invalid change

const check = num => {
    const re = /^[0-9]*$/;
    return re.test(num);
}




//getting the current time
const nowTime = () => {
    const now = new Date();
    currentHour.textContent = dateFns.format(now, 'HH');  
    currentMinute.textContent = dateFns.format(now, 'mm'); 
    currentSecond.textContent = dateFns.format(now, 'ss'); 
}

nowTime()

setInterval(nowTime, 1000);



//getting the difference between current time and estimated time
const diffTime = () => {
    let estimatedDay = new Date(wholeDate).getTime();
    const now = new Date().getTime();
    const timeleft = estimatedDay - now;
    if(timeleft > 0){
        const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    
        countdownHour.textContent = ('0' + hours).slice(-2);
        countdownMinute.textContent = ('0' + minutes).slice(-2);
        countdownSecond.textContent = ('0' + seconds).slice(-2);
    }else{
        countdownHour.textContent = '00';
        countdownMinute.textContent = '00';
        countdownSecond.textContent = '00';
    }

}
diffTime()
setInterval(diffTime, 1000);


//checking if localstorage already has data
if(localStorage.getItem('time')){
    wholeDate = localStorage.getItem('time')
    form.hour.value = ('0' + localStorage.getItem('hour')).slice(-2);
    form.minute.value = ('0' + localStorage.getItem('minute')).slice(-2);
    if(form.second.value == 0){
        form.second.value = '00'
    }else{
        form.second.value = ('0' + (localStorage.getItem('second') - 1) ).slice(-2);
    }
};


