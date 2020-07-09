const tableKey = "table";

let table;

let tableStart = {
    "Radzevičius" : {
        "first_name" : "Arnas",
        "last_name" : "Radzevičius",
        "date_of_birth" : "1998-09-20",
        "phone_number" : "37065612326",
        "e_mail" : "arnaas395@gmail.com",
        "address" : "Sukilėlių pr. 11"
    },

    "Testavicius" : {
        "first_name" : "Test",
        "last_name" : "Testavicius",
        "date_of_birth" : "1998-12-11",
        "phone_number" : "37065611456",
        "e_mail" : "test@gmail.com",
        "address" : "V.Krėvės pr. 15"
    },

    "Sabonis" : {
        "first_name" : "Lukas",
        "last_name" : "Sabonis",
        "date_of_birth" : "1995-05-30",
        "phone_number" : "37011651981",
        "e_mail" : "lukas@gmail.com",
        "address" : "Miško g. 10"
    }
};

let refreshTable = function() {

    let tableNumbers = Object.keys(table);
    let tableContainer = document.getElementById("tableContainer");
    let tableBody = document.getElementById("tBody");
    tableContainer.removeChild(tableBody);
    let newTableBody = document.createElement("div");
    newTableBody.id = "tBody";

    tableContainer.appendChild(newTableBody);

    for (let i = 0; i < tableNumbers.length; i++) {

        // Set elements to div

        let currentRow = document.createElement("div");
        let currentFirstNameCol = document.createElement("div");
        let currentLastNameCol = document.createElement("div");
        let currentDateBirthCol = document.createElement("div");
        let currentPhoneNumberCol = document.createElement("div");
        let currentEmailCol = document.createElement("div");
        let currentAddressCol = document.createElement("div");
        let currentEditButton = document.createElement("div");
        let currentDeleteButton = document.createElement("div");


        // Set class to div

        currentRow.className = "row";
        currentFirstNameCol.className = "column first-name";
        currentLastNameCol.className = "column last-name";
        currentDateBirthCol.className = "column date-of-birth";
        currentPhoneNumberCol.className = "column phone-number";
        currentEmailCol.className = "column e-mail";
        currentAddressCol.className = "column address";
        currentEditButton.className = "column edit";
        currentDeleteButton.className = "column delete";

        // Set value of current divs

        currentFirstNameCol.innerHTML = table[tableNumbers[i]].first_name;
        currentLastNameCol.innerHTML = table[tableNumbers[i]].last_name;
        currentDateBirthCol.innerHTML = table[tableNumbers[i]].date_of_birth;
        currentPhoneNumberCol.innerHTML = table[tableNumbers[i]].phone_number;
        currentEmailCol.innerHTML = table[tableNumbers[i]].e_mail;
        currentAddressCol.innerHTML = table[tableNumbers[i]].address;
        currentEditButton.innerHTML = '<img src="images/edit-icon.png" style="height: 30px; width: 30px;">';
        currentDeleteButton.innerHTML = '<img src="images/delete-icon.png" style="height: 30px; width: 30px;">';

        // Push all the divs to table body and create it

        currentRow.appendChild(currentFirstNameCol);
        currentRow.appendChild(currentLastNameCol);
        currentRow.appendChild(currentDateBirthCol);
        currentRow.appendChild(currentPhoneNumberCol);
        currentRow.appendChild(currentEmailCol);
        currentRow.appendChild(currentAddressCol);
        currentRow.appendChild(currentEditButton);
        currentRow.appendChild(currentDeleteButton);
        newTableBody.appendChild(currentRow);
    }

    let enableDisableNewContact = function(option, tableName) {

        let newFirstName = document.getElementById("newFirstName");
        let newLastName = document.getElementById("newLastName");
        let newDateOfBirth = document.getElementById("newDateOfBirth");
        let newPhoneNumber = document.getElementById("newPhoneNumber");
        let newEmail = document.getElementById("newEmail");
        let newAddress = document.getElementById("newAddress");

        newFirstName.value = "";
        newLastName.value = "";
        newDateOfBirth.value = "";
        newPhoneNumber.value = "";
        newFirstName.value = "";
        newEmail.value = "";
        newAddress.value = ""

        let newContactTable = document.getElementById("newContactTable");

        if(tableName === "edit")
            newContactTable.children[0].innerText = "Edit Contact";
        else
            newContactTable.children[0].innerText = "Add New Contact";

        newContactTable.className = option;
    };

    let addNewContact = document.getElementById("addNewContact");
    let newEdit = document.getElementsByClassName("edit");
    let newDelete = document.getElementsByClassName("delete");

    let newExit = document.getElementById("newExit");

    document.getElementById("newContactTable").addEventListener('submit', function(e){
        e.preventDefault();

        let newContactFirstName = document.getElementById("newFirstName").value.trim();
        let newContactLastName = document.getElementById("newLastName").value.trim();
        let newContactDateOfBirth = document.getElementById("newDateOfBirth").value.trim();
        let newContactPhoneNumber = document.getElementById("newPhoneNumber").value.trim();
        let newContactEmail = document.getElementById("newEmail").value.trim();
        let newContactAddress = document.getElementById("newAddress").value.trim();


        let newContactTable = document.getElementById("tableName");

        let checkPhoneNumber = checkContactPhoneNumber(newContactPhoneNumber, newContactTable.innerText);
        let checkEmail = checkContactEmail(newContactEmail, newContactTable.innerText);
    
        if(newContactFirstName !== "" && newContactLastName !== "" && newContactDateOfBirth !== "" && newContactPhoneNumber !== ""
        && newContactEmail !== "")
        {
            if(checkPhoneNumber === false)
            {
                if(checkEmail === false)
                {
                    table[newContactLastName] = {
                        "first_name" : newContactFirstName,
                        "last_name" : newContactLastName,
                        "date_of_birth" : newContactDateOfBirth,
                        "phone_number" : newContactPhoneNumber,
                        "e_mail" : newContactEmail,
                        "address" : newContactAddress
                    }
                    localStorage.setItem(tableKey, JSON.stringify(table));
                    enableDisableNewContact('disable');
                    refreshTable();
                }
                else window.alert("This e-mail is already in use! Please change e-mail address");
            }
            else window.alert("This phone number is already in use! Please change phone number");
        }
    });

    addNewContact.addEventListener('click', function(){
        enableDisableNewContact("enable");
    });

    newExit.addEventListener('click', function(){
        enableDisableNewContact("disable");
    });

    // Edit Buttons

    for (let i = 0; i < newEdit.length; i++){
        newEdit[i].addEventListener("click", function($event){
            let name = $event.target.parentElement.parentElement.children[1].innerText;
            let contact = table[name];

            enableDisableNewContact("enable", "edit");

            let newFirstName = document.getElementById("newFirstName");
            let newLastName = document.getElementById("newLastName");
            let newDateOfBirth = document.getElementById("newDateOfBirth");
            let newPhoneNumber = document.getElementById("newPhoneNumber");
            let newEmail = document.getElementById("newEmail");
            let newAddress = document.getElementById("newAddress");


            newFirstName.value = contact.first_name;
            newLastName.value = contact.last_name;
            newDateOfBirth.value = contact.date_of_birth;
            newPhoneNumber.value = contact.phone_number;
            newEmail.value = contact.e_mail;
            newAddress.value = contact.address;

        })
    }

    // Delete Buttons

    for (let i = 0; i < newDelete.length; i++){
        newDelete[i].addEventListener("click", function($event){
            let name = $event.target.parentElement.parentElement.children[1].innerText;
            let isSure = window.confirm("Are you sure want to delete this contact?");

            if (isSure)
                deleteContact(name);
        })
    }

};

let checkContactPhoneNumber = function(phoneNumber, tableName) {
    let Objects = Object.values(table);
    let phoneNumberTrue = false;

    let formName = checkNameOfForm(tableName);
    if(formName === false)
    {
        for(let i = 0; i < Objects.length; i++)
        {
            if (phoneNumber === Objects[i].phone_number)
            {
                Objects.splice(i, 1);
                console.log("veikia");
            }
        }
    }

    for(let i = 0; i < Objects.length; i++)
    {
        if(phoneNumber === Objects[i].phone_number)
        {
            phoneNumberTrue = true;
        }
    }
    return phoneNumberTrue;
}

let checkContactEmail = function(email, tableName) {
    let Objects = Object.values(table);
    let emailTrue = false;

    let formName = checkNameOfForm(tableName);
    if(formName === false)
    {
        for(let i = 0; i < Objects.length; i++)
        {
            if (email === Objects[i].e_mail)
            {
                Objects.splice(i, 1);
                console.log("veikia");
            }
        }
    }

    for(let i = 0; i < Objects.length; i++)
    {
        if (email === Objects[i].e_mail)
        {
            emailTrue = true;
        }
    }
    return emailTrue;
}

let checkNameOfForm = function (name) {
    let bool = true;
    if(name === "Add New Contact")
    {
        bool = true;
    }
    else
        bool = false;

    return bool;
}

let deleteContact = function(userName) {
    let temp = {};
    let tableNumbers = Object.keys(table);

    for (let i = 0; i < tableNumbers.length; i++) {
        if(userName !== tableNumbers[i]){
            temp[tableNumbers[i]] = table[tableNumbers[i]];
        }
    }

    table = temp;
    localStorage.setItem(tableKey, JSON.stringify(table));
    refreshTable();
}

let init = function() {
    
    if(localStorage.getItem(tableKey)){
        table = JSON.parse(localStorage.getItem(tableKey));
    }
    else{
        table = tableStart;
        localStorage.setItem(tableKey, JSON.stringify(table));
    }

    refreshTable();
}

init();