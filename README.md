# javascript-functional-programming-array-methods-practice-Bank-account-login-transactions
I created  a web page for Bank account login+transactions. I used javascript array methods. I used functional programming.

Pseudocode:

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

