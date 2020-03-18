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
