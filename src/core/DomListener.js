import {capitalize} from '@core/utils'
export class DomListener { 
    constructor($root, listeners = [] ) { 
        if (!$root) { 
            throw new Error(`No $root provided for DomListener`)
        }
        this.$root = $root 
        this.listeners = listeners 
    } 
    initDOMListeners() { 
        this.listeners.forEach(Listener => { 
            const method = getMethodName(Listener) 
            if (!this[method]) {
                const name = this.name || '' 
                throw new Error(`Method ${method} is not implemented in ${name} Component`)      
            }
            this[method] = this[method].bind(this) 
            this.$root.on(Listener, this[method]) 
        })
    }
    removeDOMListeners() {
        this.listeners.forEach(Listener => {
            const method = getMethodName(Listener)
            this.$root.del(Listener, this[method]) 
        })
        }      
    }
function getMethodName(eventName) { 
    return 'on' + capitalize(eventName) 
}  


