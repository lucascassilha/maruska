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
