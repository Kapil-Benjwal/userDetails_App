const handlesubmit = (event) => {

    event.preventDefault();
    let user_name = getFieldValueById('user');
    let user_email = getFieldValueById("email");
    let user_password = getFieldValueById('password');
    let user_qualification = document.getElementsByName('Qualification');
    let selectedQualification = [];
    for (let i = 0; user_qualification.length > i; i++) {
        if (user_qualification[i].checked) {
            selectedQualification.push(user_qualification[i].value);
        }
    }

    let user_gender = document.getElementsByName('Gender');
    let selectedGender = '';
    for (let i = 0; user_gender.length > i; i++) {
        if (user_gender[i].checked) {
            selectedGender += user_gender[i].value;
        }
    }

    if (user_name.trim() === '') {
        setFieldValue('userError', 'User name is required');
    }
    else {
        setFieldValue('userError', '');
    }

    if (user_email === '') {
        setFieldValue('emailError', 'Email is required');
    }
    else if (!userEmailValidation(user_email)) {
        setFieldValue('emailError', 'invalid Email');
    }
    else {
        setFieldValue('emailError', '');
    }

    if (user_password === '') {
        setFieldValue('passwordError', 'Password is required');
    }
    else {
        setFieldValue('passwordError', '');
    }

    if (!selectedQualification.length) {
        setFieldValue('qualificationError', 'choose at least on entity');
    }
    else {
        setFieldValue('qualificationError', '');
    }

    if (selectedGender === '') {
        setFieldValue('genderError', 'choose at least on entity');
    }
    else {
        setFieldValue('genderError', '');
    }


    if (user_name.trim() !== '' && !userEmailValidation(user_email) == '' && user_password !== '' && selectedQualification.length && selectedGender !== '') {
        const userData = {
            name: user_name,
            email: user_email,
            password: user_password,
            qualification: selectedQualification,
            gender: selectedGender
        };

        let userIndex = getFieldValueById('element-id') || -1;
        let dataArray = JSON.parse(localStorage.getItem('userList'));
        if (!Array.isArray(dataArray)) {
            dataArray = [];
        }
        if (userIndex === -1) {
            dataArray.push(userData);
            localStorage.setItem('userList', JSON.stringify(dataArray));

        } else {
            dataArray[userIndex] = userData;
            localStorage.setItem('userList', JSON.stringify(dataArray));
        }

        console.log(dataArray);

    }
    else {
        return false;
    }

    document.getElementById('user').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('element-id').value = '',
        document.getElementById('mtech').checked = '';
    document.getElementById('btech').checked = '';
    document.getElementById('mca').checked = '';
    document.getElementById('bca').checked = '';
    document.getElementById('male').checked = '';
    document.getElementById('female').checked = '';

    updateTable();
}

const getFieldValueById = (id) => {
    let element = document.getElementById(id);
    if (id && element) {
        return element.value;
    }
    return '';
}

const setFieldValue = (id, errorMessage) => {
    document.getElementById(id).innerHTML = errorMessage;
}


const userEmailValidation = (email) => (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) ? true : false;

let onChangeValidation = () => {
    let user_email = getFieldValueById("email");
    (user_email !== '') ? setFieldValue('emailError', 'Type valid Email') : false;
    (userEmailValidation(user_email)) ? setFieldValue('emailError', '') : false;
}

const clearErrorMessage = () => {
    setFieldValue('userError', '');
    setFieldValue('emailError', '');
    setFieldValue('passwordError', '');
    setFieldValue('qualificationError', '');
    setFieldValue('genderError', '');
}

const updateTable = () => {
    let str = '';
    let dataArray = JSON.parse(localStorage.getItem('userList'));
    if (!dataArray) {
        return;
    }
    dataArray.forEach((element, index) => {
        str += `<tr>
                <th>${index + 1}</th>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.qualification}</td>
                <td>${element.gender}</td>
                <td><img src="~/delete-icongarbage-trash-can-rubbish-260nw-1211550652.webp" alt='delete' class = 'w-50' onclick="deleteData(${index})"><img src="/84380.png" alt='delete' class = 'w-50' onclick="bindEditData(${index})"></td>
             </tr>`;
    });

    setFieldValue('tablebody', str);

}

const deleteData = (itemIndex) => {
    let dataArray = JSON.parse(localStorage.getItem('userList'));
    dataArray.splice(itemIndex, 1);
    localStorage.setItem('userList', JSON.stringify(dataArray));
    updateTable();
}

const bindEditData = (i) => {
    let local = JSON.parse(localStorage.getItem('userList'));
    getInputById("user", local[i].name);
    getInputById('email', local[i].email);
    getInputById('password', local[i].password);
    getInputById('element-id', i);
    document.getElementById('mtech').checked = false;
    document.getElementById('btech').checked = false;
    document.getElementById('mca').checked = false;
    document.getElementById('bca').checked = false;
    local[i].qualification.forEach((value) => {
        document.getElementById(value).checked = true;
    });
    document.getElementById(local[i].gender).checked = true;
}

const getInputById = (id, value) => {
    document.getElementById(id).value = value;
}

updateTable();