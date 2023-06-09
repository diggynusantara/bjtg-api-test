const { nanoid } = require('nanoid');
const login = require('./login');
const logout = require('./logout');
const card = require('./card');
const pin = require('./pin');
const card = require('./card');
const transaction = require('./transaction');

const addCard = (request, h) => {
    const {
      cardNumber, cardHolder, expiryDate, securityCode,
    } = request.payload;
  
    if (cardNumber === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan kartu. Mohon isi nomor kartu',
      });
      response.code(400);
  
      return response;
    }
  
    if (cardHolder === undefined) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan kartu. Mohon isi nomor nama pemilik kartu',
        });
        response.code(400);
    
        return response;
      }
    
    if (expiryDate === undefined) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan kartu. Mohon isi expiry date',
        });
        response.code(400);
    
        return response;
    }
    
    if (securityCode === undefined) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan kartu. Mohon isi security code',
        });
        response.code(400);
    
        return response;
    }
  
    const id = nanoid(16);
    const newCard = {
      id, 
      cardNumber, 
      cardHolder, 
      expiryDate, 
      securityCode,
    };
  
    card.push(newCard);
  
    const isSuccess = card.filter((card) => card.id === id).length > 0;
  
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Kartu berhasil ditambahkan',
        data: {
          cardId: id,
        },
      });
      response.code(201);
  
      return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Kartu gagal ditambahkan',
    });
    response.code(500);
  
    return response;
};

const getCardList = (request, h) => {
    const { cardNumber, cardHolder, expiryDate, securityCode, } = request.query;
  
    let filteredCard = card;
  
    if (cardNumber !== undefined) {
      filteredCard = filteredCard.filter((card) => card);
    }
    if (cardHolder !== undefined) {
        filteredCard = filteredCard.filter((card) => card);
    }
    if (expiryDate !== undefined) {
        filteredCard = filteredCard.filter((card) => card);
    }
    if (securityCode !== undefined) {
        filteredCard = filteredCard.filter((card) => card);
    }
  
    const response = h.response({
      status: 'success',
      data: {
        card: filteredCard.map((card) => ({
          id: card.id,
          cardNumber: card.cardNumber,
          cardHolder: card.cardHolder,
          expiryDate: card.expiryDate,
          securityCode: card.securityCode,
        })),
      },
    });
    response.code(200);
  
    return response;
};

const getCardDetail = (request, h) => {
    const { id } = request.params;
    const card = card.filter((b) => b.id === id)[0];
  
    if (card !== undefined) {
      return {
        status: 'success',
        data: {
          card,
        },
      };
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Kartu tidak ditemukan',
    });
    response.code(404);
  
    return response;
};

const setPIN = (request, h) => {
    const {
      pinNumber,
    } = request.payload;
  
    if (pinNumber === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan pin. Mohon isi nomor pin',
      });
      response.code(400);
  
      return response;
    }

    const id = nanoid(16);
    const newPIN = {
        id,
        pinNumber,
    };
  
    pin.push(newPIN);
  
    const isSuccess = pin.filter((pin) => pin.id === id).length <= 6;
  
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Pin berhasil ditambahkan',
        data: {
          pinId: id,
        },
      });
      response.code(201);
  
      return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Pin gagal ditambahkan',
    });
    response.code(500);
  
    return response;
};

const deleteCard = (request, h) => {
    const { id } = request.params;
  
    const index = card.findIndex((note) => note.id === id);
  
    if (index !== -1) {
      card.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Kartu berhasil dihapus',
      });
      response.code(200);
  
      return response;
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Kartu gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
  
    return response;
};

const getTransactionList = (request, h) => {
    const { transfer, totalTransaction } = request.query;
  
    let filteredTranscaction = transaction;
  
    if (transfer !== undefined) {
        filteredTranscaction = filteredTranscaction.filter((card) => card);
    }

    if (totalTransaction !== undefined) {
        filteredTranscaction = filteredTranscaction.filter((card) => card);
    }
  
    const response = h.response({
      status: 'success',
      data: {
        transaction: filteredTranscaction.map((transaction) => ({
          id: transaction.id,
          transfer: transaction.transfer,
          totalTransaction: transaction.totalTransaction,
        })),
      },
    });
    response.code(200);
  
    return response;
};

const getTransactionDetail = (request, h) => {
    const { id } = request.params;
    const transaction = transaction.filter((b) => b.id === id)[0];
  
    if (transaction !== undefined) {
      return {
        status: 'success',
        data: {
          transaction,
        },
      };
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Transaksi tidak ditemukan',
    });
    response.code(404);
  
    return response;
};

const inquiryTransaction = (request, h) => {
    const { id } = request.params;
    const transaction = transaction.filter((b) => b.id === id)[0];
  
    if (transaction !== undefined) {
      return {
        status: 'success',
        data: {
          transaction,
        },
      };
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Transaksi tidak ditemukan',
    });
    response.code(404);
  
    return response;
};

const postingTransaction = (request, h) => {
    const { id } = request.params;
    const transaction = transaction.filter((b) => b.id === id)[0];
  
    if (transaction !== undefined) {
      return {
        status: 'success',
        data: {
          transaction,
        },
      };
    }
  
    const response = h.response({
      status: 'fail',
      message: 'Transaksi tidak ditemukan',
    });
    response.code(404);
  
    return response;
};


module.exports = {
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
};
  