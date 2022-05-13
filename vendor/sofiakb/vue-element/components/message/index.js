import Vue  from 'vue'
import main from "./main";

let MessageConstructor = Vue.extend(main);

const open = (instance) => {
  document.body.appendChild(instance.$el);
  return instance.open()
};

const Message = {
  success: (message = null, options = {}) => {
    let instance = new MessageConstructor({
      propsData: {
        color  : options.color || '#2abb9b',
        icon   : options.icon || 'check-circle',
        message: message || "L'opération s'est terminée avec succès",
        timer  : typeof options.timer !== 'undefined' ? options.timer : true,
        timeout: options.timeout || 5000
      }
    });
    instance.$mount();
    return open(instance)
  },
  error  : (message = null, options = {}) => {
    let instance = new MessageConstructor({
      propsData: {
        color  : options.color || '#d64541',
        icon   : options.icon || 'exclamation-circle',
        message: message || "Une erreur est survenue, merci de réessayer plus tard",
        timer  : typeof options.timer !== 'undefined' ? options.timer : false,
        timeout: options.timeout || 5000,
      }
    });
    instance.$mount();
    return open(instance)
  },
  warning: (message = null, options = {}) => {
    let instance = new MessageConstructor({
      propsData: {
        color  : options.color || '#f89406',
        icon   : options.icon || 'exclamation-triangle',
        message,
        timer  : typeof options.timer !== 'undefined' ? options.timer : false,
        timeout: options.timeout || 5000,
      }
    });
    instance.$mount();
    return open(instance)
  },
  info   : (message, options = {}) => {
    let instance = new MessageConstructor({
      propsData: {
        color  : options.color || '#6bb9f0',
        icon   : options.icon || 'info-circle',
        message,
        timer  : typeof options.timer !== 'undefined' ? options.timer : false,
        timeout: options.timeout || 5000,
      }
    });
    instance.$mount();
    return open(instance)
  }
};

export default Message
