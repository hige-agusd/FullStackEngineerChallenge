const user = {
    id: undefined,
    name: '',
    username: '',
    password: undefined,
    status: true,
    role: 'user'
}

const review = {
    id: undefined,
    status: undefined,
    revieweeId: undefined,
    reviewerId: undefined,
    details: undefined
}

const reviewDetails = {
    quality: undefined,
    speed: undefined,
    communication: undefined,
    teamwork: undefined
}


module.exports = {
    user,
    review,
    reviewDetails
}