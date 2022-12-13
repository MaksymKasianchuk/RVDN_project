import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { defaults } from '@pnotify/core';

defaults.delay = 3000;
defaults.styling = 'material';

const { alert, info, success, error } = require('@pnotify/core');
  function errorNotif(messageText) {
    if(!messageText) messageText = "Сталася помилка";
    error(messageText);
  }
  function succsessNotif(messageText) {
    success(messageText);
  }
  function emptyNotif(messageText) {
      alert(messageText);
  }
  function accurateNotif(messageText) {
    info(messageText);
  }
  export default {
    errorNotif,
    succsessNotif,
    emptyNotif,
    accurateNotif,
  };