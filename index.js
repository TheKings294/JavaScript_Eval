document.addEventListener('DOMContentLoaded', () => {
    const PA_PROGRESS_BAR = 10

    const nextBtnTest = document.querySelector('#next-btn')
    const previousBtnTest = document.querySelector('#previous-btn')

    nextBtnTest.addEventListener('click', () => {
        GlobalFunction(true)
    })

    previousBtnTest.addEventListener('click', () => {
        GlobalFunction(false)
    })

    const GlobalFunction = (value) => {
        const formElements = document.querySelectorAll('.tab-pane')

        for (let i = 0; i < formElements.length; i++) {
            if(formElements[i].classList.contains('montrer')) {
                const form = formElements[i].querySelector(`#form-question-${i+1}`)
                if(value === true) {
                    if(!form[0].checked && !form[1].checked) {
                        form.reportValidity()
                        return false
                    } else if (i === 9) {
                        getDoughnut()
                        UpdateButtonAndForm(i, i+1)
                        UpdateProgressBar(PA_PROGRESS_BAR * (i+1))
                        nextBtnTest.disabled = true
                        previousBtnTest.disabled = true
                        return false
                    }
                    UpdateButtonAndForm(i, i+1)
                    previousBtnTest.disabled = false

                    UpdateProgressBar(PA_PROGRESS_BAR * (i+1))
                    return false
                } else {
                    if(!form[0].checked && !form[1].checked) {
                        form.reportValidity()
                        return false
                    }
                    UpdateButtonAndForm(i, i-1)
                    if(i - 1 === 0) {
                        previousBtnTest.disabled = true
                    }
                    UpdateProgressBar(PA_PROGRESS_BAR * (i-1))
                    return false
                }
            }
        }
    }

    const UpdateProgressBar = (value) => {
        const progressBarElement = document.querySelector('#progress')
        const progressBar = progressBarElement.querySelector('.progress-bar')

        progressBar.style.width = `${value}%`
        progressBar.innerHTML = `${value}%`
        progressBarElement.setAttribute('aria-valuenow', value)
    }

    const UpdateButtonAndForm = (value, value2) => {
        const formElements = document.querySelectorAll('.tab-pane')
        const formBtnElements = document.querySelectorAll('.nav-link')

        formElements[value].classList.remove('show', 'active', 'montrer')
        formBtnElements[value].classList.remove('active')
        formBtnElements[value].disabled = "true"
        formElements[value2].classList.add('show', 'active', 'montrer')
        formBtnElements[value2].classList.add('active')
    }

    const getAnswer = () => {
        const goodAnswers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        let goodAnswer = 0
        let badAnswer = 0

        for (let i = 1; i <= 10; i++) {
            const form = document.querySelector(`#form-question-${i}`)
            const answer = goodAnswers[i]

            if(!form[answer].checked) {
                badAnswer++
            } else {
                goodAnswer++
            }
        }

        return [goodAnswer, badAnswer]
    }

    const getDoughnut = () => {
        const result = getAnswer()
        const ctx = document.getElementById('my-chart')

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Bonne Réponse', 'Mauvaise Réponse'],
                datasets: [{
                    label: 'Réponse',
                    data: result
                }]
            },
            options: {
                responsive: true
            }
        });
    }
})

