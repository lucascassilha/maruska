/* eslint-disable no-return-assign */
import { produce } from 'immer';

const INITIAL_STATE = {
  data: [],
};

export default function doctors(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@doctor/ADD': {
        const { doctor, petID } = action.payload;
        console.log(doctor);

        const findIndex = draft.data.findIndex(
          item => (item.name = doctor.name)
        );

        if (findIndex >= 0) {
          const docPets = draft.data[findIndex].pets;
          if (docPets.length > 0) {
            const petIndex = docPets.findIndex(item => item === petID);
            if (petIndex === -1) {
              draft.data[findIndex].pets.push(petID);
            }
          } else {
            draft.data[findIndex].pets = [petID];
          }
        } else {
          draft.data.push(doctor);
        }
        break;
      }
      case '@doctor/DELETE': {
        const { doctor, petID } = action.payload;

        const findIndex = draft.data.findIndex(item => (item.name = doctor));

        if (findIndex >= 0) {
          const docPets = draft.data[findIndex].pets;
          if (docPets.length > 1) {
            const petIndex = docPets.findIndex(item => item === petID);
            draft.data[findIndex].pets.splice(petIndex, 1);
          } else {
            draft.data.splice(findIndex, 1);
          }
        }
        break;
      }
      default:
    }
  });
}
