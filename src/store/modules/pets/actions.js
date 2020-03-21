export function addPet(pet) {
  return {
    type: '@pet/ADD',
    payload: { pet },
  };
}

export function editPet(pet) {
  return {
    type: '@pet/EDIT',
    payload: { pet },
  };
}

export function editPicture(image, petID) {
  return {
    type: '@pet/PICTURE',
    payload: { image, petID },
  };
}

export function petAppointment(appointment, petID) {
  return {
    type: '@pet/APPOINTMENT',
    payload: { appointment, petID },
  };
}

export function petSurgery(surgery, petID) {
  return {
    type: '@pet/SURGERY',
    payload: { surgery, petID },
  };
}

export function petProblem(problem, petID) {
  return {
    type: '@pet/PROBLEM',
    payload: { problem, petID },
  };
}
