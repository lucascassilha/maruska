export default function addPet(pet) {
  return {
    type: '@pet/ADD',
    payload: { pet },
  };
}
