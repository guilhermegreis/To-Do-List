
const Main = {

    init: function() {
        this.cache_selectors()
        this.bind_events()
    },

    cache_selectors: function() {
        this.$check_buttons = document.querySelectorAll('.check')
        this.$input_task = document.querySelector('#input_task')
        this.$list = document.querySelector('#list')
        this.$remove_buttons = document.querySelectorAll('.remove')
    },

    bind_events: function() {
        const self = this

        this.$check_buttons.forEach(function(button){
            button.onclick = self.Events.checkbutton_click
        })

        this.$input_task.onkeypress = self.Events.input_task_keypress.bind(this)

        this.$remove_buttons.forEach(function(button){
            button.onclick = self.Events.removebutton_click
        })
    },



    Events: {
        checkbutton_click: function(e) {
           const li = e.target.parentElement
           const is_done = li.classList.contains('done')

          if (!is_done) {
            return li.classList.add('done')
          }

          li.classList.remove('done')
        },

        input_task_keypress: function(e) {
            const key = e.key
            const value = e.target.value
            if(key === 'Enter'){
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                            ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''

                this.cache_selectors()
                this.bind_events()
            }
        },

        removebutton_click: function(e){
            let li = e.target.parentElement

            li.classList.add('removed')

            setTimeout(function(){
                li.classList.add('hidden')
            }, 300)
        }
    }
}

Main.init()