//'use strict';

// Кнопка добавить
const addTaskButton = document.getElementById('add')
// Кнопка добавить
const addTaskButtonToLesson = document.getElementById('add_task')
// Кнопка изменить профиль
const changeProfileButton = document.getElementById('change_profile')
// Модальное окно добавления публикации
const modalAdd = document.getElementById('modal_add')
// Блок картинки в модальном окне
const modalAddImage = document.getElementById("add_image")
// Первая страница модального окна
const firstPageModalAdd = document.getElementById("add_photo_block")
// Вторая страница модального окна
const secondPageModalAdd = document.getElementById("add_description")
// Загруженная картинка
let file = null
// Блок с картинками профиля
const profileList = document.getElementById("profile_list")
// Кнопка редактировать профиль
const profileEditButton = document.getElementById("change_profile")
// Модальное окно с редактированием профиля
const modalEditProfile = document.getElementById("modal_profile")
// Блок с полной картинкой публикации
const modalFullPhoto = document.getElementById("full_photo")
// Выплывающее окно с кнопками
const windowButtons = document.getElementById("buttons_menu")
// Кнопка с аватаром профиля в шапке
const profileButton = document.getElementById("profile_button")
// Форма с отправкой публикации
const formUpload = document.getElementById("file_upload")
// Форма с отправкой аватара
const avatarUploadForm = document.getElementById("avatar_upload")
// Кнопка для обновления аватара
const avatarUploadBtn = document.getElementById("avatar_upload_btn")
// Поле с загружаемой аватаркой
const avatarImage = document.getElementById("avatarImage")
// Поля редактирования профиля
const profileEditUsername = document.getElementById("username_edit")
const profileEditNickname = document.getElementById("nickname_edit")
const profileEditGender = document.getElementById("gender_edit")
// Кнопка отправки изменений профиля
const profileEditBtn = document.getElementById("edit_profile_btn")

// Автор полной публикации
const fullPostName = document.getElementById("full_post_name")

if (addTaskButton) {
// Клик на кнопку добавить
addTaskButton.addEventListener('click', () => {
    // Отображение модального окна
    modalAdd.classList.remove("hide")
})

// Клик по модальному окну с добавлением публикации
modalAdd.addEventListener("click", e => {
    // Если клик по фону - скрыть модальное окно
    if (e.target.id === "modal_add") {
        return modalAdd.classList.add("hide")
    }

    // Если клик по первой кнопке
    if (e.target.id === "add_submit1") {
        e.preventDefault()

        let reader = new FileReader
        reader.readAsDataURL(document.getElementById("add_photo").files[0])

        reader.addEventListener('load', () => {
            file = reader.result
            modalAddImage.src = file
            firstPageModalAdd.classList.add("hide")
            secondPageModalAdd.classList.remove("hide")
        })
    }
    // Если клик по второй кнопке
    else if (e.target.id === "add_submit2") {
        e.preventDefault()

        formUpload.submit()
    }
})
}


// Если страница профиля
if (modalEditProfile) {

    if (modalEditProfile) {
        // Скрыть модалку редактирования профиля при нажатии на фон
        modalEditProfile.addEventListener('click', e => {
            if (e.target.id === "modal_profile") {
                modalEditProfile.classList.add('hide')
            }
        })
    }

    if (profileEditButton) {
        // Отобразить модалку редактирования профиля при нажатии на кнопку
        profileEditButton.addEventListener("click", async (e) => {
            modalEditProfile.classList.remove('hide')

            let data = null;

            await fetch('/api/info')
                .then(response => response.json())
                .then(response => {
                    data = response
                })

            profileEditUsername.value = data.name
            profileEditNickname.value = data.nickname
            profileEditGender.value = data.gender || ""

        })
    }


    // Клик по кнопке с обновлением аватарки
    avatarUploadBtn.addEventListener("click", e => {
        e.preventDefault()
        if (avatarImage.value === "") return false;

        avatarUploadForm.submit()
    })
}

// При нажатии на ESC скрывать все модалки
window.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
        modalEditProfile.classList.add('hide')
        modalAdd.classList.add('hide')
    }
})

// Клик по любой части окна и скрытие меню с кнопками
window.addEventListener('click', e => {
    if (!e.target.classList.contains("profile_click")) {
        windowButtons.classList.add('hide')
    }
})

// Нажатие на кнопку с аватаром в шапке
profileButton.addEventListener('click', () => {
    windowButtons.classList.toggle('hide')
})


// Клик по контейнеру с постами
const containerPosts = document.querySelector('.col-2.mr20')
if (containerPosts) {
    containerPosts.addEventListener('click', async (e) => {
        // Клик по кнопке LIKE
        // if(e.target.classList.contains('like')) return false
        if (e.target.classList.contains('like') || e.target.classList.contains('_8-yf5') || e.target.classList.contains('group')) {
            const id = e.target.dataset.id
            fetch(`/api/like/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(res => {
                    getLikeCount(id)
                    console.log(res)
                    document.querySelector(`.like[data-id="${id}"]`).children[0].classList.toggle('active')
                })

            return
        }
        else if (!e.target.classList.contains('btn')) return false;



        const postTextarea = e.target.previousElementSibling
        if (!postTextarea.value) return false;
    })
}

