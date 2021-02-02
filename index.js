'use strict';

/*

accounts array
dom selections

==>login form =>btn click => add EL=>
find account with this username
if account exists, compare pin number
if pin is correct, 
    display message with first name,
    clear username and pin input fields,
    blur pin field
    change opacity to 100 for container
    init();
    start timer();
=====

==> transfer form => btn click=>addEL
store inputs in variables
clear fields
(check if reeiver acnt exist,
if sender balance is more than transfer amt,
sender != receiver) => transfer();
reset timer();
=======

==>  loan apply form => btn click=>addEL
store input in variables and clear fields
(check if atleast one deposit is greater than 20% of loan amt ) => grantLoan();
reset timer();
======

==> close account form => btn click => addEL
check if pin is correct
remove user from accounts array.
=====


=========
    init(){
    displayBalance()
    displayMovements() calculate movements list and update html
    displaySummary() calc total of deposit, withdrawal, interest, display in summary
    }
========

transfer(){
    add -ve elt to movement array of sender 
    add +ve elt to movement array of sender 
    init();
}
=======

grantLoan(){
    add +ve elt ro movement array of user.
    init();
}

=========

start timer(){
time=== 0 => hide container
}

*/


const accounts =[{
    fullName :'Tim Cook',
    pin : 1234,
    movements :[100,-30,4983],
    rate : 1.2,
    },
    {
        fullName : 'Mark Zuckerberg',
        pin:2345,
        movements : [377,-84,-44,88],
        rate : 0.8,
    },
    {
        fullName : 'Jack Dorsey',
        pin :5678,
        movements :[883,-4,54,-97],
        rate :1.5,
    }];
    
    // dom selections
    //welcome message
    const labelMessage = document.querySelector('.message');
    
    //login
    const inputUserName = document.querySelector('.userName');
    const inputPin = document.querySelector('.pin');
    const btnLogin = document.querySelector('.login');
    
    //container
    const container = document.querySelector('.container');
    const labelBalance = document.querySelector('.balance');
    const movements = document.querySelector('.movements');
    
    //summary
    const summary = document.querySelector('.summary');
    const labelDepositTotal = document.querySelector('.depositTotal');
    const labelWithdrawTotal = document.querySelector('.withdrawTotal');
    const lableInterestTotal = document.querySelector('.interestTotal');
    
    //transfer
    const transferAmount = document.querySelector('.transferAmount');
    const transferTo = document.querySelector('.transferTo');
    const btnTransfer = document.querySelector('.transfer');
    
    //close
    const inputPinClose = document.querySelector('.pinClose');
    const btnClose = document.querySelector('.close');
    
    //loan
    const inputLoanAmount = document.querySelector('.loanAmount');
    const btnLoan = document.querySelector('.loan');
    
    //sort
    const btnSort = document.querySelector('.sort');
    
    //timer
    const labelTimer = document.querySelector('.timer');
    
    //date
    const labelDateToday = document.querySelector('.dateToday');
    //////////
    
    let currentUser;
    let sorted=false;
    let timer;
    
    ////
    
    const createUserName = function(){
    accounts.forEach(function(acc){
        let firstLetters=[];
        acc.fullName.split(' ')
        .map(n=>firstLetters.push(n[0]))
        acc.userName = firstLetters.join('');
    });
    }
    createUserName();
    
    const displayBalance =function(curUser){
        labelBalance.textContent = curUser.movements.reduce(function(acc,value,i,arr){return acc+value;},0);
    }
    
    const displayMovement =function(curUser,sorted=false){
    
        const movs = sorted? curUser.movements.slice().sort((a,b)=>a-b):curUser.movements;
        movements.innerHTML='';
        movs.forEach(function(mov,i,arr){
            
            let type=mov>0?'deposit':'withdraw';
            let html=`<div class="movementRow">
            <span>${i+1}</span>
            <span>${mov}</span>
            <span>${type}</span>
            
            </div>`;
            
            
            movements.insertAdjacentHTML('afterbegin',html);
        });
        
    }
    
    const displaySummary =function(curUser){
        labelDepositTotal.textContent = curUser.movements.filter(mov=> mov>0).reduce(function(acc, value, i, arr){return acc+value;},0);
        labelWithdrawTotal.textContent = curUser.movements.filter(mov=> mov<0).reduce(function(acc, value, i, arr){return acc+value;},0);
        lableInterestTotal.textContent = curUser.movements.filter(mov=> mov>0).map(mov=>mov * curUser.rate).reduce(function(acc, value, i, arr){return acc+value;},0);
        
    }
    
    //timer
    const startLogOutTimer = function () {
        const tick = function () {
          const min = String(Math.trunc(time / 60)).padStart(2, 0);
          const sec = String(time % 60).padStart(2, 0);
      
          // In each call, print the remaining time to UI
          labelTimer.textContent = `${min}:${sec}`;
      
          // When 0 seconds, stop timer and log out user
          if (time === 0) {
            clearInterval(timer);
            container.style.opacity = 0;
          }
      
          // Decrease 1s
          time--;
        };
      
        // Set time in seconds
        let time = 30;
      
        // Call the timer every second
        tick();
        const timer = setInterval(tick, 1000);
      
        return timer;
      };
    
    //init
    const init = function(){
        displayBalance(currentUser);
        displayMovement(currentUser);
        displaySummary(currentUser);
    
    }
    
    //close accnt
    const close = function(i){
        accounts.splice(i,1);
        container.style.opacity = 0;
        console.log(accounts);

    }
    
    //login form
    btnLogin.addEventListener('click',function(e){
        e.preventDefault();
        
        currentUser=accounts.find(acc=>acc.userName ===inputUserName.value);
        if(currentUser.pin === Number(inputPin.value)){
            labelMessage.textContent=`Welcome ${currentUser.fullName.split(' ')[0]}`;
            inputUserName.value = inputPin.value = '';
            container.style.opacity=100;
            alert('login success');
            inputPin.blur();
            init();    
            // Timer
            if (timer) clearInterval(timer);
        timer = startLogOutTimer();
        labelDateToday.textContent= new Intl.DateTimeFormat('en-US').format(new Date());
            
        }
        
    });
    
    //transfer
    btnTransfer.addEventListener('click',function(e){
        e.preventDefault();
        let receiver = accounts.find(acc=> acc.userName === transferTo.value);
        console.log(receiver);
        if(receiver && Number(transferAmount.value)<Number(labelBalance.textContent)) {
            currentUser.movements.push(-Number(transferAmount.value));
            receiver.movements.push(Number(transferAmount.value));
            alert('Transfer success');
        }
        transferAmount.value = transferTo.value = '';
        transferTo.blur();
        init();
        // Reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
    });
    
    
    //close accnt
    btnClose.addEventListener('click',function(e){
    e.preventDefault();
    if(Number(inputPinClose.value) === currentUser.pin ){
        let index = accounts.findIndex(acc=>acc.userName === currentUser.userName);
    close(index);
    }
    });
    
    //loan form
    btnLoan.addEventListener('click',function(e){
        e.preventDefault();
        if(currentUser.movements.some(mov=>mov> 0.2 * Number(inputLoanAmount.value))){
         setTimeout(function(loan){
            currentUser.movements.push(loan);
            init();},3000,Number(inputLoanAmount.value));
        }
        
        else{
            alert('Amount very high !  apply for a lesser amount');
        }
        inputLoanAmount.value='';
        
    });
    
    
    //sort
    btnSort.addEventListener('click',function(e){
        console.log('sort');
        e.preventDefault();
        displayMovement(currentUser,!sorted)
    sorted=!sorted;
    });