let selectAllCheckbox = document.getElementById('select-all');
let copyButton = document.getElementById('copy-button');
let navigator = window.navigator;

function selectAll() {
    let checkboxes = Array.from(document.querySelectorAll('.select-single'));
    if (selectAllCheckbox.checked) {
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
}

function copyToClipboard() {
    let emails = Array.from(document.querySelectorAll('.email'));
    let checkedEmails = Array.from(document.querySelectorAll('.select-single')).map((checkbox, i) => {
        if (checkbox.checked) {
            return i;
        }
    });
    let emailString = '';
    if (checkedEmails.length) {
        emails.forEach((email, i) => {
            if (checkedEmails.includes(i)) {
                emailString += email.textContent + '\n';
            }
        });
        try {
            navigator.clipboard.writeText(emailString);
        } catch (err) {
            console.log(err);
            return;
        }

        let toastMessage = document.getElementById('toastMessage');
        toastMessage.className = 'show';
        setTimeout(function () {
            toastMessage.className = toastMessage.className.replace('show', '');
        }, 3000);
    } else {
        alert('Please select at least one email to copy.');
    }
}

function updateSelectAll() {
    let checkboxes = Array.from(document.querySelectorAll('.select-single'));
    selectAllCheckbox.checked = checkboxes.every(checkbox => checkbox.checked);
}

selectAllCheckbox.addEventListener('click', selectAll);

copyButton.addEventListener('click', copyToClipboard);