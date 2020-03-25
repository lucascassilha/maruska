export function addLocation(location) {
  return {
    type: '@location/ADD',
    payload: { location },
  };
}

export function deleteLocation(location) {
  return {
    type: '@location/DELETE',
    payload: { location },
  };
}
