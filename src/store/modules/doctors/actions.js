export default function addDoctor(doctor) {
  return {
    type: '@doctor/ADD',
    payload: { doctor },
  };
}
