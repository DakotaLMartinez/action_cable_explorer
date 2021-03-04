class Message {
  constructor(attributes) {
    Object.keys(attributes).forEach(key=>{
      this[key] = attributes[key]
    })
  }

  markup() {
    
  }
}