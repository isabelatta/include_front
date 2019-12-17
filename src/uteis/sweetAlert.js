import Swal from 'sweetalert2';

const sweetAlertWarn = async (title, text) => {
  const res = await Swal.fire({
    title,
    text,
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Continuar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.value) {
      return true;
    } else {
      return false;
    }
  });

  return res;
}

export default sweetAlertWarn;