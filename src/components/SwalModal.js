import swal from 'sweetalert';


const  SwalModal = ({ text, icon, buttons = false, dangerMode = false}) => {
  const content = document.createElement('div');
    content.innerHTML = '<strong>'+ text +'</strong>';

    return swal({
      content,
      icon,
      buttons,
      dangerMode
    });
}

export default SwalModal;