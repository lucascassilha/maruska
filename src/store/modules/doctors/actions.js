export default function addDoctor(doctor, petID) {
  return {
    type: '@doctor/ADD',
    payload: { doctor, petID },
  };
}
