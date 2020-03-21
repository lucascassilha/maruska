import { produce } from 'immer';
import { formatDistanceStrict, subYears, subMonths } from 'date-fns';

const INITIAL_STATE = {
  data: [],
};

export default function pets(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@pet/ADD': {
        const { pet } = action.payload;
        const { date, years, months } = pet;

        const currentDate = new Date();
        let returnDate = null;
        if (years) {
          const auxDate = subYears(subMonths(currentDate, months), years);
          returnDate = formatDistanceStrict(auxDate, currentDate);
        } else {
          returnDate = formatDistanceStrict(date, currentDate);
        }

        const info = {
          ...pet,
          date: returnDate,
          originalDate: date,
          originalYears: years,
          originalMonths: months,
        };

        draft.data.push(info);
        break;
      }
      case '@pet/EDIT': {
        const { pet } = action.payload;
        const { date, years, months, chip, breed, name } = pet;

        const findIndex = draft.data.findIndex(item => item.name === name);
        if (findIndex >= 0) {
          const currentDate = new Date();
          let returnDate = null;

          const petData = draft.data[findIndex];

          let updatedInfo = {};

          if (
            years !== petData.originalYears &&
            months !== petData.originalMonths
          ) {
            const auxDate = subYears(subMonths(currentDate, months), years);
            returnDate = formatDistanceStrict(auxDate, currentDate);
            updatedInfo = {
              date: returnDate,
              originalDate: new Date(),
              originalYears: years,
              originalMonths: months,
            };
          } else if (petData.originalDate !== date) {
            returnDate = formatDistanceStrict(date, currentDate);
            updatedInfo = {
              date: returnDate,
              originalDate: date,
              originalYears: null,
              originalMonths: null,
            };
          }

          if (chip !== petData.chip) {
            updatedInfo = { ...updatedInfo, chip };
          }
          if (breed !== petData.breed) {
            updatedInfo = { ...updatedInfo, breed };
          }

          draft.data[findIndex] = { ...petData, ...updatedInfo };
        }
        break;
      }
      case '@pet/PICTURE': {
        const { image, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          draft.data[petIndex].avatar = image;
        }
        break;
      }
      case '@doctor/ADD': {
        const { doctor, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (petData.doctors && petData.doctors.length > 0) {
            draft.data[petIndex].doctors.push(doctor.name);
          } else {
            draft.data[petIndex].doctors = [doctor.name];
          }
        }
        break;
      }
      default:
    }
  });
}
