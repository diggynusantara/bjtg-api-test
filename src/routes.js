const {
    getLogin,
    getLogout,
    addCard,
    getCardList,
    getCardDetail,
    setPIN,
    deleteCard,
    getTransactionList,
    getTransactionDetail,
    inquiryTransaction,
    postingTransaction,
  } = require('./handler');
  
  const routes = [
    {
      method: 'GET',
      path: '/login',
      handler: getLogin,
    },
    {
      method: 'GET',
      path: '/logout',
      handler: getLogout,
    },
    {
      method: 'POST',
      path: '/card/{id}',
      handler: addCard,
    },
    {
      method: 'GET',
      path: '/card/{id}',
      handler: getCardList,
    },
    {
      method: 'GET',
      path: '/card/{id}',
      handler: getCardDetail,
    },
    {
      method: 'POST',
      path: '/pin/{id}',
      handler: setPIN,
    },
    {
      method: 'POST',
      path: '/card/{id}',
      handler: deleteCard,
    },
    {
      method: 'GET',
      path: '/transaction/{id}',
      handler: getTransactionList,
    },
    {
      method: 'GET',
      path: '/transaction/{id}',
      handler: getTransactionDetail,
    },
    {
      method: 'POST',
      path: '/transaction/{id}',
      handler: inquiryTransaction,
    },
    {
      method: 'POST',
      path: '/transaction/{id}',
      handler: postingTransaction,
    },
  ];
  
  module.exports = routes;
  