namespace Components {
  export class header {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = "this is a header"
      document.body.appendChild(elem)
    }
  }
  export class content {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = "this is a content"
      document.body.appendChild(elem)
    }
  }
   export class footer {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = "this is a footer"
      document.body.appendChild(elem)
    }
  }
}