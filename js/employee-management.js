/*eslint-env browser*/

var employees = [
    ["Allen Iverson", "Point Guard", 1003],
    ["Kobe Bryant", "Shooting Guard", 1008],
    ["LeBron James", "Small Forward", 1023],
    ["Kevin Garnett", "Power Forward", 1005],
    ["Hakeem Olajuwon", "Center", 1034]
];

function showElementWithID(id) {
    var element = document.getElementById(id);
    element.style.visibility = "visible";
}

function hideElementWithID(id) {
    var element = document.getElementById(id);
    element.style.visibility = "hidden";
}

function clearInputFieldWithID(id) {
    var element = document.getElementById(id);
    element.value = "";
}

function hideErrorMessages() {
    hideElementWithID("name_error");
    hideElementWithID("title_error");
    hideElementWithID("ext_error");
}

function checkEmployeesCount() {
    if (employees.length == 0) {
        hideElementWithID("employees_table");
    }
}

function validateForm() {
    var valid = true;

    var nameField = document.getElementById("name");
    var name = nameField.value;
    if ((name == "") || (name == undefined)) {
        showElementWithID("name_error");
    }

    var titleField = document.getElementById("title");
    var title = titleField.value;
    if ((title == "") || (title == undefined)) {
        showElementWithID("title_error");
        valid = false;
    }

    var extField = document.getElementById("ext");
    var ext = extField.value;
    if (isNaN(ext) || (ext == "") || (ext == undefined) || (! /^[0-9]{4}$/.test(ext))) {
        showElementWithID("ext_error");
        valid = false;
    }

    return valid;
}

function addEmployee() {
    var emp = [];
    var empTable = document.getElementById("employees_table");
    var tableRow = document.createElement("tr");

    var nameField = document.getElementById("name");
    var name = nameField.value;
    emp[0] = name;
    var employeeName = document.createElement("td");
    employeeName.innerHTML = name;

    var titleField = document.getElementById("title");
    var title = titleField.value;
    emp[1] = title;
    var employeeTitle = document.createElement("td");
    employeeTitle.innerHTML = title;

    var extField = document.getElementById("ext");
    var ext = extField.value;
    emp[2] = ext;
    var employeeExt = document.createElement("td");
    employeeExt.innerHTML = ext;

    var deleteTableCell = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "blue_btn";
    deleteButton.addEventListener("click", deleteEmployee);
    deleteTableCell.appendChild(deleteButton);

    tableRow.appendChild(employeeName);
    tableRow.appendChild(employeeTitle);
    tableRow.appendChild(employeeExt);
    tableRow.appendChild(deleteTableCell);

    empTable.appendChild(tableRow);
    employees[employees.length] = emp;
    getEmployeesCount();
}

function deleteEmployee(event) {
    var deleteButton = event.currentTarget;
    var deleteButtonCell = deleteButton.parentElement;
    var deleteButtonRow = deleteButtonCell.parentElement;
    deleteButtonRow.remove();
    getEmployeesCount();
}

function getEmployeesCount() {
    var employeesHeader = document.getElementById("employees_header");
    employeesHeader.innerHTML = "Showing " + employees.length + " Employees";
}

function createEmployeesTable() {
    var empTable = document.getElementById("employees_table");

    for (var i in employees) {
        var emp = employees[i];
        var tableRow = document.createElement("tr");
        var employeeName = document.createElement("td");
        employeeName.innerHTML = emp[0];
        var employeeTitle = document.createElement("td");
        employeeTitle.innerHTML = emp[1];
        var employeeExt = document.createElement("td");
        employeeExt.innerHTML = emp[2];

        var deleteTableCell = document.createElement("td");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "blue_btn";
        deleteButton.addEventListener("click", deleteEmployee);
        deleteTableCell.appendChild(deleteButton);

        tableRow.appendChild(employeeName);
        tableRow.appendChild(employeeTitle);
        tableRow.appendChild(employeeExt);
        tableRow.appendChild(deleteTableCell);

        empTable.appendChild(tableRow);
    }
    getEmployeesCount();
}

function formHandler() {
    var addEmployeeForm = document.getElementById("add_employee_form");
    addEmployeeForm.addEventListener("submit", function(e) {
        e.preventDefault();
        hideErrorMessages();
        var isValid = validateForm();
        if (isValid) {
            addEmployee();
            clearInputFieldWithID("name");
            clearInputFieldWithID("title");
            clearInputFieldWithID("ext");
        }
    });
}

function init() {
    formHandler();
    hideErrorMessages();
    createEmployeesTable();
}

window.addEventListener("load", init);