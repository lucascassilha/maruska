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

export function deletePet(pet) {
  return {
    type: '@pet/DELETE',
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

export function petDeleteAppointment(appointment, petID) {
  return {
    type: '@pet/DELETE_APPOINTMENT',
    payload: { appointment, petID },
  };
}

export function petSurgery(surgery, petID) {
  return {
    type: '@pet/SURGERY',
    payload: { surgery, petID },
  };
}

export function petDeleteSurgery(surgery, petID) {
  return {
    type: '@pet/DELETE_SURGERY',
    payload: { surgery, petID },
  };
}

export function petProblem(problem, petID) {
  return {
    type: '@pet/PROBLEM',
    payload: { problem, petID },
  };
}

export function petDeleteProblem(problem, petID) {
  return {
    type: '@pet/DELETE_PROBLEM',
    payload: { problem, petID },
  };
}

export function petWeightAdd(weightData, petID) {
  return {
    type: '@pet/WEIGHT',
    payload: { weightData, petID },
  };
}

export function petMedication(medication, petID) {
  return {
    type: '@pet/MEDICATION',
    payload: { medication, petID },
  };
}

export function petCheckMedication(medication, petID, notificationInfo) {
  return {
    type: '@pet/CHECK_MEDICATION',
    payload: { medication, petID, notificationInfo },
  };
}

export function petDeleteMedication(medication, petID) {
  return {
    type: '@pet/DELETE_MEDICATION',
    payload: { medication, petID },
  };
}

export function petVaccine(vaccine, petID) {
  return {
    type: '@pet/VACCINE',
    payload: { vaccine, petID },
  };
}

export function petCheckVaccine(vaccine, petID, notificationInfo) {
  return {
    type: '@pet/CHECK_VACCINE',
    payload: { vaccine, petID, notificationInfo },
  };
}

export function petDeleteVaccine(vaccine, petID) {
  return {
    type: '@pet/DELETE_VACCINE',
    payload: { vaccine, petID },
  };
}
