/* 
File name: app.js
Student Name: Joseph Volpe
StudentID: 301118010
Date: 10/22/2020
*/

// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");

        if(document.title == "Contact")
        {
            let sendButton = document.getElementById("sendButton");
            let cancelButton = document.getElementById("cancelButton");
            let form = document.forms[0];

            sendButton.addEventListener("click", (event) => {
                event.preventDefault();

                let fullName = document.getElementById("fullName").value;
                let contactNumber = document.getElementById("contactNumber").value;
                let emailAddress = document.getElementById("emailAddress").value;
                let message = document.getElementById("message").value;

                console.info(`Full Name: ${fullName}
                Contact Number: ${contactNumber}
                Email Address :${emailAddress}
                Message       :${message}`);
                if(confirm("Would you like to submit?\nYou will be returned to homepage once submitted."))
                {
                    location.href = "/home";
                }
            });

            cancelButton.addEventListener("click", (event) => {
                event.preventDefault();
                if(confirm("Are you Sure?"))
                {
                    form.reset();
                  
                }
            });
        }
    }

    window.addEventListener('load', Start);
})();
