class Calc {
  static #value = ''
  static #isDot = false
  static #NAME = 'calc'

  static add = (newValue) => {
    if (isNaN(this.#value[this.#value.length - 2])) {
      //перевірка перед останнього числа
      if (
        Number(this.#value[this.#value.length - 1]) === 0 &&
        this.#isDot === false // якщо в нас вже 0 то ми його більше ставити не може, щоб не виходили цифри 06 чи 010
      ) {
        return null
      }
    }

    this.#value = this.#value.concat(newValue) //concat в кінець додає певний рядок
    this.#output()
  }

  static #output = () => {
    this.#save()
    window.output.innerHTML = this.#value
  }

  static dot = () => {
    if (this.#isDot) {
      // якщо крапка вже стоїть, значить іншої вже не поставиш
      return null
    }

    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }

    this.#value = this.#value.concat('.')
    this.#output()
    this.#isDot = true
  }

  static op = (opValue) => {
    if (isNaN(this.#value[this.#value.length - 1])) {
      return null
    }
    // перевіряє чи в середні this.#value остання літера(this.#value.length - 1)
    // тобто якщо перед символом є якась цифра то можемо ставити знак, відповідно можемо ставити знаки тільки після чисел

    this.#value = this.#value.concat(opValue)
    this.#output()
    this.#isDot = false
  }

  static reset = () => {
    this.#value = ''
    this.#output()
  }

  static result = () => {
    this.#value = String(eval(this.#value)) // eval дозволяє виконати обрахунок
    this.#output()
    this.#isDot = false
  }

  static #save = () => {
    window.localStorage.setItem('this.#NAME', this.#value)
  }

  static #load = () => {
    this.#value =
      window.localStorage.getItem('this.#NAME') || ''
  }

  static init = () => {
    this.#load()
    this.#output()
    console.log('Calc is an init')
  }
}
Calc.init()

window.calc = Calc
