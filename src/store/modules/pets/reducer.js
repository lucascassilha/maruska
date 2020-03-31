import { produce } from 'immer';
import { format, subYears, subMonths, addDays } from 'date-fns';
import { Alert } from 'react-native';
import translate, { locale } from '~/locales';

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
        const { chip, breed, name } = pet;

        const findIndex = draft.data.findIndex(item => item.name === name);
        if (findIndex >= 0) {
          const petData = draft.data[findIndex];

          let updatedInfo = {};

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
        if (draft.data.length === 1) {
          Alert.alert('Maruksa', translate('reopenApp'));
        }
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
            medicationRef.nextDoseDate = notificationInfo.date;
            medicationRef.notificationID = notificationInfo.id;

            const currentDate = new Date();

            const dateString =
              locale === 'en_US'
                ? 'MM/dd/yyyy - hh:mm aaaa'
                : 'dd/MM/yyyy - HH:mm';

            medicationRef.lastDose = currentDate;
            medicationRef.lastDoseString = format(currentDate, dateString);
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
        const { vaccine, petID, notificationInfo } = action.payload;
        const petData = draft.data;

        const petIndex = petData.findIndex(item => item.name === petID);
        if (petIndex >= 0) {
          const medicationIndex = petData[petIndex].vaccines.findIndex(
            item => item.name === vaccine
          );
          const medicationRef = petData[petIndex].vaccines[medicationIndex];
          if (medicationRef.doses > 0) {
            medicationRef.doses -= 1;

            medicationRef.nextDoseDate = addDays(notificationInfo.date, 1);
            medicationRef.notificationID = notificationInfo.id;

            const currentDate = new Date();
            const dateString =
              locale === 'en_US'
                ? 'MM/dd/yyyy - hh:mm aaaa'
                : 'dd/MM/yyyy - HH:mm';

            medicationRef.lastDose = currentDate;
            medicationRef.lastDoseString = format(currentDate, dateString);
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
      case '@pet/LAST_VACCINE': {
        const { petID } = action.payload;
        const currentDate = new Date();

        const formattedDate = format(currentDate, 'dd/MM/yyyy');

        const findIndex = draft.data.findIndex(item => item.name === petID);
        if (findIndex >= 0) {
          draft.data[findIndex].lastVaccine = formattedDate;
        }
        break;
      }
      case '@pet/LAST_APPOINTMENT': {
        const { day, petID } = action.payload;

        const findIndex = draft.data.findIndex(item => item.name === petID);
        if (findIndex >= 0) {
          draft.data[findIndex].lastAppoint = day;
        }
        break;
      }
      default:
    }
  });
}
