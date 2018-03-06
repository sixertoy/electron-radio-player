export const addToast = (message, type = 'error') => ({
  item: {
    type,
    message,
    id: Date.now(),
  },
  type: 'onAddToast',
});

export const removeToast = id => ({
  id,
  type: 'onRemoveToast',
});
