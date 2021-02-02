# javascript-functional-programming-array-methods-practice-Bank-account-login-transactions
I created  a web page for Bank account login+transactions. I used javascript array methods. I used functional programming.
======
Login:
login username and pin check. I display alert error message for unsuccesful login

username:
i create username using first letters of each word in the name. eg MZ for Mark Zuckerberg

Timer:
timer starts when user logs in.
if user is idle for 30 seconds, user is logged out.
if user makes any transfer, then I reset the timer.
===

after login:
I display 
welcome message 
today's date
total balance
total deposit
total withdrawal
total interest
====

I have different rate of interest of every person.
===

transfer money:
user enters amount and receiver's username.
i check if receiver exists, if sender has more money than the transfer amount, then I reduce amount from sender, and add amount to receiver.

close account:
user enters pin, i check pin and delete his/her account.

Request loan:
user enters loan amount.
i check if at least one deposit is 20 percent of the requested loan amount, if ok, I use a timer of 3 seconds . after 3 seconds , I add the loan amount to his account, if not i alert message "apply for lesser amount".

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

