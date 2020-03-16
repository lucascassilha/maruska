export default function addLocation(location) {
  return {
    type: '@location/ADD',
    payload: { location },
  };
}
