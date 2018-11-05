import "@babel/polyfill"; // 이 라인을 지우지 말아주세요!
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://destiny-screwdriver.glitch.me/'
})

const templates = {
  loginForm: document.querySelector('#login-form').content
}

const rootEl = document.querySelector('.root')

function drawLoginForm() {
  // 1. 템플릿 복사하기
  const fragment = document.importNode(templates.loginForm, true)

  // 2. 내용 채우고, 이벤트 리스너 등록하기
  const loginFormEl = fragment.querySelector('.login-form')

  loginFormEl.addEventListener('submit', async e => {
    e.preventDefault()
    // e: 이벤트 객체
    // e.target: 이벤트를 실제로 일으킨 요소 객체 (여기서는 loginFormEl)
    // e.target.elements: 폼 내부에 들어있는 요소 객체를 편하게 가져올 수 있는 특이한 객체
    // e.target.elements.username: name 어트리뷰트에 username이라고 지정되어있는 input 요소 객체
    // .value: 사용자가 input 태그에 입력한 값
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value
    const res = await api.post('/users/login', {
      username,
      password
    })
    alert(res.data.token)
  })

  // 3. 문서 내부에 삽입하기
  rootEl.appendChild(fragment)
}

drawLoginForm()
