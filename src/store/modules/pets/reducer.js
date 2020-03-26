import { produce } from 'immer';
import {
  formatDistanceStrict,
  format,
  subYears,
  subMonths,
  addYears,
  addMonths,
  addDays,
  addHours,
} from 'date-fns';

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
          returnDate = subYears(subMonths(currentDate, months), years);
        } else {
          returnDate = date;
        }

        const info = {
          ...pet,
          date: '',
          originalDate: returnDate,
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
      case '@pet/DELETE': {
        const { pet } = action.payload;

        const findIndex = draft.data.findIndex(item => item.name === pet);
        if (findIndex >= 0) {
          draft.data.splice(findIndex, 1);
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
      case '@pet/APPOINTMENT': {
        const { appointment, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (
            petData[petIndex].appointments &&
            petData[petIndex].appointments.length > 0
          ) {
            petData[petIndex].appointments.push(appointment);
          } else {
            petData[petIndex].appointments = [appointment];
          }
        }
        break;
      }
      case '@pet/DELETE_APPOINTMENT': {
        const { appointment, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (petData[petIndex].appointments.length >= 0) {
            const index = petData[petIndex].appointments.findIndex(
              item => item.date === appointment
            );
            petData[petIndex].appointments.splice(index, 1);
          }
        }
        break;
      }
      case '@pet/SURGERY': {
        const { surgery, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (
            petData[petIndex].surgeries &&
            petData[petIndex].surgeries.length > 0
          ) {
            petData[petIndex].surgeries.push(surgery);
          } else {
            petData[petIndex].surgeries = [surgery];
          }
        }
        break;
      }
      case '@pet/DELETE_SURGERY': {
        const { surgery, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (petData[petIndex].surgeries.length >= 0) {
            const index = petData[petIndex].surgeries.findIndex(
              item => item.name === surgery
            );
            petData[petIndex].surgeries.splice(index, 1);
          }
        }
        break;
      }
      case '@pet/PROBLEM': {
        const { problem, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (
            petData[petIndex].problems &&
            petData[petIndex].problems.length > 0
          ) {
            petData[petIndex].problems.push(problem);
          } else {
            petData[petIndex].problems = [problem];
          }
        }
        break;
      }
      case '@pet/DELETE_PROBLEM': {
        const { problem, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (petData[petIndex].problems.length >= 0) {
            const index = petData[petIndex].problems.findIndex(
              item => item.title === problem
            );
            petData[petIndex].problems.splice(index, 1);
          }
        }
        break;
      }
      case '@pet/WEIGHT': {
        const { weightData, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (petData[petIndex].weight && petData[petIndex].weight.length > 0) {
            if (petData[petIndex].weight.length >= 6) {
              petData[petIndex].weight.shift();
            }
            petData[petIndex].weight.push(weightData);
          } else {
            petData[petIndex].weight = [weightData];
          }
        }
        break;
      }
      case '@pet/MEDICATION': {
        const { medication, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (
            petData[petIndex].medications &&
            petData[petIndex].medications.length > 0
          ) {
            petData[petIndex].medications.push(medication);
          } else {
            petData[petIndex].medications = [medication];
          }
        }
        break;
      }
      case '@pet/CHECK_MEDICATION': {
        const { medication, petID, notificationInfo } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          const medicationIndex = petData[petIndex].medications.findIndex(
            item => item.name === medication
          );
          const medicationRef = petData[petIndex].medications[medicationIndex];
          if (medicationRef.doses > 0) {
            medicationRef.doses -= 1;
            console.tron.log(`Notification date: ${notificationInfo.date}`);
            medicationRef.nextDoseDate = notificationInfo.date;
            medicationRef.notificationID = notificationInfo.id;

            const currentDate = new Date();

            medicationRef.lastDose = currentDate;
            medicationRef.lastDoseString = format(
              currentDate,
              'dd/MM/yyyy - HH:mm'
            );
          }
          if (medicationRef.doses === 0) {
            medicationRef.nextDoseDate = undefined;
          }
        }
        break;
      }
      case '@pet/DELETE_MEDICATION': {
        const { medication, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (petData[petIndex].medications.length >= 0) {
            const index = petData[petIndex].medications.findIndex(
              item => item.name === medication
            );
            petData[petIndex].medications.splice(index, 1);
          }
        }
        break;
      }
      case '@pet/VACCINE': {
        const { vaccine, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (
            petData[petIndex].vaccines &&
            petData[petIndex].vaccines.length > 0
          ) {
            petData[petIndex].vaccines.push(vaccine);
          } else {
            petData[petIndex].vaccines = [vaccine];
          }
        }
        break;
      }
      case '@pet/CHECK_VACCINE': {
        const { vaccine, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          const medicationIndex = petData[petIndex].vaccines.findIndex(
            item => item.name === vaccine
          );
          const medicationRef = petData[petIndex].vaccines[medicationIndex];
          if (medicationRef.doses > 0) {
            medicationRef.doses -= 1;
            const { intervalValue, interval } = medicationRef;
            const currentDate = new Date();
            if (interval === 1) {
              medicationRef.nextDoseDate = addYears(currentDate, intervalValue);
            }
            if (interval === 2) {
              medicationRef.nextDoseDate = addMonths(
                currentDate,
                intervalValue
              );
            }
            if (interval === 3) {
              medicationRef.nextDoseDate = addDays(currentDate, intervalValue);
            }
            medicationRef.lastDose = currentDate;
            medicationRef.lastDoseString = format(currentDate, 'dd/MM/yyyy');
          }
          if (medicationRef.doses === 0) {
            medicationRef.nextDoseDate = undefined;
          }
        }
        break;
      }
      case '@pet/DELETE_VACCINE': {
        const { vaccine, petID } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          if (petData[petIndex].vaccines.length >= 0) {
            const index = petData[petIndex].vaccines.findIndex(
              item => item.name === vaccine
            );
            petData[petIndex].vaccines.splice(index, 1);
          }
        }
        break;
      }
      default:
    }
  });
}
