export default function changeStatus(id) {
  return {
    type: '@modal/CHANGE',
    payload: { id },
  };
}
