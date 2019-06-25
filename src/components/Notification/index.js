import Notification from './Notification.svelte';

const create = (props)=>{   
    const notification = new Notification({
        target: document.body,
        props,
        intro: true,
    });

    notification.$on('destroyed', notification.$destroy)
    return notification;
}


export default Notification;

Notification.create = create;
Notification.success = (props)=>create({...props, type:'success'});
Notification.info = (props)=>create({...props, type:'info'});
Notification.warning = (props)=>create({...props, type:'warning'});
Notification.error = (props)=>create({...props, type:'danger'});