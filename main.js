const form = document.getElementById('form')
const email = document.getElementById('email')
const username = document.getElementById('username')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

const showError = (input, message) => {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small')
    small.innerText = message
}

const showSuccess = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
    } else {
        showError(input, 'Invalid Email')
    }
}

const checkRequired = inputArr => {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `Password re-entry is required`)
        } else {
            showSuccess(input)
        }
    }
    )
}

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} can't be longer than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
      showError(input2, 'Passwords do not match')
  }
}

const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

form.addEventListener('submit', e => {
    e.preventDefault()

    checkRequired([username, email, password, password2])
    checkLength(username, 5, 15)
    checkLength(password, 6, 20)
    checkEmail(email)
    checkPasswordsMatch(password, password2)
})