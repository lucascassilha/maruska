export function addDoctor(doctor, petID) {
  return {
    type: '@doctor/ADD',
    payload: { doctor, petID },
  };
}

export function deleteDoctor(doctor, petID) {
  return {
    type: '@doctor/DELETE',
    payload: { doctor, petID },
  };
}
