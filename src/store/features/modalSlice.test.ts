import reducer, { toggleModal } from './modalSlice';

test('should toggle add modal correctly', () => {
  const currentState = reducer(
    {
      addToggle: false,
      editToggle: false,
      delToggle: false,
      infoToggle: false,
    },
    toggleModal('add')
  );

  expect(currentState).toEqual({
    addToggle: true,
    editToggle: false,
    delToggle: false,
    infoToggle: false,
  });
});
