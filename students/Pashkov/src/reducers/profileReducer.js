const initialStore = {
    firstName: 'Евгений',
    lastName: 'Пашков',
    phone: '8 950 048 67 53',
    mail:'pashkoveval@gmail.com'
};


export default function profileReducer(store = initialStore) {
    return store;
}
